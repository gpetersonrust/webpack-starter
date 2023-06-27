const plugin = require('tailwindcss/plugin');
const find_files_recursively = require('./library/utilities/FS/find_files_recursively');
const { parent_dir } = require('./library/constants/global');
const php_files = find_files_recursively(
  parent_dir,
  [],
'node_modules|dist|.git',
'.php$'
  
);
 

module.exports = {
  mode: 'jit',

  content: php_files,

  theme: {
    extend: {
      colors: {
        app: {
          primary: '#070708;',
          secondary: '#212327',
          tertiary: '#00001e',
          light: '#292b2f',
          success: '#38c172',
          urgent: '#e3342f',
          progress: '#3490dc',
        },
      },
    },
  },
  //  plugin that adds btn and btn-primary classes
  plugins: [
    plugin(function ({ addComponents, addUtilities }) {
      const containers = {
        '.site-container': {
          width: '90%',
          margin: '0 auto',
          'max-width': '1400px',
        },
        ".team-member": {
          position: "relative",
          overflow: "hidden",
        }
      };
      const borders = {
        ".sm-border": {
        "@apply border border-solid": {}
        }, 

        ".sm-border-white": {
          "@apply border-white": {}
        }
      }
    
      const titles = {
        '.section-title': {
           "@apply text-3xl text-white font-bold" :{}
        }
      }
      const buttons = {
        // small-btn
        '.small-btn': {
          padding: '0.25rem 0.5rem',
          'border-radius': '1.5em',
          cursor: 'pointer',
          transition: '.5s ease-in-out',
          height: 'fit-content',
          width: 'fit-content',
          whiteSpace: 'nowrap',
          '@apply text-sm': '',
        },

        '.btn': {
          padding: '0.5rem 1rem',
          'border-radius': '1.5em',
          cursor: 'pointer',
          transition: '.5s ease-in-out',
          height: 'fit-content',
          width: 'fit-content',
          whiteSpace: 'nowrap',
        },

        '.btn-primary': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd',
          },
        },
        // .btn-urgent
        '.btn-urgent': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a',
          },
        },
        // .btn-progress make it a blue color
        '.btn-progress': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd',
          },
        },

        // .btn-success
        '.btn-done': {
          backgroundColor: '#38c172',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2f9e66',
          },
        },
        '.btn-transparent-white': {
          backgroundColor: 'transparent',
          color: '#fff/50',
          transition: 'all .5s ease-in-out',
          '&:hover': {
            '@apply text-white bg-app-tertiary': '',
          },
        },
        '.btn-tertiary': {
          "@apply bg-app-tertiary text-white": {},
          transition: 'all .5s ease-in-out',
          '&:hover': {
            '@apply bg-app-primary': '',
          },
        },
      };
      // cards
      const cards = {
        '.card': {
          borderRadius: '.25rem',
          padding: '.5rem 1rem',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
        },

        '.task-card': {
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: '0.5rem',
          padding: '1rem',
          width: '80%',
          margin: '1rem auto',
          backgroundColor: 'var(--app-primary-color-30)',
          color: 'white',
          boxShadow: 'var(--shadow-lg), var(--shadow-black-10)',
          cursor: 'pointer',
          transition: 'all 500ms',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
        '.task-card-header': {
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 1rem',
          alignItems: 'flex-start',
        },
        '.task-card-header .task-name': {
          fontSize: '1.25rem',
          fontWeight: 'bold',
        },
        '.task-card-header .company-name': {
          fontSize: '0.75rem',
          fontWeight: '100',
        },
        '.task-card-header i': {
          fontSize: '1.5rem',
        },
        '.task-card-info': {
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
        },
        '.card-info': {
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem 0',
        },
        '.card-info i': {
          fontSize: '1.5rem',
          marginRight: '0.5rem',
        },
        '.requirements': {
          marginLeft: '0',
          padding: '1rem 0',
        },
        '.task-card-progress': {
          height: '6px',
          display: 'block',
          background: 'white',
          borderRadius: '6px',
          overflow: 'hidden',
        },
        '.task-card-progress-inner': {
          height: '100%',
        },
        '.task-card-footer': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
        },
        '.date': {
          fontSize: '0.75rem',
        },
        '.team-members': {
          display: 'flex',
          alignItems: 'center',
        },
        '.profile-pictures': {
          display: 'flex',
          alignItems: 'center',
        },
        '.profile-picture-container': {
          position: 'relative',
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: '-0.5rem',
        },
        '.profile-picture-container img': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
        '.more-members': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          fontSize: '0.8rem',
          fontWeight: 'bold',
        },
      };

      const images = {
        '.img-fluid': {
          maxWidth: '100%',
          height: 'auto',
        },
        '.img-fit': {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      };

      const writing_mode = {
        '.writing_mode_vertical': {
          writingMode: 'vertical-rl',

          transform: 'rotate(180deg)',
        },
      };

      const flexes = {
        '.auto-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      };
      const text = {
        '.muted': {
          '@apply text-gray-500 text-sm mt-1 mb-2' : '',
        },
      };
      addComponents(
        [buttons, cards, containers],
        ['responsive', 'hover', 'focus']
      );
      addUtilities(
        [images, writing_mode, flexes, text, titles, borders],
        ['responsive', 'hover', 'focus']
      );
    }),
  ],
};
