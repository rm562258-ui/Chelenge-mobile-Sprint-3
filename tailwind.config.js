/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',
        teal: '#0F766E',
        background: '#F8FAFC',
        foreground: '#0F172A',
        muted: '#64748B',
        border: '#E2E8F0',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 118, 110, 0.12)',
      },
    },
  },
  plugins: [],
};
