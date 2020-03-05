const path = require('path');
const fs = require('fs');
const camelCase = require('uppercamelcase');

const { taskRunner, rootDirectory } = require('../helpers');

function createEntryPoint() {
  return taskRunner(() => {
    return new Promise((resolve, reject) => {
      /*
				Since we don't want to have to maintain a separate UMD entry point,
				we need to actually build up that entry point in code located at
				src/react/umd.js
			*/
      const umdFile = path.join(rootDirectory, 'src', 'react', 'umd.js');
      const dir = path.join(rootDirectory, 'src', 'react');

      // Find all public modules in src/react and build up a map from moduleName => importPath
      const moduleMap = {};
      fs.readdirSync(dir)
        .map(file => path.join(dir, file))
        .filter(
          file =>
            fs.statSync(file).isFile() &&
            path.extname(file).match(/.(j|t)s/g) &&
            path.basename(file) !== 'umd.js',
        )
        .forEach(file => {
          const fileName = path.basename(file);
          const moduleName = camelCase(fileName.split('.')[0]);
          moduleMap[moduleName] = `./${fileName}`;
        });
      const allModuleNames = Object.keys(moduleMap);

      // The file needs to include the SASS to create a "latest" version of the CSS
      let output = `require('../sass/xui.scss');
			const exported = {};`;

      // For every module, the default export will end up as XUI{moduleName}
      // on the global XUI object.  All other exports are just copied over.
      allModuleNames.forEach(moduleName => {
        output += `
			const ${moduleName} = require('${moduleMap[moduleName]}')	;
			Object.keys(${moduleName}).forEach(name => {
				if (name === 'default') {
					exported['XUI${moduleName}'] = ${moduleName}.default;
				} else {
					exported[name] = ${moduleName}[name];
				}
			});
			`;
      });
      output += 'module.exports = exported;';

      fs.writeFileSync(umdFile, output);

      if (fs.existsSync(umdFile)) {
        resolve({ stdout: true });
      } else {
        reject({ stderr: '' });
      }
    });
  }, __filename);
}

module.exports = createEntryPoint;
require('make-runnable/custom')({ printOutputFrame: false });
