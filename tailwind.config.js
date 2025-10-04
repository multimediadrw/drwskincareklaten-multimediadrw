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
        sans: ['Arial', 'sans-serif'],
        'mystery-quest': ['var(--font-mystery-quest)', 'cursive'],
        'source-code-pro': ['var(--font-source-code-pro)', 'monospace'],
      },
      animation: {
        'ping-delay': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite 0.2s',
      },
    },
  },
  plugins: [],
}