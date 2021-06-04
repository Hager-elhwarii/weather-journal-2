module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*/{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'sky-pattern': "url('static/imgs/bg.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
