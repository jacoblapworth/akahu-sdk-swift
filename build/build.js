var iconBlob = require('./bundle.js')['default'];
var docsIcons = require('./docs.bundle.js');
var icons = require('../dist/iconData'); // CJS build of src/iconData.js (part of npm rollup task)
var fs = require('fs');
var path = require('path');

mkdir('dist');
mkdir('icons');

Object.keys(icons).forEach(function(key) {
	writeFile(path.join('icons', key + '.js'), `export default '${icons[key]}';`);
});

writeFile(path.join('dist', 'xuiIconBlob.js'),
	`export default function() {if (!document.getElementById('xui-icon-blob-auto')) {var div = document.createElement('div'); div.id = 'xui-icon-blob-auto'; div.innerHTML='${iconBlob}'; document.body.appendChild(div);}}`);

writeFile(path.join('dist', 'xuiIconBlobES5.js'),
	`if (!document.getElementById('xui-icon-blob-auto')) {var div = document.createElement('div'); div.id = 'xui-icon-blob-auto'; div.innerHTML='${iconBlob}'; document.body.appendChild(div);}`);

writeFile(path.join('dist', 'xuiIconsDocs.js'),
	`var iconDisplayDiv = document.getElementById('xuiIconShowcase');if (iconDisplayDiv){var div = document.createElement('div'); div.innerHTML='${docsIcons()}';iconDisplayDiv.appendChild(div);}`);


function writeFile(fileName, content) {
	console.log('Writing ' + fileName);
	fs.writeFile(fileName, content, function(err) {
		if(err) {
			console.error(err);
			process.exit(1);
		}
	})
}

function mkdir(dirPath) {
	try {
		fs.mkdirSync(dirPath);
	} catch(e) {
		if(e.code !== 'EEXIST') {
			console.error(e);
			process.exit(1);
		}
	}
}
