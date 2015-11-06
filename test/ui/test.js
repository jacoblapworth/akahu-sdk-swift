import React from 'react';
import XUILoader from '../../src/Loader.js';
import '../../src/scss/_loader.scss';

(function() {
	React.render(
		<XUILoader/>, document.getElementById('app')
	);
})();
