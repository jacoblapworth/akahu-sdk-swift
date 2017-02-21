const fs = require('fs');
const {generateReadme} = require('readme-builder');

generateReadme('UXE', 'xui-button', [
	'./docs/overview.md',
	'./docs/installation.md',
	'./docs/example.md',
	'./docs/props.md',
	'./docs/testing.md',
	'./docs/migration.md'
]).then(() => {
	console.log('done');
}).catch(err => {
	console.error(err);
});
