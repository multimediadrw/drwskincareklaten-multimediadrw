'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SITE_CONFIG, getWhatsAppUrl, getTreatmentWhatsAppUrl } from '../../lib/site-config';
import {
  faSpa,
  faSearch,
  faFilter,
  faStar,
  faGem,
  faUsers,
  faStethoscope,
  faDumbbell,
  faCut,
  faShieldAlt,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import menuPerawatan from '../../menu_perawatan.json';

interface Treatment {
  name: string;
  price: number;
  description: string;
  benefit: string;
}

interface TreatmentCategory {
  [key: string]: Treatment[];
}

const treatmentData: TreatmentCategory = menuPerawatan;

const TreatmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  // Get all categories
  const categories = Object.keys(treatmentData);

  // Filter treatments based on search and filters
  const filteredCategories = () => {
    let filtered: TreatmentCategory = {};
    
    Object.entries(treatmentData).forEach(([category, treatments]) => {
      if (selectedCategory === 'all' || selectedCategory === category) {
        let filteredTreatments = treatments.filter((treatment: Treatment) => {
          const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               treatment.description.toLowerCase().includes(searchTerm.toLowerCase());
          
          let matchesPrice = true;
          if (priceRange !== 'all') {
            switch (priceRange) {
              case 'low':
                matchesPrice = treatment.price <= 100000;
                break;
              case 'medium':
                matchesPrice = treatment.price > 100000 && treatment.price <= 200000;
                break;
              case 'high':
                matchesPrice = treatment.price > 200000;
                break;
            }
          }
          
          return matchesSearch && matchesPrice;
        });
        
        if (filteredTreatments.length > 0) {
          filtered[category] = filteredTreatments;
        }
      }
    });
    
    return filtered;
  };

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get category colors
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

  // Handle WhatsApp booking
  const handleWhatsAppBooking = (treatmentName: string, price: number) => {
    const formattedPrice = formatPrice(price);
    const url = getTreatmentWhatsAppUrl(treatmentName, formattedPrice);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-pink-600 text-white py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Perawatan Kecantikan Premium
          </h1>
          <p className="text-lg md:text-xl mb-8 text-pink-100 max-w-3xl mx-auto">
            Rangkaian lengkap perawatan profesional dengan teknologi terdepan dan bahan berkualitas tinggi untuk hasil optimal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={getWhatsAppUrl(SITE_CONFIG.whatsappMessages.consultation)}
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >              <FontAwesomeIcon icon={faWhatsapp} />
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 md:px-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari treatment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
            
            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Price Filter */}
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            >
              <option value="all">Semua Harga</option>
              <option value="low">≤ Rp 100.000</option>
              <option value="medium">Rp 100.000 - Rp 200.000</option>
              <option value="high">&gt; Rp 200.000</option>
            </select>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {Object.entries(filteredCategories()).length === 0 ? (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faSearch} className="text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ditemukan treatment</h3>
              <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter Anda</p>
            </div>
          ) : (
            Object.entries(filteredCategories()).map(([category, treatments]) => (
              <div key={category} className="mb-12">
                {/* Category Header */}
                <div className="text-center mb-8">
                  <div className={`inline-block px-6 py-2 rounded-full text-sm font-semibold mb-4 ${getCategoryColor(category)}`}>
                    {category}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {category}
                  </h2>
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
                          <div className="flex items-center text-yellow-500">
                            <FontAwesomeIcon icon={faStar} className="mr-1" />
                            <span className="text-sm font-medium">Premium</span>
                          </div>
                        </div>
                        
                        {/* Treatment Name */}
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                          {treatment.name}
                        </h3>
                        
                        {/* Price */}
                        <div className="text-2xl font-bold text-primary mb-4">
                          {formatPrice(treatment.price)}
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
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-pink-600 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Konsultasi Gratis Sebelum Treatment
          </h2>
          <p className="text-lg text-pink-100 mb-8">
            Tim dokter dan terapis berpengalaman siap memberikan konsultasi terbaik untuk kebutuhan perawatan Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={getWhatsAppUrl(SITE_CONFIG.whatsappMessages.consultation)}
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >              <FontAwesomeIcon icon={faWhatsapp} />
              Konsultasi Sekarang
            </a>
            <Link 
              href="/product"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center gap-2"
            >              <FontAwesomeIcon icon={faSpa} />
              Lihat Produk Perawatan
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TreatmentPage;