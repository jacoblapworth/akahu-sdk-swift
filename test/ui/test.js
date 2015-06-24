import React from 'react';
import UserAvatar from '../../src/UserAvatar.js';
import '../../src/scss/_user-avatar.scss';

(function() {
	React.render(
		<UserAvatar className="my-comp"
					firstName="Dave"
					lastName="Atkins"
					imageUrl="logo.png"
					avatarSize={24}
					fontSize={10}/>, document.getElementById('app')
	);
})();