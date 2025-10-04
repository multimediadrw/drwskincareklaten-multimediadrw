'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { getWhatsAppUrl } from '../lib/site-config'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleWhatsAppClick = () => {
    const url = getWhatsAppUrl()
    window.open(url, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          bg-green-500 hover:bg-green-600 
          text-white rounded-full p-6 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 ease-in-out
          transform hover:scale-110
          ${isHovered ? 'animate-pulse' : ''}
        `}
        aria-label="Chat WhatsApp"
      >        <FontAwesomeIcon 
          icon={faWhatsapp} 
          className="w-12 h-12" 
        />
      </button>
      
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap">
          Chat WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  )
}
