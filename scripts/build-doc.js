const fs = require('fs');
const {generateReadme} = require('readme-builder');

generateReadme('UXE', 'xui-icon', [
	'./docs/overview.md',
	'./docs/installation.md',
	'./docs/react-use.md',
	'./docs/no-react-use.md',
	'./docs/individual-use.md',
	'./docs/props.md',
	'./docs/testing.md',
]).then(() => {
	console.log('done');
}).catch(err => {
	console.error(err);
});
