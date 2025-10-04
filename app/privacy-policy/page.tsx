import { Metadata } from 'next'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi - DRW Skincare',
  description: 'Kebijakan privasi DRW Skincare mengenai penggunaan data pribadi dan informasi pelanggan.',
  robots: 'index, follow',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <header className="bg-primary text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Kebijakan Privasi</h1>
          <p className="text-pink-100 mt-2">DRW Skincare</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-gray-600 mb-4">
              DRW Skincare mengumpulkan informasi pribadi yang Anda berikan secara sukarela saat:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Melakukan konsultasi melalui WhatsApp</li>
              <li>Membeli produk atau layanan kami</li>
              <li>Mendaftar untuk treatment kecantikan</li>
              <li>Berinteraksi dengan website kami</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Bagaimana Kami Menggunakan Informasi</h2>
            <p className="text-gray-600 mb-4">
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Memberikan layanan perawatan kulit dan konsultasi</li>
              <li>Memproses pesanan produk skincare</li>
              <li>Mengirimkan informasi produk dan promo terbaru</li>
              <li>Meningkatkan kualitas layanan kami</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Keamanan Data</h2>
            <p className="text-gray-600 mb-4">
              Kami berkomitmen melindungi informasi pribadi Anda dengan menggunakan langkah-langkah keamanan yang tepat 
              untuk mencegah akses tidak sah, penggunaan, atau pengungkapan informasi Anda.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Kontak</h2>
            <p className="text-gray-600 mb-4">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>DRW Skincare</strong><br />
                WhatsApp: 0857-9079-5910<br />
                Email: info@drwskincare.com
              </p>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}