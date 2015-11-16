import React from 'react';
import XUIButton, {XUIButtonGroup, XUIButtonCaret} from '../../index.js';
import './styles/test.scss';

(function() {
	var clickHandler = function() {
		alert('I was clicked'); //eslint-disable-line no-alert
	};

	React.render(<div>
			<div className="testButtonContainer">
				<XUIButton>Default button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton variant='primary'>Primary button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton variant='create'>Create button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton isDisabled={true}>Disabled button</XUIButton>
			</div>
			<div className="testButtonContainer">
			<XUIButton variant='create'>A dropdown button<XUIButtonCaret /></XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButtonGroup>
					<XUIButton isGrouped={true}>Grouped Button One</XUIButton>
					<XUIButton isGrouped={true}>Grouped Button Two</XUIButton>
					<XUIButton isGrouped={true}>Grouped Button Three</XUIButton>
				</XUIButtonGroup>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler}>Click me for an alert</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton size='small'>Small button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton size='full-width'>Full width button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton type='link'>Simple anchor tag with no href</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton
					type='link'
					href='http://go.xero.com'>Simple anchor tag with href</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton
						type='link'
						href='http://go.xero.com'
						target='_blank'>Anchor tag with `_blank` target</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton
					className='fun-times'>Button with non-XUI modifier class</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton
					qaHook='buttonQAHook'>Button with a QA hook class</XUIButton>
			</div>
		</div>, document.getElementById('app')
	);
})();
