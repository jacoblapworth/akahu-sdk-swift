import 'babel-core/external-helpers.js';

import React from 'react';
import ReactDOM from 'react-dom';
import XuiIcon from '../../src/XuiIcon.js';

(function() {
	ReactDOM.render(
		<XuiIcon>Hello World</XuiIcon>, document.getElementById('app')
	);
})();