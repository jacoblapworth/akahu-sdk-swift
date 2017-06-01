const fs = require('fs');
const {generateReadme} = require('readme-builder');

generateReadme('UXE', 'xui-toggle', [
	'./docs/overview.md',
	'./docs/installation.md',
	'./docs/example.md',
	'./docs/props.md',
	'./docs/testing.md',
]).then(() => {
	console.log('done');
}).catch(err => {
	console.error(err);
});
