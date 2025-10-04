'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { getProductWhatsAppUrl } from '../lib/site-config'

interface BuyButtonProps {
  productName: string
  className?: string
}

export default function BuyButton({ productName, className = "" }: BuyButtonProps) {
  const handleWhatsAppClick = () => {
    const url = getProductWhatsAppUrl(productName)
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`
        bg-primary hover:bg-pink-600 
        text-white font-semibold py-3 px-6 rounded-lg
        flex items-center justify-center gap-2
        shadow-lg hover:shadow-xl 
        transition-all duration-300 ease-in-out
        transform hover:scale-105
        ${className}
      `}
      aria-label={`Beli ${productName}`}
    >
      Beli
    </button>
  )
}