#!/usr/bin/env python3
"""
Script to analyze products with broken image URLs from DRW Skincare API.
Identifies products using old drwgroup.id URLs without foto_produk entries.
"""

import json
import sys
from typing import Dict, List, Any

def load_products_data(filename: str) -> Dict[str, Any]:
    """Load products data from JSON file."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: File {filename} not found")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        sys.exit(1)

def analyze_image_issues(products: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    """
    Analyze products for image-related issues.
    
    Returns:
        Dictionary with categorized product lists:
        - problematic: Products with old URLs and empty fotoProduk (broken images)
        - old_with_new: Products with old URLs but have fotoProduk (should work)
        - missing_images: Products with no images at all
        - good: Products using only new image system
    """
    
    results = {
        'problematic': [],      # Old URL + empty fotoProduk = BROKEN
        'old_with_new': [],     # Old URL + has fotoProduk = Should work (fallback)
        'missing_images': [],   # No images at all
        'good': []             # Only new image system
    }
    
    for product in products:
        # Extract relevant fields
        product_id = product.get('id', 'N/A')
        name = product.get('namaProduk', 'Unknown')
        gambar = product.get('gambar', '')
        foto_produk = product.get('fotoProduk', [])
        product_type = product.get('type', 'unknown')
        
        # Create summary object
        product_info = {
            'id': product_id,
            'name': name,
            'type': product_type,
            'gambar_url': gambar,
            'foto_produk_count': len(foto_produk),
            'has_old_url': 'drwgroup.id' in gambar,
            'has_new_images': len(foto_produk) > 0
        }
        
        # Categorize based on image status
        if not gambar and not foto_produk:
            # No images at all
            results['missing_images'].append(product_info)
        elif 'drwgroup.id' in gambar:
            # Has old drwgroup.id URL
            if not foto_produk:
                # PROBLEMATIC: Old URL but no new images = broken
                results['problematic'].append(product_info)
            else:
                # Has both old URL and new images (should work with fallback)
                results['old_with_new'].append(product_info)
        elif foto_produk:
            # Only has new images (good)
            results['good'].append(product_info)
        else:
            # Edge case: has gambar but not drwgroup.id and no fotoProduk
            results['missing_images'].append(product_info)
    
    return results

def print_analysis_report(results: Dict[str, List[Dict[str, Any]]]) -> None:
    """Print detailed analysis report."""
    
    total_products = sum(len(category) for category in results.values())
    
    print("=" * 80)
    print("DRW SKINCARE IMAGE ANALYSIS REPORT")
    print("=" * 80)
    print(f"Total products analyzed: {total_products}")
    print()
    
    # PROBLEMATIC PRODUCTS (Need immediate attention)
    problematic = results['problematic']
    print(f"🚨 PROBLEMATIC PRODUCTS (BROKEN IMAGES): {len(problematic)}")
    print("   These products will show 'The requested resource isn't a valid image' errors")
    print("-" * 80)
    
    if problematic:
        print(f"{'ID':<15} {'Type':<8} {'Product Name'}")
        print("-" * 80)
        for product in problematic:
            print(f"{product['id']:<15} {product['type']:<8} {product['name']}")
        print()
        
        # Show the specific problematic URL pattern
        sample_url = problematic[0]['gambar_url'] if problematic else ""
        if sample_url:
            print(f"❌ Broken URL pattern: {sample_url}")
            print("   These URLs return 'The requested resource isn't a valid image'")
        print()
    else:
        print("   ✅ No problematic products found!")
        print()
    
    # Products with old URLs but have new images (should work)
    old_with_new = results['old_with_new']
    print(f"⚠️  OLD + NEW IMAGES (Should work): {len(old_with_new)}")
    print("   These have old URLs but also have fotoProduk entries (frontend should use fotoProduk)")
    print("-" * 80)
    
    if old_with_new:
        print(f"{'ID':<15} {'Images':<8} {'Product Name'}")
        print("-" * 80)
        for product in old_with_new[:10]:  # Show first 10
            print(f"{product['id']:<15} {product['foto_produk_count']:<8} {product['name']}")
        
        if len(old_with_new) > 10:
            print(f"   ... and {len(old_with_new) - 10} more")
        print()
    
    # Products with missing images entirely
    missing = results['missing_images']
    print(f"📷 MISSING IMAGES: {len(missing)}")
    print("   These products have no images at all")
    print("-" * 80)
    
    if missing:
        for product in missing:
            print(f"   {product['id']} - {product['name']}")
        print()
    
    # Products using only new image system (good)
    good = results['good']
    print(f"✅ GOOD (New image system only): {len(good)}")
    print("   These products use only the foto_produk table")
    print()
    
    # Summary statistics
    print("SUMMARY STATISTICS:")
    print("-" * 40)
    print(f"Problematic (need migration):     {len(problematic):<3} ({len(problematic)/total_products*100:.1f}%)")
    print(f"Old + New (should work):          {len(old_with_new):<3} ({len(old_with_new)/total_products*100:.1f}%)")
    print(f"Missing images:                   {len(missing):<3} ({len(missing)/total_products*100:.1f}%)")
    print(f"Good (new system only):           {len(good):<3} ({len(good)/total_products*100:.1f}%)")
    print()
    
    # Action items
    if problematic:
        print("🔧 REQUIRED ACTIONS:")
        print("=" * 40)
        print("1. Upload images for problematic products to foto_produk table")
        print("2. Ensure frontend prioritizes foto_produk[0].url over gambar field")
        print("3. Test that image fallback system works correctly")
        print(f"4. Migrate {len(problematic)} products from old URL system to new")
        print()
        
        print("📋 Products needing immediate attention:")
        for product in problematic:
            print(f"   - {product['name']} (ID: {product['id']})")

def save_results_to_file(results: Dict[str, List[Dict[str, Any]]], filename: str) -> None:
    """Save analysis results to JSON file for further processing."""
    
    # Add summary statistics
    total = sum(len(category) for category in results.values())
    results['summary'] = {
        'total_products': total,
        'problematic_count': len(results['problematic']),
        'old_with_new_count': len(results['old_with_new']),
        'missing_images_count': len(results['missing_images']),
        'good_count': len(results['good']),
        'analysis_timestamp': 'Generated by analyze_broken_images.py'
    }
    
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(results, file, indent=2, ensure_ascii=False)
    
    print(f"📄 Detailed results saved to: {filename}")

def main():
    """Main function to run the analysis."""
    
    input_file = "products_data.json"
    output_file = "image_analysis_results.json"
    
    print("Loading products data...")
    data = load_products_data(input_file)
    
    if 'data' not in data or not isinstance(data['data'], list):
        print("Error: Invalid data format. Expected 'data' field with list of products.")
        sys.exit(1)
    
    products = data['data']
    print(f"Loaded {len(products)} products/packages")
    
    print("Analyzing image URLs...")
    results = analyze_image_issues(products)
    
    # Print the analysis report
    print_analysis_report(results)
    
    # Save detailed results
    save_results_to_file(results, output_file)
    
    # Exit with error code if there are problematic products
    if results['problematic']:
        print(f"\n⚠️  Found {len(results['problematic'])} products with broken images!")
        sys.exit(1)
    else:
        print("\n✅ No broken image URLs found!")
        sys.exit(0)

if __name__ == "__main__":
    main()
