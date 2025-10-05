import { Metadata } from 'next'
import { SITE_CONFIG, getPageUrl, getCanonicalUrl } from '../../../lib/site-config'

interface Product {
  id: string;
  namaProduk: string;
  deskripsi: string | null;
  hargaUmum: number | null;
  gambar: string | null;
  fotoProduk: string | null;
  slug: string;
  bpom: string | null;
}

async function fetchProduct(slug: string): Promise<Product | null> {
  try {    // Use production URL for build time, localhost for development
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? SITE_CONFIG.website.baseUrl 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/products?slug=${slug}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    
    if (result.success && result.data.length > 0) {
      return result.data[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product for metadata:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await fetchProduct(params.slug);
  if (!product) {
    return {
      title: `Produk Tidak Ditemukan - ${SITE_CONFIG.business.name}`,
      description: `Produk yang Anda cari tidak ditemukan di ${SITE_CONFIG.business.name}.`,
    };
  }
  const productImageRelative = product.gambar || product.fotoProduk || SITE_CONFIG.images.logoSquare;
  // Ensure absolute URL for Open Graph
  const productImage = productImageRelative.startsWith('http') 
    ? productImageRelative 
    : `${SITE_CONFIG.website.baseUrl}${productImageRelative}`;
    
  const productPrice = product.hargaUmum 
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(product.hargaUmum)
    : 'Hubungi Kami';
  const title = `${product.namaProduk} - ${productPrice} | Produk Kecantikan Skincare ${SITE_CONFIG.business.name}`;
  const description = product.deskripsi 
    ? `${product.deskripsi} - Produk Kecantikan Skincare ${SITE_CONFIG.business.name} dengan formula dokter, harga ${productPrice}. ${product.bpom ? `BPOM: ${product.bpom}` : ''} Produk skincare profesional untuk hasil optimal.`
    : `${product.namaProduk} - Produk Kecantikan Skincare ${SITE_CONFIG.business.name} dengan formula dokter, harga ${productPrice}. Produk skincare profesional dengan kualitas terjamin dan hasil optimal.`;

  return {
    title,
    description,    keywords: `${product.namaProduk}, ${SITE_CONFIG.seo.keywords.product}, ${product.bpom ? `BPOM ${product.bpom}` : ''}`,
    metadataBase: new URL(SITE_CONFIG.website.baseUrl),
    openGraph: {
      title,
      description,
      images: [        {
          url: productImage,
          width: 800,
          height: 600,
          alt: `${product.namaProduk} - ${SITE_CONFIG.business.name}`,
        },
      ],
      type: 'website',
      siteName: SITE_CONFIG.business.name,
      url: getPageUrl(`/product/${params.slug}`),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [productImage],
    },    alternates: {
      canonical: getCanonicalUrl(`/product/${params.slug}`),
    },
  };
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {    const baseUrl = process.env.NODE_ENV === 'production' 
      ? SITE_CONFIG.website.baseUrl 
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const result = await response.json();
    
    if (result.success) {
      return result.data.map((product: Product) => ({
        slug: product.slug,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}