var bundle = require('./bundle.js');
var fs = require('fs');

if (!fs.existsSync('dist')){
	fs.mkdirSync('dist');
}

fs.writeFileSync('./dist/xuiIconBlob.js', `export default function (domNode){ domNode.innerHTML = '${bundle()}' }`);
