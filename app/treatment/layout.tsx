import { Metadata } from 'next'
import { SITE_CONFIG, getPageUrl, getCanonicalUrl } from '../../lib/site-config'

export const metadata: Metadata = {
  title: `Perawatan Kulit & Kecantikan ${SITE_CONFIG.business.name} - Treatment Profesional`,
  description: `Pusat Perawatan Kulit & Kecantikan ${SITE_CONFIG.business.name}. Treatment facial profesional, anti aging, whitening, jerawat, mikrodermabrasi, chemical peeling dengan dokter berpengalaman. Perawatan kulit terdepan dengan hasil optimal.`,
  keywords: SITE_CONFIG.seo.keywords.treatment,
  metadataBase: new URL(SITE_CONFIG.website.baseUrl),  openGraph: {
    title: `Perawatan Kulit & Kecantikan ${SITE_CONFIG.business.name} - Treatment Profesional`,
    description: 'Pusat Perawatan Kulit & Kecantikan terpercaya. Treatment facial profesional dengan teknologi terdepan dan dokter berpengalaman untuk hasil kulit yang optimal.',    images: [
      {
        url: SITE_CONFIG.images.ogTreatment,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.business.name} - Perawatan Kulit & Kecantikan Treatment Profesional`,
      },
    ],
    type: 'website',
    siteName: SITE_CONFIG.business.name,
    url: getPageUrl('/treatment'),
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Perawatan Kulit & Kecantikan ${SITE_CONFIG.business.name}`,
    description: 'Pusat Perawatan Kulit & Kecantikan terpercaya dengan treatment profesional.',
    images: [SITE_CONFIG.images.ogTreatment],
  },  alternates: {
    canonical: getCanonicalUrl('/treatment'),
  },
}

export default function TreatmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}