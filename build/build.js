var iconBlob = require('./bundle.js');
var fs = require('fs');
var docsIcons = require('./docs.bundle.js');

if (!fs.existsSync('dist')){
	fs.mkdirSync('dist');
}

fs.writeFileSync('./dist/xuiIconBlob.js', 
	`export default function() {if (!document.getElementById('xui-icon-blob-auto')) {var div = document.createElement('div'); div.id = 'xui-icon-blob-auto'; div.innerHTML='${iconBlob}'; document.body.appendChild(div);}}`);

fs.writeFileSync('./dist/xuiIconBlobES5.js', 
	`if (!document.getElementById('xui-icon-blob-auto')) {var div = document.createElement('div'); div.id = 'xui-icon-blob-auto'; div.innerHTML='${iconBlob}'; document.body.appendChild(div);}`);

fs.writeFileSync('./dist/xuiIconsDocs.js',
	`var iconDisplayDiv = document.getElementById('xuiIconShowcase');if (iconDisplayDiv){var div = document.createElement('div'); div.innerHTML='${docsIcons()}';iconDisplayDiv.appendChild(div);}`);
