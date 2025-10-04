import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faInstagram, 
  faTiktok,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { 
  faPhone,
  faShoppingBag
} from '@fortawesome/free-solid-svg-icons';
import { SITE_CONFIG, getWhatsAppUrl } from '../lib/site-config';

const Footer = () => {
  return (
    <footer id="kontak" className="bg-gray-800 text-white py-12 md:py-16 px-4 md:px-6">      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          <div>            <div className="mb-4">
              <Image 
                src={SITE_CONFIG.images.logo} 
                alt="Griya Cantik Shovia - Produk Kecantikan Skincare & Perawatan Kulit Terbaik" 
                width={300}
                height={100}
                className="h-16 w-auto"
                quality={100}
                unoptimized
              />
            </div><p className="text-gray-300 mb-4">
              {SITE_CONFIG.business.shortDescription}
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Kontak</h4>
            <div className="space-y-3">              {/* WhatsApp */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faWhatsapp} className="text-green-400 w-5 h-5" />
                <div>
                  <a href={getWhatsAppUrl()} className="text-gray-300 hover:text-white transition-colors">
                    {SITE_CONFIG.whatsapp.displayNumber}
                  </a>
                </div>
              </div>              {/* TikTok */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faTiktok} className="text-white w-5 h-5" />
                <a href={SITE_CONFIG.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  @griyacantikshovia
                </a>
              </div>

              {/* Shopee */}
              <div className="flex items-center space-x-3">
                <Image 
                  src="/shopee.ico" 
                  alt="Shopee" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5"
                />
                <a href={SITE_CONFIG.socialMedia.shopee} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Drwskincare_Onlinehop
                </a>
              </div>

              {/* Tokopedia */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faShoppingBag} className="text-green-400 w-5 h-5" />
                <a href={SITE_CONFIG.socialMedia.tokopedia} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  drwskincareasli
                </a>
              </div>

              {/* Facebook Personal */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-400 w-5 h-5" />
                <a href={SITE_CONFIG.socialMedia.facebookPersonal} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Shovia Parmawati
                </a>
              </div>

              {/* Facebook Fan Page */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-400 w-5 h-5" />
                <a href={SITE_CONFIG.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Griya Cantik Shovia
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faInstagram} className="text-pink-400 w-5 h-5" />
                <a href={SITE_CONFIG.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  @griya_cantik_shovia
                </a>
              </div>
            </div>
          </div>
            <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xl font-semibold mb-4">Lokasi Kami</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SITE_CONFIG.location.stores.map((store, index) => (
                <div key={index} className="space-y-2">
                  <h5 className="font-medium text-pink-200">{store.name}</h5>
                  <p className="text-sm text-gray-300">{store.area}</p>
                  <div className="rounded-lg overflow-hidden">
                    <iframe 
                      src={store.mapEmbedUrl}
                      width="100%" 
                      height="200" 
                      style={{border: 0}} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-48"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 {SITE_CONFIG.business.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;