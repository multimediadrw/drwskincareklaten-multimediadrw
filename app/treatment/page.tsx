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

interface Treatment {
  name: string;
  price: number;
  description: string;
  benefits: string[];
}

interface TreatmentCategory {
  [key: string]: Treatment[];
}

const treatmentData: TreatmentCategory = {
  "Paket Facial Silver": [
    {
      "name": "Facial Glow Up",
      "price": 85000,
      "description": "Pembersihan wajah dasar dengan pijat ringan dan masker untuk memberi efek segar dan cerah.",
      "benefits": [
        "Membersihkan kotoran & minyak berlebih",
        "Menyegarkan kulit agar tampak lebih glowing",
        "Meningkatkan sirkulasi darah wajah"
      ]
    },
    {
      "name": "Facial Acne Clean",
      "price": 95000,
      "description": "Facial dasar fokus kulit berjerawat dengan pembersihan pori dan masker penenang.",
      "benefits": [
        "Membantu mengurangi minyak penyebab jerawat",
        "Meredakan kemerahan ringan",
        "Membuat pori terasa lebih bersih"
      ]
    },
    {
      "name": "Facial Glow Up + Messo Therapy (Setrika Wajah)",
      "price": 135000,
      "description": "Facial Glow Up ditambah setrika wajah untuk membantu penyerapan serum lebih optimal.",
      "benefits": [
        "Kulit tampak lebih halus dan lembut",
        "Penyerapan nutrisi serum lebih baik",
        "Memberi efek cerah yang lebih tahan lama"
      ]
    },
    {
      "name": "Facial Acne Clean + Messo Therapy (Setrika Wajah)",
      "price": 145000,
      "description": "Perawatan acne clean dipadukan dengan setrika wajah untuk menenangkan dan merawat kulit berjerawat.",
      "benefits": [
        "Mengurangi tampilan pori tersumbat",
        "Membantu menenangkan kulit berjerawat",
        "Mendukung perbaikan tekstur kulit"
      ]
    },
    {
      "name": "Facial Pelling + Messo Therapy",
      "price": 155000,
      "description": "Eksfoliasi lembut (peeling) untuk angkat sel kulit mati ditambah setrika wajah.",
      "benefits": [
        "Mencerahkan dan meratakan warna kulit",
        "Membuat tekstur kulit terasa lebih halus",
        "Mendukung regenerasi sel kulit baru"
      ]
    }
  ],
  "Facial Triple Premium": [
    {
      "name": "F. Detox (Facial+Detox+Messo Therapy/Setrika Wajah+Totok Wajah)",
      "price": 190000,
      "description": "Facial lengkap dengan tahap detoks, setrika wajah, dan totok untuk relaksasi.",
      "benefits": [
        "Membantu mengangkat kotoran mendalam",
        "Meningkatkan sirkulasi & rasa rileks",
        "Kulit terasa lebih ringan dan segar"
      ]
    },
    {
      "name": "F. Microdermabrasi (Facial+Micro+Messo Therapy/Setrika Wajah+Totok Wajah)",
      "price": 185000,
      "description": "Pengelupasan mekanis lembut untuk memperbaiki tekstur, dilengkapi setrika wajah.",
      "benefits": [
        "Menghaluskan tekstur & bekas halus",
        "Mencerahkan kulit kusam",
        "Mendukung produksi kolagen alami"
      ]
    },
    {
      "name": "F. DNA Salmon (Facial+DNA Salmon Micronidle+Messo Therapy/Setrika Wajah+Totok Wajah)",
      "price": 195000,
      "description": "Facial dengan penyaluran serum DNA Salmon menggunakan micro-needling ringan dan setrika wajah.",
      "benefits": [
        "Membantu melembapkan intens",
        "Mendukung perbaikan skin barrier",
        "Kulit tampak kenyal dan bercahaya"
      ]
    },
    {
      "name": "F. Ultrasound (Facial+Ultrasound+Messo Therapy/Setrika Wajah+Totok Wajah)",
      "price": 185000,
      "description": "Facial dengan alat ultrasound untuk membantu penetrasi serum dan menenangkan kulit.",
      "benefits": [
        "Penyerapan serum lebih maksimal",
        "Membuat kulit terasa kencang",
        "Menenangkan kulit yang lelah"
      ]
    },
    {
      "name": "F. Snow White Pelling (Facial+Snow White+Pelling+Messo Therapy/Setrika Wajah+Totok Wajah)",
      "price": 195000,
      "description": "Eksfoliasi pencerah bertahap dengan rangkaian Snow White dan setrika wajah.",
      "benefits": [
        "Mencerahkan tampilan kulit kusam",
        "Membantu meratakan warna kulit",
        "Kulit tampak lebih bersih dan cerah"
      ]
    },
    {
      "name": "Facial Melasma Micronidle",
      "price": 175000,
      "description": "Perawatan khusus area hiperpigmentasi dengan micro-needling ringan.",
      "benefits": [
        "Mendukung pemudaran tampilan flek",
        "Meningkatkan penyerapan bahan pencerah",
        "Menyamarkan warna kulit tidak merata"
      ]
    },
    {
      "name": "IPL Rejuve (Facial+IPL Rejuve+Messo Therapy/Setrika Wajah+Totok Wajah)",
      "price": 195000,
      "description": "Rangkaian facial dengan teknologi IPL untuk peremajaan tampilan kulit.",
      "benefits": [
        "Membantu menyamarkan noda ringan",
        "Kulit tampak lebih cerah dan segar",
        "Mendukung tampilan pori lebih halus"
      ]
    },
    {
      "name": "IPL Acne (Facial+IPL Acne+Messo Therapy/Setrika Wajah+Totok Wajah)",
      "price": 175000,
      "description": "Facial dengan mode IPL untuk membantu perawatan kulit berjerawat.",
      "benefits": [
        "Membantu mengurangi tampilan jerawat aktif",
        "Menjaga kebersihan pori",
        "Menenangkan kemerahan ringan"
      ]
    }
  ],
  "Paket Facial Combo Premium": [
    {
      "name": "Facial High Frekuensi Acne Clean (Facial+HF+Messo Therapy/Setrika Wajah+PDT)",
      "price": 235000,
      "description": "Facial acne dengan alat high-frequency, setrika wajah, dan PDT (photodynamic).",
      "benefits": [
        "Membantu mengurangi bakteri penyebab jerawat",
        "Mengontrol minyak berlebih",
        "Menenangkan kulit dan memberi efek bersih"
      ]
    },
    {
      "name": "Facial Cleopatra (Facial+Microdermabrasi+Messo Therapy/Setrika Wajah+Totok Wajah)+PDT",
      "price": 325000,
      "description": "Perawatan premium gabungan microdermabrasi, setrika wajah, totok, dan PDT.",
      "benefits": [
        "Kulit terasa lebih halus & bercahaya",
        "Membantu menyamarkan kusam & pori",
        "Memberi efek firming ringan"
      ]
    },
    {
      "name": "Facial Booster Micronidle (Facial+Detox+DNA Salmon Micronidle+Messo Therapy/Setrika Wajah+Totok Wajah)+PDT",
      "price": 385000,
      "description": "Detoks + micro-needling serum DNA Salmon + setrika wajah + PDT.",
      "benefits": [
        "Hidrasi intens & tampilan kenyal",
        "Mendukung perbaikan tekstur",
        "Tampak glowing lebih tahan lama"
      ]
    },
    {
      "name": "Facial Anti Anging (Facial+Microdermabrasi+DNA Salmon Micronidle+Messo Therapy/Setrika Wajah+Totok Wajah)+PDT",
      "price": 385000,
      "description": "Kombinasi anti-aging dengan microdermabrasi, DNA Salmon, setrika wajah, dan PDT.",
      "benefits": [
        "Membantu tampilan kulit lebih kencang",
        "Menghaluskan kerutan halus",
        "Memberi kesan kulit lebih muda"
      ]
    },
    {
      "name": "Facial Anti Anging Melasma (Facial+Microdermabrasi+Melasma Micronidle+Messo Therapy/Setrika Wajah+Totok Wajah)",
      "price": 385000,
      "description": "Paket anti-aging sekaligus fokus hiperpigmentasi dengan micro-needling.",
      "benefits": [
        "Menyamarkan tampilan flek",
        "Mencerahkan dan meratakan warna kulit",
        "Mendukung elastisitas kulit"
      ]
    }
  ],
  "Tindakan Medis": [
    {
      "name": "Booster Injeksi DNA Salmon (Free Facial Microdermabrasi)",
      "price": 850000,
      "description": "Injeksi booster dengan kandungan DNA Salmon, termasuk facial microdermabrasi.",
      "benefits": [
        "Membantu hidrasi dan kekenyalan kulit",
        "Mendukung perbaikan skin barrier",
        "Kulit tampak lebih sehat dan segar"
      ]
    },
    {
      "name": "Booster Injeksi Melasma (Free Facial Melasma Micronidle)",
      "price": 550000,
      "description": "Injeksi booster yang difokuskan untuk area hiperpigmentasi, dilengkapi facial khusus.",
      "benefits": [
        "Mendukung pemudaran tampilan noda",
        "Mencerahkan area yang kusam",
        "Membantu meratakan warna kulit"
      ]
    },
    {
      "name": "Dermapen",
      "price": 350000,
      "description": "Terapi micro-needling menggunakan alat dermapen untuk merangsang peremajaan kulit.",
      "benefits": [
        "Membantu meratakan tekstur",
        "Menyamarkan tampilan pori & bekas ringan",
        "Meningkatkan penyerapan serum perawatan"
      ]
    },
    {
      "name": "Facial Acne Clean + Dermapen",
      "price": 425000,
      "description": "Paket pembersihan jerawat dikombinasikan dengan micro-needling dermapen.",
      "benefits": [
        "Membersihkan pori dan mendukung perawatan bekas",
        "Membantu kontrol minyak",
        "Meningkatkan efektivitas serum anti-acne"
      ]
    },
    {
      "name": "Paket Dermapen + Facial Acne Clean 4x Treatment",
      "price": 1500000,
      "description": "Program 4 kali sesi dermapen dengan facial acne untuk hasil lebih maksimal.",
      "benefits": [
        "Perbaikan bertahap pada tekstur & bekas ringan",
        "Membantu meminimalkan breakout berulang",
        "Hasil perawatan lebih konsisten"
      ]
    },
    {
      "name": "Soft Couter Menghilangkan Tahi Lalat, Milia, Skintag, Kutil",
      "price": 35000,
      "description": "Tindakan minor untuk mengangkat lesi kulit tertentu (harga mulai, tergantung area).",
      "benefits": [
        "Tampilan kulit lebih rapi",
        "Proses cepat dan ringkas",
        "Disesuaikan dengan ukuran/area"
      ]
    }
  ],
  "Body Treatment": [
    {
      "name": "IPL Removal Underderm (kedua ketiak)",
      "price": 150000,
      "description": "Penghilangan rambut halus area ketiak dengan teknologi IPL.",
      "benefits": [
        "Rambut tumbuh lebih lambat dan halus",
        "Kulit terasa lebih bersih",
        "Proses cepat dan praktis"
      ]
    },
    {
      "name": "IPL Removal Kedua Tangan",
      "price": 175000,
      "description": "Perawatan IPL untuk mengurangi rambut halus di kedua lengan.",
      "benefits": [
        "Mengurangi frekuensi shaving/waxing",
        "Kulit terasa lebih halus",
        "Hasil tampak rapi"
      ]
    },
    {
      "name": "IPL Kedua Kaki",
      "price": 225000,
      "description": "Pengurangan rambut halus pada kedua kaki menggunakan IPL.",
      "benefits": [
        "Membuat kulit kaki terasa lebih halus",
        "Tampilan lebih bersih dan rapi",
        "Praktis untuk perawatan rutin"
      ]
    },
    {
      "name": "IPL Acne Punggung",
      "price": 450000,
      "description": "Terapi IPL khusus area punggung untuk membantu perawatan jerawat.",
      "benefits": [
        "Membantu mengurangi tampilan jerawat punggung",
        "Membersihkan pori-pori",
        "Menjaga kulit punggung terasa lebih nyaman"
      ]
    },
    {
      "name": "HF Acne Punggung",
      "price": 485000,
      "description": "Perawatan high-frequency untuk area punggung yang rentan berjerawat.",
      "benefits": [
        "Membantu mengontrol minyak berlebih",
        "Membersihkan pori dan menenangkan kemerahan",
        "Mendukung kebersihan kulit punggung"
      ]
    },
    {
      "name": "Manicure",
      "price": 100000,
      "description": "Perawatan kuku tangan meliputi potong, bentuk, perapian kutikula, dan pewarnaan dasar.",
      "benefits": [
        "Kuku tampak rapi dan bersih",
        "Meningkatkan kepercayaan diri",
        "Memberi kesan tangan terawat"
      ]
    },
    {
      "name": "Pedicure",
      "price": 175000,
      "description": "Perawatan kuku kaki termasuk pembersihan, scrub ringan, dan perapian kutikula.",
      "benefits": [
        "Kuku kaki tampak rapi",
        "Membantu menghaluskan telapak",
        "Memberi rasa nyaman saat berjalan"
      ]
    },
    {
      "name": "Paket Menicure Pedicure",
      "price": 175000,
      "description": "Paket perawatan kuku tangan dan kaki sekaligus.",
      "benefits": [
        "Perawatan lengkap dalam satu sesi",
        "Tampilan kuku lebih bersih dan rapi",
        "Hemat waktu perawatan"
      ]
    }
  ],
  "Hair Treatment": [
    {
      "name": "Cuci Keramas + Creambath",
      "price": 55000,
      "description": "Perawatan rambut dasar mencakup keramas, pijat kulit kepala, dan creambath.",
      "benefits": [
        "Membersihkan kulit kepala & rambut",
        "Memberi rasa rileks pada kepala",
        "Rambut terasa lebih lembut dan mudah diatur"
      ]
    }
  ]
};

const TreatmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const handleWhatsAppBooking = (treatmentName: string, price: number) => {
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
    const whatsappUrl = getTreatmentWhatsAppUrl(treatmentName, formattedPrice);
    window.open(whatsappUrl, '_blank');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Paket Facial Silver':
        return faSpa;
      case 'Facial Triple Premium':
        return faGem;
      case 'Paket Facial Combo Premium':
        return faStar;
      case 'Tindakan Medis':
        return faStethoscope;
      case 'Body Treatment':
        return faUsers;
      case 'Hair Treatment':
        return faCut;
      default:
        return faSpa;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Paket Facial Silver':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Facial Triple Premium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Paket Facial Combo Premium':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Tindakan Medis':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Body Treatment':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Hair Treatment':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredTreatments = () => {
    let filtered: { category: string; treatments: Treatment[] }[] = [];
    
    Object.entries(treatmentData).forEach(([category, treatments]) => {
      if (selectedCategory === 'all' || selectedCategory === category) {
        const filteredTreatmentsList = treatments.filter(treatment =>
          treatment.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredTreatmentsList.length > 0) {
          filtered.push({ category, treatments: filteredTreatmentsList });
        }
      }
    });
    
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Title */}
      <section className="bg-gradient-to-br from-primary to-pink-600 py-12 md:py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Treatment & Perawatan
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Pilihan perawatan terbaik untuk kecantikan dan kesehatan kulit Anda
          </p>
          <div className="flex items-center justify-center gap-4 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSpa} />
              Profesional
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGem} />
              Teknologi Modern
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faStar} />
              Hasil Terjamin
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari treatment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <FontAwesomeIcon 
                icon={faFilter} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white min-w-[200px]"
              >
                <option value="all">Semua Kategori</option>
                {Object.keys(treatmentData).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {filteredTreatments().length === 0 ? (
            <div className="text-center py-20">
              <FontAwesomeIcon icon={faSearch} className="text-6xl text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                Tidak ada treatment yang ditemukan
              </h3>
              <p className="text-gray-500 mb-6">
                Coba ubah kata kunci pencarian atau pilih kategori yang berbeda
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredTreatments().map(({ category, treatments }) => (
              <div key={category} className="mb-12">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-full ${getCategoryColor(category)}`}>
                    <FontAwesomeIcon icon={getCategoryIcon(category)} className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {category}
                    </h2>
                    <p className="text-gray-600">
                      {treatments.length} treatment tersedia
                    </p>
                  </div>
                </div>

                {/* Treatments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {treatments.map((treatment, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 group overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Treatment Name & Category */}
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300 flex-1 pr-2">
                            {treatment.name}
                          </h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(category)} shrink-0`}>
                            {category}
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="text-2xl font-bold text-primary mb-3">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                          }).format(treatment.price)}
                        </div>
                        
                        {/* Benefits */}
                        <div className="mb-3">
                          <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2 text-sm" />
                            <span className="text-sm font-semibold text-gray-700">Manfaat:</span>
                          </div>
                          <ul className="text-sm text-gray-600 leading-relaxed space-y-1">
                            {treatment.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2 text-xs mt-1 shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
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
                        
                        {/* Booking Button */}
                        <button
                          onClick={() => handleWhatsAppBooking(treatment.name, treatment.price)}
                          className="w-full bg-gradient-to-r from-primary to-pink-600 text-white py-3 px-6 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">            <a 
              href={getWhatsAppUrl(SITE_CONFIG.whatsappMessages.consultation)} 
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              Konsultasi Sekarang
            </a>
            <Link 
              href="/product" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faSpa} />
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