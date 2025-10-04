'use client';

// Google Analytics tracking functions
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific tracking functions for DRW Skincare
export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', 'contact', source);
};

export const trackProductView = (productName: string) => {
  trackEvent('product_view', 'products', productName);
};

export const trackBuyButtonClick = (productName: string) => {
  trackEvent('buy_button_click', 'products', productName);
};

export const trackTreatmentBooking = (treatmentName: string) => {
  trackEvent('treatment_booking', 'treatments', treatmentName);
};

export const trackPageView = (page: string) => {
  trackEvent('page_view', 'navigation', page);
};

export const trackConsultationClick = () => {
  trackEvent('consultation_click', 'contact', 'header_button');
};