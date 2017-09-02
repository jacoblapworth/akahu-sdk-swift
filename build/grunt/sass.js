module.exports = {
  options: {
    sourceMap: true
  },
  dist: {
    files: {
      'dist/xui.css': 'src/sass/xui.scss',
      'docs/style.css': 'kss/scss/style.scss'
    }
  }
};
