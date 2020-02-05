// https://tailwindcss.com/docs/configuration/
// https://tailwindcss.com/docs/theme/
// https://gist.github.com/hacknug/9d8808701c57436a4da815fcfaeb9b2b
// https://www.viget.com/articles/tips-for-your-tailwind-config/

const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  prefix: '_',
  corePlugins: {
    float: false,
    objectFit: false,
    minWidth: false,
    maxWidth: false,
    placeholderColor: false,
    negativeMargin: false,
    order: false,
    resize: false,
    letterSpacing: false,
    userSelect: false,
    backgroundAttachment: false,
    accessibility:false,
  },
  theme: {
    fill: theme => ({
      'primary': theme('colors.primary'),
      'darkengolden': theme('colors.darkengolden'),
      'golden': theme('colors.golden'),
    }),
    screens: {
      sm : {'max': '575px'},
      md : {'max': '767px'},
      lg : {'max': '991px'},
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    fontWeight: {
      thin: 300,
      normal: 400,
      semibold: 600,
      bold: 700,
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
    },
    borderRadius:{
      none : 'none',
      small :'3px',
      md :'10px',
      rounded  :'100px',
      circle : '50%',
    },
    fontSize:{
      xs: '11px',
      sm: '12px',
      text: '14px',
      title: '16px',
      md: '18px',
      lg: '20px',
      xl: '26px',
      xxl: '36px',
    },
    colors: {
      transparent: colors.transparent,
      primary : '#007d8f',
      lightprimary: '#f1f6f6',
      darkenprimary: '#006675',
      darkengolden: '#846700',
      nearwhite : '#f5f5f5',
      warning: '#e03634',
      success: '#99cc00',
      golden: '#ffce55',
      white: '#fff',
     
    },
    // width: {
    //   '100' : '100%',
    //   '90': '90%',
    //   '80': '80%',
    //   '75': '75%',
    //   '70': '70%',
    //   '60': '60%',
    //   '50': '50%',
    //   '49': '49%',
    //   '45': '45%',
    //   '30': '30%',
    //   '20': '20%',
    //   '0': '0',
    //   'auto': 'auto',
    // },
    spacing: {
      auto : 'auto',
      none : '0px',
      xxs : '5px',
      xs : '10px',
      sm : '15px',
      md : '20px',
      lg : '30px',
      xl : '40px',
      xxl : '50px',
      xxxl : '60px',
    },
    extend: { 
    }
  },
  variants: {
    borderColor: [''],
    backgroundColor: [''],
    fontWeight: [''],
    opacity: [''],
    boxShadow: [''],
    textColor: [''],
    textDecoration: [''],
    backgroundColor: ['hover', 'focus'],
  },
  plugins: []
}
