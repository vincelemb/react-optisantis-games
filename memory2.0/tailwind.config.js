module.exports = {
  prefix: '_',
  theme: {
    screens: {
      sm : {'min': '576px', 'max': '575px'},
      md : {'min': '768px', 'max': '767px'},
      lg : {'min': '992px', 'max': '991px'},
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
    },
    borderRadius:{
      none : 'none',
      small :'3',
      md :'10',
      rounded  :'100',
    },
    fontSize:{
      xs: '11',
      sm: '12',
      text: '14',
      title: '16',
      md: '18',
      lg: '20',
      xl: '26',
      xxl: '36',
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
      },
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
      }
  },
  variants: {},
  plugins: []
}
