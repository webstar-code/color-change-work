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
          light: '#F5F5F5',      // Light gray background
          DEFAULT: '#E5E5E5',    // Slightly darker gray
        }
      }
    },
    
  },
  plugins: [],
}