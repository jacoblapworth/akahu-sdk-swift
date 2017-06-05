let div = document.getElementById('test-container');
if (!div) {
	div = document.createElement('div');
	div.id = 'test-container';
	document.body.appendChild(div);
}

export default div;
