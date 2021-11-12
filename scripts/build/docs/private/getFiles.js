const fs = require('fs');
const path = require('path');

async function getFiles(directory) {
  const files = fs.readdirSync(directory);

  const fileList = await Promise.all(
    files.map(async fileName => {
      const filePath = path.resolve(directory, fileName);
      return fs.statSync(filePath).isDirectory() ? getFiles(filePath) : filePath;
    }),
  );

  return fileList.reduce((accumulator, file) => accumulator.concat(file), []);
}

module.exports = getFiles;
