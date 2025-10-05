import './globals.css'
import '../lib/fontawesome'
import { Pacifico, Montserrat } from 'next/font/google'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import { SITE_CONFIG } from '../lib/site-config'

const pacifico = Pacifico({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
})
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
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
  },  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.business.name} - Pusat Kecantikan Terpercaya`,
    description: SITE_CONFIG.business.description,
    images: [SITE_CONFIG.images.logoSquare],
  },alternates: {
    canonical: SITE_CONFIG.website.baseUrl,
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
      "@type": "PostalAddress",      "streetAddress": `${SITE_CONFIG.business.name} Pusat`,
      "addressLocality": SITE_CONFIG.location.area,
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
    ],    "founder": {
      "@type": "Person",
      "name": SITE_CONFIG.business.founder,
      "jobTitle": `Dokter & Founder ${SITE_CONFIG.business.name}`
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
      <body className={`${montserrat.className} ${pacifico.variable} ${montserrat.variable}`}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}