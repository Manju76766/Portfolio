/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        'dark-bg': '#2E2E2E',
        text: '#111111',
        gray: '#666666',
        muted: '#999999',
        accent: '#C8FF00',
        'accent-dark': '#1A1A1A',
        'card-bg': '#F2F2F2',
        border: '#E5E5E5',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        sora: ['"Sora"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
