/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        '3xl': '1792px',
        '4xl': '2048px',
        '5xl': '2304px',
        '6xl': '2560px',
        standalone: { raw: '(display-mode: standalone)' }
      },
      colors: {
        'blue-gray-400': '#c3d6ff',
        'blue-gray-900': '#224184'
      }
    }
  },
  plugins: []
}
