import React from 'react';
import ReactDOM from 'react-dom';
import XUILoader from '../../src/XUILoader.js';

(function() {
	ReactDOM.render(
		<div>
			<XUILoader qaHook="my-id" label="Something is loading, please wait" />
			<XUILoader size="small" label="Something is loading, please wait" />
			<XUILoader size="large" label="Something is loading, please wait" />
			<XUILoader defaultLayout={false} size="large" label="Something is loading, please wait" />
		</div>, document.getElementById('app')
	);
})();
