 'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SafeImage from '@/components/SafeImage';
// import PromoPopup from '@/components/PromoPopup'; // DISABLED
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMapMarkerAlt, faEnvelope, faPhone, faSpa, faGem, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { SITE_CONFIG, getWhatsAppUrl, getTreatmentWhatsAppUrl } from '../lib/site-config';
import menuPerawatan from '../menu_perawatan.json';

interface Product {
  id: string;
  namaProduk: string;
  deskripsi: string | null;
  hargaUmum: number | null;
  gambar: string | null;
  fotoProduk: string | null;
  slug: string;
  categories?: {
    name: string;
  } | null;
  foto_produk?: Array<{
    id_foto: string;
    url_foto: string;
    alt_text: string | null;
    urutan: number;
  }>;
}

interface StaticProduct {
  id: string;
  namaProduk: string;
  category: string;
  hargaUmum: number;
  gambar: string | null;
  bgColor?: string;
}

interface Treatment {
  name: string;
  price: number;
  description: string;
  benefit: string;
}

interface TreatmentCategory {
  [key: string]: Treatment[];
}

const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Treatment data from JSON
  const treatmentData: TreatmentCategory = menuPerawatan;  // DISABLED: PromoPopup functionality
  // const [showPromoPopup, setShowPromoPopup] = useState(false);
  // const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetchFeaturedProducts();
    
    // DISABLED: Show popup after 2 seconds delay on every page load
    // const timer = setTimeout(() => {
    //   setShowPromoPopup(true);
    // }, 2000);
    
    // return () => clearTimeout(timer);
  }, []);

  // DISABLED: Mark component as mounted on client to avoid SSR/CSR markup mismatch
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // DISABLED: PromoPopup close handler
  // const handleClosePromoPopup = () => {
  //   setShowPromoPopup(false);
  // };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products/featured');
      const result = await response.json();
      
      if (result.success) {
        setFeaturedProducts(result.data);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Hubungi Kami';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  // Format price for treatments
  const formatTreatmentPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get category colors for treatments
  const getCategoryColor = (category: string) => {
    const colors = {
      'Facial Standart': 'bg-blue-100 text-blue-700',
      'Paket Facial Basic': 'bg-green-100 text-green-700',
      'Cauter': 'bg-purple-100 text-purple-700',
      'Paket Facial Premium': 'bg-pink-100 text-pink-700',
      'Paket Best Seller': 'bg-yellow-100 text-yellow-700',
      'Paket Super Hemat': 'bg-red-100 text-red-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  // Handle WhatsApp booking for treatments
  const handleWhatsAppBooking = (treatmentName: string, price: number) => {
    const formattedPrice = formatTreatmentPrice(price);
    const url = getTreatmentWhatsAppUrl(treatmentName, formattedPrice);
    window.open(url, '_blank');
  };

  // Get featured treatments from each category
  const getFeaturedTreatments = () => {
    const featured: { category: string; treatments: Treatment[] }[] = [];
    
    Object.entries(treatmentData).forEach(([category, treatments]) => {
      // Get 1-2 popular treatments from each category
      let selectedTreatments: Treatment[] = [];
      
      if (category === 'Paket Best Seller') {
        selectedTreatments = treatments.slice(0, 2); // Show 2 from best seller
      } else if (category === 'Facial Standart') {
        selectedTreatments = treatments.slice(0, 1); // Show 1 from basic
      } else if (category === 'Paket Super Hemat') {
        selectedTreatments = treatments.slice(-2); // Show last 2 premium treatments
      } else if (category === 'Paket Facial Premium') {
        selectedTreatments = treatments.slice(0, 1); // Show 1 premium
      }
      
      if (selectedTreatments.length > 0) {
        featured.push({ category, treatments: selectedTreatments });
      }
    });
    
    return featured;
  };

  // Static products to fill remaining slots (melanjutkan dari produk API)
  const staticProducts: StaticProduct[] = [
    { id: 'static-1', namaProduk: 'DNA Salmon Serum', category: 'Anti Aging', hargaUmum: 450000, gambar: '/images/produk1.svg' },
    { id: 'static-2', namaProduk: 'Vitamin C Brightening Serum', category: 'Brightening', hargaUmum: 320000, gambar: '/images/produk2.svg' },
    { id: 'static-3', namaProduk: 'Acne Treatment Serum', category: 'Acne Care', hargaUmum: 280000, gambar: '/images/produk3.svg' },
    { id: 'static-4', namaProduk: 'Hyaluronic Acid Moisturizer', category: 'Moisturizer', hargaUmum: 250000, gambar: null, bgColor: 'from-pink-100 to-pink-200' },
    { id: 'static-5', namaProduk: 'SPF 50+ Sunscreen', category: 'Sunscreen', hargaUmum: 180000, gambar: null, bgColor: 'from-blue-100 to-blue-200' },
    { id: 'static-6', namaProduk: 'Gentle Foam Cleanser', category: 'Cleanser', hargaUmum: 150000, gambar: null, bgColor: 'from-green-100 to-green-200' },
    { id: 'static-7', namaProduk: 'Hydrating Toner', category: 'Toner', hargaUmum: 120000, gambar: null, bgColor: 'from-purple-100 to-purple-200' },
    { id: 'static-8', namaProduk: 'Eye Cream Anti Aging', category: 'Eye Care', hargaUmum: 380000, gambar: null, bgColor: 'from-yellow-100 to-yellow-200' }
  ];

  // Menampilkan 8 produk total: Prioritas produk dengan foto dan bisa diklik
  const getDisplayProducts = (): (Product | StaticProduct)[] => {
    // Filter produk API yang ada fotonya
    const productsWithImages = featuredProducts.filter(product => product.gambar || product.fotoProduk);
    
    // Tambahkan static products yang ada gambar
    const staticWithImages = staticProducts.filter(product => product.gambar);
    
    // Gabungkan semua produk (dengan foto dan tanpa foto)
    const allProducts: (Product | StaticProduct)[] = [
      ...productsWithImages, 
      ...staticWithImages, 
      ...featuredProducts.filter(product => !(product.gambar || product.fotoProduk)),
      ...staticProducts.filter(product => !product.gambar)
    ];
    
    return allProducts.slice(0, 8);
  };

  const renderProduct = (product: Product | StaticProduct, index: number) => {
    const isStatic = !('deskripsi' in product);
    const staticProduct = product as StaticProduct;
    const realProduct = product as Product;
    
    // Jika produk real dan punya foto, buat clickable link ke detail
    if (!isStatic && (realProduct.gambar || realProduct.fotoProduk) && realProduct.slug) {
      return (
        <Link key={product.id} href={`/product/${realProduct.slug}`} className="bg-white rounded-lg md:rounded-2xl shadow-lg p-3 md:p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group cursor-pointer">          <div className="relative w-full h-32 md:h-48 mb-3 md:mb-4">
            <Image 
              src={
                // Priority: foto_produk table (first image by urutan), then fallback to old fields
                (realProduct.foto_produk && realProduct.foto_produk.length > 0) 
                  ? realProduct.foto_produk[0].url_foto
                  : realProduct.gambar || realProduct.fotoProduk || ''
              } 
              alt={
                (realProduct.foto_produk && realProduct.foto_produk.length > 0 && realProduct.foto_produk[0].alt_text)
                  ? realProduct.foto_produk[0].alt_text
                  : realProduct.namaProduk
              } 
              fill
              className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          {/* Category */}
          <div className="inline-block bg-primary/10 group-hover:bg-primary/20 text-primary text-xs px-2 md:px-3 py-1 rounded-full mb-2 md:mb-3 transition-colors">
            {realProduct.categories?.name || 'Skincare'}
          </div>
          
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 group-hover:text-primary mb-2 md:mb-3 line-clamp-2 transition-colors">
            {realProduct.namaProduk}
          </h3>
          
          {/* Price */}
          <div className="text-sm md:text-lg font-bold text-primary group-hover:scale-105 mb-3 md:mb-4 transition-transform">
            {formatPrice(realProduct.hargaUmum)}
          </div>
          
          <div className="text-xs text-gray-500">Klik untuk detail & beli</div>
        </Link>
      );
    }
    
    // Untuk static products atau products tanpa foto
    return (
      <div key={product.id} className="bg-white rounded-lg md:rounded-2xl shadow-lg p-3 md:p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group cursor-pointer" onClick={() => window.open(`https://wa.me/6285790795910?text=${encodeURIComponent(`Halo, saya tertarik dengan produk ${product.namaProduk}`)}`)}>
        <div className="relative w-full h-32 md:h-48 mb-3 md:mb-4">
          {product.gambar ? (
            <SafeImage 
              src={product.gambar} 
              alt={product.namaProduk} 
              width={300}
              height={200}
              className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300 w-full h-full"
            />
          ) : (
            <div className={`flex items-center justify-center h-full rounded-xl ${
              isStatic && staticProduct.bgColor 
                ? `bg-gradient-to-br ${staticProduct.bgColor}` 
                : 'bg-gray-100'
            }`}>
              <FontAwesomeIcon icon={faShoppingCart} className="text-4xl text-primary" />
            </div>
          )}
        </div>
        
        {/* Category */}
        <div className="inline-block bg-primary/10 group-hover:bg-primary/20 text-primary text-xs px-2 md:px-3 py-1 rounded-full mb-2 md:mb-3 transition-colors">
          {isStatic ? staticProduct.category : (product as Product).categories?.name || 'Skincare'}
        </div>
        
        <h3 className="text-sm md:text-lg font-semibold text-gray-800 group-hover:text-primary mb-2 md:mb-3 line-clamp-2 transition-colors">
          {product.namaProduk}
        </h3>
        
        {/* Price */}
        <div className="text-sm md:text-lg font-bold text-primary group-hover:scale-105 mb-3 md:mb-4 transition-transform">
          {formatPrice(product.hargaUmum)}
        </div>
        
        <div className="text-xs text-gray-500">Klik untuk beli via WhatsApp</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-pink-50 to-white py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6 font-pacifico">
              {SITE_CONFIG.business.tagline}
            </h1>            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 font-montserrat font-medium">
              {SITE_CONFIG.business.description}
            </p>
            <a 
              href={getWhatsAppUrl(SITE_CONFIG.whatsappMessages.consultation)} 
              className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg hover:bg-pink-600 transition-colors inline-block"
            >
              Konsultasi Sekarang
            </a>
          </div>
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <div className="relative">
              {/* Doctor Photo - PNG transparent, no crop, no frame */}
              <Image 
                src="/drwahyu.png" 
                alt="Dr. Wahyu Triasmara" 
                width={400}
                height={500}
                className="w-64 h-auto md:w-80 lg:w-96"
                priority
                quality={100}
                unoptimized
              />
              
              {/* Floating Label */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-4 py-3 border border-pink-100 text-center whitespace-nowrap">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-gray-800 text-xs leading-tight">
                    dr. Wahyu Triasmara, M.Kes AAAM, AIFO-K
                  </h3>                  <p className="text-gray-600 text-xs">
                    Dokter & Founder {SITE_CONFIG.business.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Section - Sekarang menampilkan 8 produk */}
      <section id="produk" className="py-12 md:py-20 px-4 md:px-6 bg-white">        <div className="max-w-6xl mx-auto">          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-gray-800 mb-8 md:mb-16 font-montserrat">
            Produk {SITE_CONFIG.business.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loading ? (
              // Loading skeleton - 8 produk
              [...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg md:rounded-2xl shadow-lg p-3 md:p-6 text-center animate-pulse">
                  <div className="w-full h-32 md:h-48 mb-3 md:mb-4 bg-gray-300 rounded-xl"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-2/3 mx-auto"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              ))
            ) : (
              // Menampilkan 8 produk: API + static sebagai fallback
              getDisplayProducts().map((product, index) => renderProduct(product, index))
            )}
          </div>
          
          {/* View All Products Button */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/product" 
              className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg hover:bg-pink-600 transition-colors inline-block"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>      {/* Treatment Section */}
      <section id="treatment" className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-gray-800 mb-4 font-montserrat">
            Perawatan Unggulan
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-16 text-base md:text-xl font-montserrat font-light">
            Treatment profesional untuk kulit sehat dan cantik dengan hasil terbaik
          </p>
          
          {/* Treatment Categories */}
          <div className="space-y-12">
            {getFeaturedTreatments().map(({ category, treatments }) => (
              <div key={category} className="mb-12">
                {/* Category Header */}
                <div className="text-center mb-8">
                  <div className={`inline-block px-6 py-2 rounded-full text-sm font-semibold mb-4 ${getCategoryColor(category)}`}>
                    {category}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-montserrat">
                    {category}
                  </h3>
                </div>

                {/* Treatment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {treatments.map((treatment: Treatment, index: number) => (
                    <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                      <div className="p-6">
                        {/* Category Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(category)} shrink-0`}>
                            {category}
                          </div>
                          <div className="flex items-center text-primary">
                            <FontAwesomeIcon icon={faSpa} className="mr-1" />
                            <span className="text-sm font-medium">Premium</span>
                          </div>
                        </div>
                        
                        {/* Treatment Name */}
                        <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors font-montserrat">
                          {treatment.name}
                        </h4>
                        
                        {/* Price */}
                        <div className="text-2xl font-bold text-primary mb-4 font-montserrat">
                          {formatTreatmentPrice(treatment.price)}
                        </div>
                        
                        {/* Description */}
                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faGem} className="text-primary mr-2 text-sm" />
                            <span className="text-sm font-semibold text-gray-700">Deskripsi:</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {treatment.description}
                          </p>
                        </div>

                        {/* Benefit */}
                        <div className="mb-6">
                          <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 text-sm" />
                            <span className="text-sm font-semibold text-gray-700">Manfaat:</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {treatment.benefit}
                          </p>
                        </div>
                        
                        {/* Booking Button */}
                        <button
                          onClick={() => handleWhatsAppBooking(treatment.name, treatment.price)}
                          className="w-full bg-gradient-to-r from-primary to-pink-600 text-white py-3 px-6 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >                          <FontAwesomeIcon icon={faWhatsapp} />
                          Booking Perawatan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Treatments Button */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/treatment" 
              className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg hover:bg-pink-600 transition-colors inline-block font-montserrat"
            >
              Lihat Semua Perawatan
            </Link>
          </div>
        </div>
      </section>

      {/* Konsultasi Section */}
      <section id="konsultasi" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary to-pink-600">        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6 font-montserrat">
            Konsultasi Gratis dengan Ahli Kulit
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 font-montserrat font-medium">
            Tanya ahli kami seputar perawatan kulit yang tepat untukmu!
          </p>
          <a 
            href="https://wa.me/6285790795910" 
            className="bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Konsultasi Sekarang
          </a>
        </div>
      </section>

      {/* Testimoni Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-gray-800 mb-8 md:mb-16 font-montserrat">
            Apa Kata Mereka?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
              <p className="text-gray-600 mb-3 md:mb-4 italic text-sm md:text-base">
                &ldquo;Produk {SITE_CONFIG.business.name} membuat kulit saya lebih cerah dan sehat! Pelayanannya sangat memuaskan.&rdquo;
              </p>
              <p className="font-semibold text-primary text-sm md:text-base">- Sarah M.</p>
            </div>
            
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
              <p className="text-gray-600 mb-3 md:mb-4 italic text-sm md:text-base">
                &ldquo;Konsultasi gratis yang sangat membantu. Sekarang kulit wajah saya bebas jerawat!&rdquo;
              </p>
              <p className="font-semibold text-primary text-sm md:text-base">- Rina K.</p>
            </div>
            
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
              <p className="text-gray-600 mb-3 md:mb-4 italic text-sm md:text-base">
                &ldquo;DNA Salmon Serum benar-benar ampuh untuk anti aging. Highly recommended!&rdquo;
              </p>
              <p className="font-semibold text-primary text-sm md:text-base">- Maya L.</p>
            </div>
          </div>        </div>
      </section>

      {/* Footer */}
      <Footer />      {/* DISABLED: Promo Popup for First Time Visitors (render only after client mount) */}
      {/* {mounted && (
        <PromoPopup 
          isOpen={showPromoPopup} 
          onClose={handleClosePromoPopup} 
        />
      )} */}
    </div>
  );
};

export default LandingPage;