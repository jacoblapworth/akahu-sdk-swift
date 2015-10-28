import React from 'react';
import XUISwitch from '../../src/XUISwitch.js';
import '../../src/scss/_xui-switch.scss';

(function() {
	React.render(
		<XUISwitch>Hello World</XUISwitch>, document.getElementById('app')
	);
})();