/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#e0e2db',
        'darker-bg': '#D2D4C8',
        'tea-green': '#D3EFBD',
        'darker-tea-green': '#B2E38C',
        'battleship-gray': '#72837B',
        'darker-battleship-gray': '#627069',
      }
    },
  },
  plugins: [],
}

