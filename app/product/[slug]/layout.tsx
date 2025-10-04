import { Metadata } from 'next'

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
  try {
    // Use production URL for build time, localhost for development
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://drwskincarejakarta.com' 
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
      title: 'Produk Tidak Ditemukan - DRW Skincare',
      description: 'Produk yang Anda cari tidak ditemukan di DRW Skincare.',
    };
  }

  const productImageRelative = product.gambar || product.fotoProduk || '/logo_drwskincare_square.png';
  // Ensure absolute URL for Open Graph
  const productImage = productImageRelative.startsWith('http') 
    ? productImageRelative 
    : `https://drwskincarejakarta.com${productImageRelative}`;
    
  const productPrice = product.hargaUmum 
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(product.hargaUmum)
    : 'Hubungi Kami';

  const title = `${product.namaProduk} - ${productPrice} | Produk Kecantikan Skincare DRW Skincare`;
  const description = product.deskripsi 
    ? `${product.deskripsi} - Produk Kecantikan Skincare DRW Skincare dengan formula dokter, harga ${productPrice}. ${product.bpom ? `BPOM: ${product.bpom}` : ''} Produk skincare profesional untuk hasil optimal.`
    : `${product.namaProduk} - Produk Kecantikan Skincare DRW Skincare dengan formula dokter, harga ${productPrice}. Produk skincare profesional dengan kualitas terjamin dan hasil optimal.`;

  return {
    title,
    description,
    keywords: `${product.namaProduk}, produk kecantikan skincare, DRW skincare jakarta, produk skincare dokter, produk kecantikan profesional, skincare BPOM, perawatan kulit, ${product.bpom ? `BPOM ${product.bpom}` : ''}`,
    metadataBase: new URL('https://drwskincarejakarta.com'),
    openGraph: {
      title,
      description,
      images: [
        {
          url: productImage,
          width: 800,
          height: 600,
          alt: `${product.namaProduk} - DRW Skincare`,
        },
      ],
      type: 'website',
      siteName: 'DRW Skincare',
      url: `https://drwskincarejakarta.com/product/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [productImage],
    },
    alternates: {
      canonical: `https://drwskincarejakarta.com/product/${params.slug}`,
    },
  };
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://drwskincarejakarta.com' 
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