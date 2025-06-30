/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './app.js'
  ],
  theme: {
    extend: {
      spacing: {
        'xs': '0.96rem',
        'xxs': '0.6rem'
      },
      colors: {
        primary: '#f1f458',
        secondary: '#0f2d4d',
      }
    },
  },
  plugins: [],
};