import React from 'react';
import UserAvatar from '../../src/UserAvatar.js';
import '../../src/scss/_user-avatar.scss';

(function() {
	React.render(
		<UserAvatar>Hello World</UserAvatar>, document.getElementById('app')
	);
})();