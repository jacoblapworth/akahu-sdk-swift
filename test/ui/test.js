import React from 'react';
import XUILoader from '../../src/XUILoader.js';

(function() {
	const optionalStyle = {backgroundColor: '#f1f4f5'};
	React.render(

		<XUILoader className='custom-class' customStyle={optionalStyle} />, document.getElementById('app')
	);
})();
