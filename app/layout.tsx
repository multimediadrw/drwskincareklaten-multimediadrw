import './globals.css'
import '../lib/fontawesome'
import { Inter, Mystery_Quest, Source_Code_Pro } from 'next/font/google'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import { SITE_CONFIG } from '../lib/site-config'

const inter = Inter({ subsets: ['latin'] })
const mysteryQuest = Mystery_Quest({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mystery-quest',
})
const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-source-code-pro',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.website.baseUrl),
  title: `${SITE_CONFIG.business.name} - Produk Kecantikan Skincare & Perawatan Kulit Terbaik`,
  description: SITE_CONFIG.business.description,
  keywords: SITE_CONFIG.seo.keywords.primary,  authors: [{ name: SITE_CONFIG.business.name }],
  creator: SITE_CONFIG.business.name,
  publisher: SITE_CONFIG.business.name,
  robots: 'index, follow',
  icons: {
    icon: SITE_CONFIG.images.favicon,
    apple: SITE_CONFIG.images.logoSquare,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_CONFIG.website.baseUrl,
    siteName: SITE_CONFIG.business.name,
    title: SITE_CONFIG.business.tagline,
    description: SITE_CONFIG.business.description,
    images: [
      {
        url: SITE_CONFIG.images.logoSquare,
        width: 1200,
        height: 1200,
        alt: `${SITE_CONFIG.business.name} - ${SITE_CONFIG.business.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DRW Skincare - Pusat Kecantikan Terpercaya',
    description: 'Pusat kecantikan dan perawatan kulit terpercaya dengan produk skincare berkualitas dan dokter berpengalaman.',
    images: ['/logo_drwskincare_square.png'],
  },
  alternates: {
    canonical: 'https://drwskincarejakarta.com',
  },
  other: {
    'geo.region': 'ID-JK',
    'geo.placename': 'Jakarta',
    'geo.position': '-6.2088;106.8456',
    'ICBM': '-6.2088, 106.8456',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": SITE_CONFIG.business.name,
    "description": SITE_CONFIG.business.shortDescription,
    "url": SITE_CONFIG.website.baseUrl,
    "logo": `${SITE_CONFIG.website.baseUrl}${SITE_CONFIG.images.logoSquare}`,
    "image": `${SITE_CONFIG.website.baseUrl}${SITE_CONFIG.images.logoSquare}`,
    "telephone": "+62-858-5255-5571",
    "email": "info@drwskincare.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "DRW Skincare Pusat",
      "addressLocality": "Jakarta",
      "addressRegion": "DKI Jakarta",
      "postalCode": "10110",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Jakarta"
      },
      {
        "@type": "City", 
        "name": "Bekasi"
      },
      {
        "@type": "City",
        "name": "Depok"
      },
      {
        "@type": "City",
        "name": "Tangerang"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "dr. Wahyu Triasmara, M.Kes AAAM, AIFO-K",
      "jobTitle": "Dokter & Founder DRW Skincare"
    },
    "medicalSpecialty": [
      "Dermatology",
      "Cosmetic Medicine",
      "Anti-Aging Treatment"
    ],
    "serviceType": [
      "Facial Treatment",
      "Anti Aging Treatment",
      "Acne Treatment", 
      "Skin Whitening",
      "Skincare Products",
      "Beauty Consultation"
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Su 09:00-21:00",
    "sameAs": [
      "https://wa.me/6285790795910"
    ]
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <meta name="google-site-verification" content="GOOGLE_VERIFICATION_CODE" />
        <script async src="https://www.tiktok.com/embed.js"></script>
      </head>
      <body className={`${inter.className} ${mysteryQuest.variable} ${sourceCodePro.variable}`}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}