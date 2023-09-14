// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('./src/data/colors');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      width: {
        '49/100': '49%',
        '9/10': '90%',
      },
      height: {
        '49/100': '49%',
        '9/10': '90%',
        '7/10': '70%',
      },
      fontSize: {
        '2xs': ['0.8125rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        '1/4': '25%',
        '3/10': '30%',
        '1/3': '33.33333333%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '7/10': '70%',
        '3/4': '75%',
        vs: '12em',
        screen: '100vw',
      },
      minWidth: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
      },
      minHeight: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
      },
      boxShadow: {
        '3xl': '0px 70px 100px rgba(41, 76, 110, 0.08)',
      },
      left: {
        unset: 'unset',
      },
    },
  },
  variants: {
    extend: {
      padding: ['first', 'last'],
      width: ['first'],
    },
  },

  plugins: [],
};
