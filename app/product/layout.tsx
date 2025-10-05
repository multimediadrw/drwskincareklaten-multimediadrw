import { Metadata } from 'next'
import { SITE_CONFIG, getPageUrl, getCanonicalUrl } from '../../lib/site-config'

export const metadata: Metadata = {
  title: `Produk Kecantikan & Skincare ${SITE_CONFIG.business.name} - Produk Dokter Terpercaya`,
  description: `Koleksi lengkap Produk Kecantikan & Skincare ${SITE_CONFIG.business.name} dengan formula dokter. Serum anti aging, moisturizer, cleanser, facial cream, whitening serum, acne cream dan produk skincare profesional BPOM untuk semua jenis kulit.`,
  keywords: SITE_CONFIG.seo.keywords.product,
  metadataBase: new URL(SITE_CONFIG.website.baseUrl),
  openGraph: {
    title: `Produk Kecantikan & Skincare ${SITE_CONFIG.business.name} - Formula Dokter Terpercaya`,
    description: `Koleksi lengkap Produk Kecantikan & Skincare ${SITE_CONFIG.business.name} dengan formula dokter berpengalaman. Produk skincare profesional BPOM untuk hasil kulit optimal dan aman.`,
    images: [
      {
        url: SITE_CONFIG.images.ogProduct,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.business.name} - Produk Kecantikan & Skincare Formula Dokter`,
      },
    ],
    type: 'website',
    siteName: SITE_CONFIG.business.name,
    url: getPageUrl('/product'),
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Produk Kecantikan & Skincare ${SITE_CONFIG.business.name}`,
    description: `Koleksi lengkap Produk Kecantikan & Skincare dengan formula dokter berpengalaman dari ${SITE_CONFIG.business.name}.`,
    images: [SITE_CONFIG.images.ogProduct],
  },
  alternates: {
    canonical: getCanonicalUrl('/product'),
  },
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}