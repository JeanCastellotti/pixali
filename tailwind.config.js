const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/views/**/*.edge'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
        },
      },
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
        cherry: ['Cherry Bomb One', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
