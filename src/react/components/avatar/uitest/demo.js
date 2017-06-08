import React from 'react';
import ReactDOM from 'react-dom';
import upperCamelCase from 'uppercamelcase';
import XUIAvatar from '../XUIAvatar';
import XUIAvatarGroup from '../XUIAvatarGroup';
import { sizeClassNames, variantClassNames } from '../constants.js';

const avatarKeys = Object.keys(sizeClassNames);
const avatarVariants = Object.keys(variantClassNames);

const sizes = (
	<section>
		<h3>All Sizes</h3>
		{avatarKeys.map(size => (
			<div key={size}>
				<XUIAvatar key={size} size={size} value={upperCamelCase(size)} identifier={size} />
				{upperCamelCase(size)}
			</div>
		))}
	</section>
);

const variants = (
	<section>
		<h3>All Variants</h3>
		{avatarVariants.map(variant => (
			<div key={variant}>
				<XUIAvatar key={variant} variant={variant} value={upperCamelCase(variant)} identifier={variant} />
				{upperCamelCase(variant)}
			</div>
		))}
	</section>
);

const withImage = (
	<section>
		<h3>Avatar With Image</h3>
		<XUIAvatar value="asdf" imageUrl="logo.png" />
	</section>
);

const group = (
	<section>
		<h3>Avatar Group</h3>
		<XUIAvatarGroup maxAvatars={4}>
			<XUIAvatar key="test1" size="small" value="Joe the Plumber" identifier="12345" />
			<XUIAvatar key="test2" size="small" value="Fred the Plumber" identifier="12345" />
			<XUIAvatar key="test3" size="small" value="Ted the Plumber" identifier="12345" />
			<XUIAvatar key="test4" size="small" value="Bozo the Plumber" identifier="12345" />
		</XUIAvatarGroup>

		<h3>Avatar Groups With Low maxAvatars</h3>
		<XUIAvatarGroup size="small" maxAvatars={3}>
			<XUIAvatar value="abcdefg" />
			<XUIAvatar value="1234" imageUrl="https://example.com/non-existent-url.png" />
			<XUIAvatar value="asdf" imageUrl="logo.png" />
		</XUIAvatarGroup>
		<br />
		<XUIAvatarGroup maxAvatars={2}>
			<XUIAvatar value="abcdefg" />
			<XUIAvatar value="1234" imageUrl="https://example.com/non-existent-url.png" />
			<XUIAvatar value="asdf" imageUrl="logo.png" />
		</XUIAvatarGroup>
		<br />
		<XUIAvatarGroup size="large" maxAvatars={1}>
			<XUIAvatar value="abcdefg" />
			<XUIAvatar value="1234" imageUrl="https://example.com/non-existent-url.png" />
			<XUIAvatar value="asdf" imageUrl="logo.png" />
		</XUIAvatarGroup>
	</section>
);

ReactDOM.render(
	<div>
		{sizes}
		{variants}
		{withImage}
		{group}
	</div>,
	document.getElementById('app')
);
