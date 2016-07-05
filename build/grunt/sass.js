module.exports = {
  options: {
    sourceMap: true,
    includePaths: [
      './bower_components/'
    ]
  },
  dist: {
    files: {
      'dist/xui.css': 'src/sass/xui.scss',
      'docs/kss-style.css': 'kss/styleguide/kss-style.scss'
    }
  }
};
