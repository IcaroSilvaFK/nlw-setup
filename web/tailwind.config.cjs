/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0,1fr))',
      },
      colors: {
        background: '#09090a',
      },
    },
  },
  plugins: [],
};
