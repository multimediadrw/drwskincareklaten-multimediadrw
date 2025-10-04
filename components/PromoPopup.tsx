'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faGift, 
  faUsers, 
  faIdCard,
  faCalendarAlt,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { SITE_CONFIG, getWhatsAppUrl } from '../lib/site-config';

interface PromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoPopup: React.FC<PromoPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const promoMessage = `Halo! Saya tertarik dengan promo ${SITE_CONFIG.business.name}. Bisa info lebih lanjut?`;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close only if clicking the overlay background
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full mx-4 relative overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside popup from closing it
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-pink-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full p-3 inline-block mb-3">
              <FontAwesomeIcon icon={faGift} className="text-2xl text-white" />
            </div>
            <h2 className="text-xl font-extrabold font-source-code-pro mb-2">
               Promo Spesial!
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Promo 1 - Jumat Berkah */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-white text-sm" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 font-source-code-pro text-sm">
                  Jumat Berkah
                </h3>
                <p className="text-gray-600 text-xs font-source-code-pro font-light leading-relaxed">
                  Setiap hari <span className="font-semibold text-blue-600">Jumat</span>
                  <span className="font-bold text-blue-600"> diskon 15%</span> semua treatment!
                </p>
              </div>
            </div>
          </div>

          {/* Promo 2 - Ajak Teman */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500">
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                <FontAwesomeIcon icon={faUsers} className="text-white text-sm" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 font-source-code-pro text-sm">
                  Ajak Sahabat
                </h3>
                <p className="text-gray-600 text-xs font-source-code-pro font-light leading-relaxed">
                  Ajak teman treatment dapatkan
                  <span className="font-bold text-green-600"> diskon 15%</span> untuk berdua!
                </p>
              </div>
            </div>
          </div>

          {/* Promo 3 - Member Card */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border-l-4 border-purple-500">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-500 rounded-full p-2 flex-shrink-0">
                <FontAwesomeIcon icon={faIdCard} className="text-white text-sm" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 font-source-code-pro text-sm">
                  Member VIP
                </h3>
                <p className="text-gray-600 text-xs font-source-code-pro font-light leading-relaxed">
                  Pemegang kartu member mendapat 
                  <span className="font-bold text-purple-600"> diskon 10%</span> setiap kunjungan!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 flex space-x-3">
          <a
            href={getWhatsAppUrl(promoMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-primary to-pink-600 text-white rounded-lg font-source-code-pro font-bold text-sm hover:from-pink-600 hover:to-pink-700 transition-all text-center"
          >
            Tanya Promo
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
