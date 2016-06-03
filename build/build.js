var iconBlob = require('./bundle.js');
var fs = require('fs');

if (!fs.existsSync('dist')){
	fs.mkdirSync('dist');
}

fs.writeFileSync('./dist/xuiIconBlob.js', 
	`export default function() {if (!document.getElementById('xui-icon-blob-auto')) {document.body.innerHTML += '<div id="xui-icon-blob-auto">${iconBlob}</div>';}}`);

fs.writeFileSync('./dist/xuiIconBlobES5.js', 
	`if (!document.getElementById('xui-icon-blob-auto')) {document.body.innerHTML += '<div id="xui-icon-blob-auto">${iconBlob}</div>';}`);
