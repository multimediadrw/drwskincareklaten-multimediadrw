'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SITE_CONFIG } from '../lib/site-config';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-6 py-4 md:py-5">
        <div className="flex items-center">          <Link href="/">
            <Image 
              src={SITE_CONFIG.images.logo} 
              alt="Griya Cantik Shovia Logo" 
              width={300}
              height={100}
              className="h-10 md:h-12 w-auto cursor-pointer"
              priority
              quality={100}
              unoptimized
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/product" className="text-gray-700 hover:text-primary transition-colors">Produk</Link>
          <Link href="/treatment" className="text-gray-700 hover:text-primary transition-colors">Treatment</Link>
          <a href="/#kontak" className="text-gray-700 hover:text-primary transition-colors">Kontak</a>
        </nav>
        
        {/* Desktop Konsultasi Button */}
        <a 
          href="https://wa.me/6285790795910" 
          className="hidden md:inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors text-base"
        >
          Konsultasi Gratis
        </a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <FontAwesomeIcon 
            icon={isMobileMenuOpen ? faTimes : faBars} 
            className="text-gray-700 text-xl"
          />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col py-4">
            <Link 
              href="/product" 
              className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Produk
            </Link>

            <Link 
              href="/treatment" 
              className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Treatment
            </Link>

            <a 
              href="/#kontak" 
              className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kontak
            </a>
            <a 
              href="https://wa.me/6285790795910" 
              className="mx-4 mt-3 mb-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-pink-600 transition-colors text-center text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Konsultasi Gratis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}