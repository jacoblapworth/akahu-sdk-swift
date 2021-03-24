const md5File = require('md5-file');

function md5FileHash(filePath) {
  try {
    return md5File.sync(filePath);
  } catch (_) {
    return null;
  }
}

module.exports = md5FileHash;
