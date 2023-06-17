 
const plugin = require('tailwindcss/plugin');
const php_files = require('./php_glob'); 
const { myUtilities, myComponents, myBase } = require('./library/tailwind/app/tailwind-plugin');
 
 
module.exports = {
  mode: 'jit',

  content: php_files,

  theme: {
    extend: {
      colors: {
        app: {
          primary: '#2E3192',
          secondary: '#0066B3',
          tertiary: '#FCB316',
          quaternary: '#828282',
          raven: '#132153;',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, addBase }) {
      addUtilities( myUtilities , ['responsive', 'hover', 'focus', 'active']);
      addBase(myBase, ['responsive', 'hover', 'focus', 'active']);
      addComponents( myComponents , ['responsive', 'hover', 'focus', 'active']);
    }),
  ],
};

 