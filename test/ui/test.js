import React from 'react';
import UserAvatar from '../../src/Avatar.js';
import './test.scss';

(function() {
	React.render(
		<div>
			<UserAvatar className="my-comp"
				value="Dave"
				size="small"
				colour="red"/>
			<UserAvatar className="my-comp"
				value="Dave"
				size="small"
				identifier="lalala"/>
			<UserAvatar className="my-comp"
				value="Dave"
				size="small"
				imageUrl="logo.png"/>
		</div>, 
		document.getElementById('app')
	);
})();