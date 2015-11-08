import React from 'react';
import XUILoader from '../../src/XUILoader.js';
import '../../src/scss/_loader.scss';

(function() {
	const optionalStyle = {backgroundColor: '#f1f4f5'};
	React.render(

		<XUILoader className='custom-class' customStyle={optionalStyle} />, document.getElementById('app')
	);
})();
