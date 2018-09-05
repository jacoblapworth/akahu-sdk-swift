const testContainer = document.getElementById('test-container');
const div = testContainer || document.createElement('div');
if (!testContainer) {
	div.id = 'test-container';
	document.body.appendChild(div);
}

export default div;
