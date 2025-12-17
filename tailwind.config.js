/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
   darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#00FF88',      // Bright green (top of gradient)
          DEFAULT: '#00E676',    // Vibrant green
          dark: '#00C853',       // Medium green
        },
        teal: {
          light: '#00A896',      // Medium teal
          DEFAULT: '#008080',    // Deep teal (bottom of gradient)
          dark: '#006B6B',       // Darker teal
        },
        background: {
          light: '#1a1f2e',      // Dark blue-gray background
          DEFAULT: '#0a0e1a',    // Darker background
          dark: '#0f1419',       // Darkest background
        }
      }
    },
    
  },
  plugins: [],
}