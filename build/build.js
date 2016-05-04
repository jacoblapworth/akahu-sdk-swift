var iconBlob = require('./bundle.js');
var fs = require('fs');

if (!fs.existsSync('dist')){
	fs.mkdirSync('dist');
}

fs.writeFileSync('./dist/xuiIconBlob.js', `export default function (domNode){ domNode.innerHTML = '${iconBlob}' }`);

fs.writeFileSync('./dist/xuiIconBlobES5.js', `function xuiIconBlobES5 (domNode){ domNode.innerHTML = '${iconBlob}' }`);
