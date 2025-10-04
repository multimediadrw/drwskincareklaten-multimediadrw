import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produk Kecantikan & Skincare DRW Skincare - Produk Dokter Terpercaya',
  description: 'Koleksi lengkap Produk Kecantikan & Skincare DRW Skincare dengan formula dokter. Serum anti aging, moisturizer, cleanser, facial cream, whitening serum, acne cream dan produk skincare profesional BPOM untuk semua jenis kulit.',
  keywords: 'produk kecantikan DRW skincare, skincare DRW jakarta, produk skincare dokter, serum anti aging, whitening serum, acne cream, facial moisturizer, cleanser wajah, produk kecantikan BPOM, skincare profesional, cosmeceutical, produk dokter kulit',
  metadataBase: new URL('https://drwskincarejakarta.com'),
  openGraph: {
    title: 'Produk Kecantikan & Skincare DRW Skincare - Formula Dokter Terpercaya',
    description: 'Koleksi lengkap Produk Kecantikan & Skincare DRW Skincare dengan formula dokter berpengalaman. Produk skincare profesional BPOM untuk hasil kulit optimal dan aman.',
    images: [
      {
        url: '/og_product.png',
        width: 1200,
        height: 630,
        alt: 'DRW Skincare - Produk Kecantikan & Skincare Formula Dokter',
      },
    ],
    type: 'website',
    siteName: 'DRW Skincare',
    url: 'https://drwskincarejakarta.com/product',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Produk Kecantikan & Skincare DRW Skincare',
    description: 'Koleksi lengkap Produk Kecantikan & Skincare dengan formula dokter berpengalaman.',
    images: ['/og_product.png'],
  },
  alternates: {
    canonical: 'https://drwskincarejakarta.com/product',
  },
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}