import React from 'react';
import ReactDOM from 'react-dom';
import XUIAvatar, { XUIAvatarGroup } from '../../index.js';

ReactDOM.render(
	<div>
		<XUIAvatar
			className="my-custom-class"
			value="Huey Duck"
			size="small"
			identifier="quack"
		/>

		<br />

		<XUIAvatar
			value="Dewey Duck"
			size="medium"
			identifier="decimal"
		/>

		<br />

		<XUIAvatar
			value="Louie Duck"
			size="large"
			identifier="quack-a-rooney"
		/>

		<br />

		<XUIAvatar
			value="Fat Louie"
			size="xlarge"
			identifier="quack-a-thing"
		/>

		<br />

		<XUIAvatar
			value="Madrigal Elektromotoren GmBH"
			variant="business"
			size="small"
			identifier="123"
		/>

		<br />

		<XUIAvatar
			value="A1A Car Wash"
			variant="business"
			size="medium"
			identifier="456"
		/>

		<br />

		<XUIAvatar
			value="Hornblower Enterprises"
			variant="business"
			size="large"
			identifier="789"
		/>

		<br />

		<XUIAvatar
			value="Vamonos Pest Control"
			variant="business"
			size="xlarge"
			identifier="000"
		/>

		<br />

		<XUIAvatar
			value="💩"
			size="medium"
		/>

		<br />

		<XUIAvatar
			value="Gyro"
			size="small"
			imageUrl="logo.png"
		/>

		<br />

		<XUIAvatarGroup size="small" maxAvatars={3}>
			<XUIAvatar value="abcdefg" />
			<XUIAvatar value="1234" imageUrl="https://example.com/non-existent-url.png" />
			<XUIAvatar value="asdf" imageUrl="logo.png" />
		</XUIAvatarGroup>

		<XUIAvatarGroup maxAvatars={2}>
			<XUIAvatar value="abcdefg" />
			<XUIAvatar value="1234" imageUrl="https://example.com/non-existent-url.png" />
			<XUIAvatar value="asdf" imageUrl="logo.png" />
		</XUIAvatarGroup>

		<XUIAvatarGroup size="large" maxAvatars={1}>
			<XUIAvatar value="abcdefg" />
			<XUIAvatar value="1234" imageUrl="https://example.com/non-existent-url.png" />
			<XUIAvatar value="asdf" imageUrl="logo.png" />
		</XUIAvatarGroup>

	</div>,
	document.getElementById('app')
);
