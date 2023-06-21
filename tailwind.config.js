const plugin = require('tailwindcss/plugin');
const php_files = require('./php_glob');
const {
  myUtilities,
  myComponents,
  myBase,
} = require('./library/tailwind-components/app/tailwind-plugin');

module.exports = {
  mode: 'jit',

  content: php_files,

  theme: {
    extend: {
      colors: {
        app: {
          primary: '#f91942',
          ['primary-light']: '#ff395d',
          light: '#5c5c5c',
          secondary: '#f919420f',
          tertiary: '#FCB316',
          confirm: '#54ba1d',
          raven: '#333333cc;',
          dark: '#1b1b1b',
          ['light-grey']: '#fafafa',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, addBase }) {
      addUtilities(myUtilities, ['responsive', 'hover', 'focus', 'active']);
      addBase(myBase, ['responsive', 'hover', 'focus', 'active']);
      addComponents(myComponents, ['responsive', 'hover', 'focus', 'active']);
    }),
  ],
};
