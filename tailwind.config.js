/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'black': '#0D080E',
        'red': '#d55130',
        'blue': '#628bb3',
        'green': '#826a0d',
        'yellow': '#e3a327'
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'Inter', 'Arial','sans-serif'],
      },
      content:{
        'arrow':'" →"',
      },
    },
  },
  plugins: [],
}

