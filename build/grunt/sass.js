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
      'styleguide/kss-style.css': 'styleguide/kss-style.scss'
    }
  }
};
