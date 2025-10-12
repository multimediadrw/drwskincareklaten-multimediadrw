import json

# Read the products data
with open('products_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('=== ANALISIS PRODUK DENGAN URL LAMA ===\n')

old_url_count = 0
new_url_count = 0
missing_image_count = 0
problem_products = []

for product in data['data']:
    has_old_url = product.get('gambar') and 'drwgroup.id' in product['gambar']
    has_foto_produk = product.get('fotoProduk') and len(product['fotoProduk']) > 0
    
    if has_old_url and not has_foto_produk:
        old_url_count += 1
        problem_products.append({
            'id': product['id'],
            'name': product['namaProduk'],
            'type': product['type'],
            'gambar': product['gambar'],
            'fotoProduk': len(product.get('fotoProduk', []))
        })
    elif has_foto_produk:
        new_url_count += 1
    else:
        missing_image_count += 1

print('RINGKASAN:')
print(f'- Produk dengan URL lama (drwgroup.id) tanpa foto_produk: {old_url_count}')
print(f'- Produk sudah menggunakan foto_produk (Google Storage): {new_url_count}')
print(f'- Produk tanpa gambar sama sekali: {missing_image_count}')
print(f'- Total produk: {len(data["data"])}\n')

if problem_products:
    print('=== DAFTAR PRODUK BERMASALAH (menggunakan URL lama) ===\n')
    for i, product in enumerate(problem_products[:15]):
        print(f'{i + 1}. {product["name"]}')
        print(f'   ID: {product["id"]}')
        print(f'   Type: {product["type"]}')
        print(f'   URL Lama: {product["gambar"]}')
        print(f'   Foto Produk: {product["fotoProduk"]} item')
        print('')
    
    if len(problem_products) > 15:
        print(f'... dan {len(problem_products) - 15} produk lainnya\n')

# Special case: check for the specific product mentioned in the error
for product in problem_products:
    if '1754869226' in product['gambar']:
        print(f'PRODUK YANG DISEBUTKAN DALAM ERROR DITEMUKAN:')
        print(f'- Nama: {product["name"]}')
        print(f'- ID: {product["id"]}')
        print(f'- URL: {product["gambar"]}')
        print('')
