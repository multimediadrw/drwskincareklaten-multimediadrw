/**
 * Konfigurasi terpusat untuk website DRW Skincare
 * Ubah nilai di sini untuk mengubah semua bagian website sekaligus
 */

export const SITE_CONFIG = {
  // Kontak & Media Sosial
  whatsapp: {
    number: '628124988314', // Format internasional (62 + nomor tanpa 0)
    displayNumber: '08124988314', // Format tampilan untuk user
  },
  
  // Website & URL
  website: {
    baseUrl: 'https://drwskincareklaten.com',
    name: 'DRW Skincare',
    domain: 'drwskincareklaten.com',
  },
    // Informasi Bisnis
  business: {
    name: 'DRW Skincare',
    fullName: 'DRW Skincare Klaten',    tagline: 'Cantikmu Berawal Dari sini',
    founder: 'dr. Wahyu Triasmara, M.Kes AAAM, AIFO-K',
    description: 'Pusat kecantikan dan perawatan kulit terpercaya. Menyediakan produk DRW Skincare, treatment profesional, dan konsultasi dengan dokter berpengalaman.',
    shortDescription: 'Solusi perawatan kulit terbaik dengan produk berkualitas dan konsultasi profesional.',
  },
  
  // Social Media
  socialMedia: {
    tiktok: 'https://www.tiktok.com/@mbeautyaesthetic_drwklt?_t=8Z15RzP7IW2&_r=1',
    facebook: 'https://www.facebook.com/mega.ukang',
    instagram: 'https://www.instagram.com/mbeautyaesthetic_drwklaten',
    youtube: 'https://www.youtube.com/@megaminochan8879',
    shopee: 'https://shopee.co.id/klinik_onlinedrwskincare',
  },
  
  // SEO & Meta
  seo: {
    keywords: {
      primary: 'DRW Skincare, klinik kecantikan klaten, produk skincare klaten, perawatan kulit klaten, dokter kulit klaten, facial klaten, treatment anti aging, skincare profesional',
      product: 'produk kecantikan DRW skincare, skincare DRW klaten, produk skincare dokter, serum anti aging, whitening serum, acne cream, facial moisturizer, cleanser wajah, produk kecantikan BPOM, skincare profesional, cosmeceutical, produk dokter kulit',
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
    logo: '/logo_drwskincare.png',
    logoSquare: '/logo_drwskincare_square.png',
    favicon: '/favicon.ico',
    doctor: '/drwahyu.png',
    ogProduct: '/og_product.png',
    ogTreatment: '/og_treatment.png',
  },
  // Lokasi & Alamat
  location: {
    area: 'Klaten',
    description: 'Melayani Klaten dan sekitarnya',
    stores: [      {
        name: 'Drw Skincare Klaten/Pedan(M\'Beauty Aesthetic)',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.016153397811!2d110.7055!3d-7.6814113000000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a4199efcfa795%3A0x7bc218388b2b7eab!2sDrw%20Skincare%20Klaten%2FPedan(M%27Beauty%20Aesthetic)!5e0!3m2!1sid!2sid!4v1759611945249!5m2!1sid!2sid',
        area: 'Klaten/Pedan'
      },
      {
        name: 'M\'Beauty Aesthetic Drw Skincare Cab Klaten',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.21293567957895!2d110.59975652863506!3d-7.714930637669314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a45d503654091%3A0xcfc7e27a0b39bd2f!2sM%27Beauty%20Aesthetic%20Drw%20Skincare%20Cab%20Klaten!5e0!3m2!1sid!2sid!4v1759611977612!5m2!1sid!2sid',
        area: 'Klaten'
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
