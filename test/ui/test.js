import React from 'react';
import ReactDOM from 'react-dom';
import XUILoader from '../../src/XUILoader.js';

(function() {
	ReactDOM.render(
		<XUILoader className='custom-class' label="Something is loading, please wait" />, document.getElementById('app')
	);
})();
