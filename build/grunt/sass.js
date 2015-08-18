module.exports = {
  options: {
    sourceMap: true,
    includePaths: [
      './bower_components/'
    ]
  },
  dist: {
    files: {
      'tmp/xui.css': 'src/sass/xui.scss'
    }
  }
};
