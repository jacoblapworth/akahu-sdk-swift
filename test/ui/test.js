import React from 'react';
import XUIButton from '../../src/XUIButton.js';
import '../../src/scss/_xui-button.scss';

(function() {
	React.render(
		<XUIButton>Hello World</XUIButton>, document.getElementById('app')
	);
})();