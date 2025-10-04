import { Metadata } from 'next'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'FAQ - Pertanyaan Seputar DRW Skincare',
  description: 'Pertanyaan yang sering diajukan seputar produk skincare, treatment kecantikan, dan layanan DRW Skincare. Temukan jawaban lengkap di sini.',
  keywords: 'FAQ DRW Skincare, pertanyaan skincare, perawatan kulit, konsultasi gratis, treatment kecantikan, produk kecantikan skincare',
}

export default function FAQPage() {
  const faqData = [
    {
      question: "Apakah produk DRW Skincare aman dan sudah BPOM?",
      answer: "Ya, semua produk DRW Skincare telah terdaftar di BPOM dan aman digunakan. Kami menggunakan bahan-bahan berkualitas tinggi yang telah teruji secara klinis."
    },
    {
      question: "Bagaimana cara konsultasi dengan dokter?",
      answer: "Anda bisa konsultasi gratis dengan dr. Wahyu Triasmara melalui WhatsApp di 0857-9079-5910. Konsultasi tersedia setiap hari untuk membantu menentukan perawatan yang tepat."
    },
    {
      question: "Berapa lama hasil treatment terlihat?",
      answer: "Hasil treatment bervariasi tergantung jenis kulit dan kondisi awal. Umumnya hasil mulai terlihat setelah 2-4 kali perawatan dengan interval yang tepat."
    },
    {
      question: "Apakah DRW Skincare melayani area Jakarta dan Bekasi?",
      answer: "Ya, kami melayani area Jakarta, Bekasi, Depok, Tangerang, dan sekitarnya. Untuk produk, kami juga melayani pengiriman ke seluruh Indonesia."
    },
    {
      question: "Bagaimana cara booking treatment?",
      answer: "Booking treatment sangat mudah melalui WhatsApp atau langsung datang ke klinik. Tim kami akan membantu mengatur jadwal yang sesuai untuk Anda."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <Header />
      
      {/* Page Header */}
      <header className="bg-primary text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold">FAQ - Pertanyaan yang Sering Diajukan</h1>
          <p className="text-pink-100 mt-2">DRW Skincare</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h2>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Masih Ada Pertanyaan?</h3>
          <p className="text-gray-600 mb-6">
            Tim kami siap membantu Anda dengan pertanyaan lainnya seputar perawatan kulit dan produk skincare.
          </p>
          <a 
            href="https://wa.me/6285790795910" 
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg hover:bg-pink-600 transition-colors inline-block"
          >
            Konsultasi Gratis Sekarang
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}