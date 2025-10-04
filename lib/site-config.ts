/**
 * Konfigurasi terpusat untuk website DRW Skincare
 * Ubah nilai di sini untuk mengubah semua bagian website sekaligus
 */

export const SITE_CONFIG = {
  // Kontak & Media Sosial
  whatsapp: {
    number: '6285790795910', // Format internasional (62 + nomor tanpa 0)
    displayNumber: '0857-9079-5910', // Format tampilan untuk user
  },
  
  // Website & URL
  website: {
    baseUrl: 'https://drwskincarejakarta.com',
    name: 'DRW Skincare',
    domain: 'drwskincarejakarta.com',
  },
    // Informasi Bisnis
  business: {
    name: 'DRW Skincare',
    fullName: 'DRW Skincare Jakarta & Bekasi',    tagline: 'Cantikmu Berawal Dari sini',
    founder: 'dr. Wahyu Triasmara, M.Kes AAAM, AIFO-K',
    description: 'Pusat kecantikan dan perawatan kulit terpercaya. Menyediakan produk DRW Skincare, treatment profesional, dan konsultasi dengan dokter berpengalaman.',
    shortDescription: 'Solusi perawatan kulit terbaik dengan produk berkualitas dan konsultasi profesional.',
  },
  
  // Social Media
  socialMedia: {
    tiktok: 'https://www.tiktok.com/@griyacantikshovia',
    facebook: 'https://www.facebook.com/GriyaCantikShovia',
    facebookPersonal: 'https://www.facebook.com/shovia.parmawati.2025',
    instagram: 'https://instagram.com/griya_cantik_shovia',
    shopee: 'https://shopee.co.id/drwskincare_onlinehop',
    tokopedia: 'https://www.tokopedia.com/drwskincareasli',
  },
  
  // SEO & Meta
  seo: {
    keywords: {
      primary: 'DRW Skincare, klinik kecantikan jakarta, produk skincare jakarta, perawatan kulit bekasi, dokter kulit jakarta, facial jakarta, treatment anti aging, skincare profesional',
      product: 'produk kecantikan DRW skincare, skincare DRW jakarta, produk skincare dokter, serum anti aging, whitening serum, acne cream, facial moisturizer, cleanser wajah, produk kecantikan BPOM, skincare profesional, cosmeceutical, produk dokter kulit',
      treatment: 'perawatan kulit, kecantikan DRW skincare, treatment facial, perawatan kulit profesional, klinik kecantikan, facial whitening, anti aging treatment, perawatan jerawat, mikrodermabrasi, chemical peeling, RF treatment, dokter kulit',
    },
  },
    // Default Messages untuk WhatsApp
  whatsappMessages: {
    get general() { return `Halo! Saya ingin berkonsultasi tentang produk ${SITE_CONFIG.business.name}.`; },
    get consultation() { return `Halo! Saya ingin konsultasi tentang produk ${SITE_CONFIG.business.name}.`; },
    product: (productName: string) => `Halo! Saya tertarik untuk membeli produk "${productName}". Bisa tolong berikan informasi lebih lanjut?`,
    treatment: (treatmentName: string, price: string) => `Halo! Saya tertarik untuk booking treatment "${treatmentName}" dengan harga ${price}. Bisa tolong berikan informasi jadwal dan prosedurnya?`,  },
  
  // Images & Assets
  images: {
    logo: '/logo_griyacantiksovia.png',
    logoSquare: '/logo_drwskincare_square.png',
    favicon: '/favicon.ico',
    doctor: '/drwahyu.png',
    ogProduct: '/og_product.png',
    ogTreatment: '/og_treatment.png',
  },
    // Lokasi & Alamat
  location: {
    area: 'Jakarta dan Bekasi',
    description: 'Melayani Jakarta, Bekasi, dan sekitarnya',
    stores: [
      {
        name: 'GRIYA CANTIK SHOVIA by DRWSKINCARE',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.372305881908!2d106.9321913!3d-6.345810500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699358bb8637bd%3A0x9f104e88d4585634!2sGRIYA%20CANTIK%20SHOVIA%20by%20DRWSKINCARE!5e0!3m2!1sid!2sid!4v1759504071187!5m2!1sid!2sid',
        area: 'Jakarta'
      },
      {
        name: 'Griya Cantik Shovia by DRWSKINCARE CIPAYUNG',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.494205796528!2d106.9005035!3d-6.329952899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed0ad502684b%3A0x43c45e86c0f14a30!2sGriya%20Cantik%20Shovia%20by%20DRWSKINCARE%20CIPAYUNG!5e0!3m2!1sid!2sid!4v1759504101563!5m2!1sid!2sid',
        area: 'Cipayung'
      }
    ]
  },
} as const;

// Helper functions untuk kemudahan penggunaan
export const getWhatsAppUrl = (message?: string) => {
  const encodedMessage = message ? encodeURIComponent(message) : encodeURIComponent(SITE_CONFIG.whatsappMessages.general);
  return `https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodedMessage}`;
};

export const getProductWhatsAppUrl = (productName: string) => {
  const message = SITE_CONFIG.whatsappMessages.product(productName);
  return getWhatsAppUrl(message);
};

export const getTreatmentWhatsAppUrl = (treatmentName: string, price: string) => {
  const message = SITE_CONFIG.whatsappMessages.treatment(treatmentName, price);
  return getWhatsAppUrl(message);
};

export const getPageUrl = (path: string = '') => {
  return `${SITE_CONFIG.website.baseUrl}${path}`;
};

export const getCanonicalUrl = (path: string = '') => {
  return getPageUrl(path);
};
