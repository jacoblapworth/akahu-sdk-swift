import 'babel-core/external-helpers.js';
import ReactDOM from 'react-dom';
import XUIAvatar from '../../src/XUIAvatar.js';

ReactDOM.render(
	<div>
		<XUIAvatar
			className="my-custom-class"
			value="Huey"
			size="small"
			identifier="quack"
		/>

		<XUIAvatar
			value="Dewey"
			size="medium"
			identifier="decimal"
		/>

		<XUIAvatar
			value="Louie"
			size="large"
			identifier="quack-a-rooney"
		/>

		<XUIAvatar
			value="💩"
			size="medium"
		/>

		<XUIAvatar
			value="Gyro"
			size="small"
			imageUrl="logo.png"
		/>

	</div>,
	document.getElementById('app')
);
