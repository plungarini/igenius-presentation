const colors = require('tailwindcss/colors')

module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {
      grayscale: ['hover'],
      ringWidth: ['hover'],
      ringColor: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
