/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // الألوان لازم تكون في الـ object الخاص بها
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          600: '#2563eb', 
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        accent: '#f59e0b',
      },
      // الـ fontFamily لازم تكون بره الـ colors وجوه الـ extend
      fontFamily: {
        sans: ['"Readex Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}