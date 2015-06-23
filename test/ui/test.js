import React from 'react';
import UserAvatar from '../../src/UserAvatar.js';
import '../../src/scss/_user-avatar.scss';

(function() {
	React.render(
		<UserAvatar firstName="Dave"
					lastName="Atkins"
					//imageUrl="https://profiles.livestage4.test.xero.com/image/23db345c-daee-49d7-acb2-3f1cf74a72aa_70x70.jpg"
					avatarSize={24}
					fontSize={10}/>, document.getElementById('app')
	);
})();