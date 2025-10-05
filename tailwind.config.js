/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EE5097',
        secondary: '#f8f9fa',
      },      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        'pacifico': ['var(--font-pacifico)', 'cursive'],
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
      },
      animation: {
        'ping-delay': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite 0.2s',
      },
    },
  },
  plugins: [],
}