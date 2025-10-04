'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { getWhatsAppUrl } from '../lib/site-config';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    // Show the button after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Start pulsing animation every 5 seconds
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 2000);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseInterval);
    };
  }, []);
  const handleClick = () => {
    const url = getWhatsAppUrl();
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Ripple effect background */}
      <div className={`absolute inset-0 rounded-full bg-green-400 opacity-50 ${isPulsing ? 'animate-ping' : ''}`} />
      <div className={`absolute inset-0 rounded-full bg-green-400 opacity-25 ${isPulsing ? 'animate-ping-delay' : ''}`} />
      
      {/* Main WhatsApp button */}
      <button
        onClick={handleClick}
        className={`
          relative w-16 h-16 bg-green-500 hover:bg-green-600 
          text-white rounded-full shadow-2xl 
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          transform hover:scale-110 active:scale-95
          ${isPulsing ? 'animate-bounce' : ''}
        `}
        aria-label="Chat via WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          Chat via WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  );
}