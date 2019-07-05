module.exports = {
  map: true,
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
      stage: 0,
    }
  },
};
