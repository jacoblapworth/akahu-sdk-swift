import 'babel-core/external-helpers.js';

import React from 'react';
import ReactDOM from 'react-dom';
import XUIButton, {XUIButtonGroup, XUIButtonCaret} from '../../index.js';

(function() {
	const clickHandler = function() {
		alert('I was clicked'); //eslint-disable-line no-alert
	};

	const examples = (
		<div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler}>Default button</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler} variant="primary">Primary button</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler} variant="create">Create button</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler} variant="negative">Negative button</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler} isDisabled={true}>Disabled button</XUIButton>
				</div>
				<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="create">A dropdown button<XUIButtonCaret /></XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButtonGroup>
						<XUIButton onClick={clickHandler} isGrouped={true}>Grouped Button One</XUIButton>
						<XUIButton onClick={clickHandler} isGrouped={true}>Grouped Button Two</XUIButton>
						<XUIButton onClick={clickHandler} isGrouped={true}>Grouped Button Three</XUIButton>
					</XUIButtonGroup>
				</div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler}>Click me for an alert</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler} size="small">Small button</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler} size="full-width">Full width button</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler} type="link">Simple anchor tag with no href</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton onClick={clickHandler} type="link" variant="negative">Simple negative anchor tag with no href</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton
						type="link"
						href="http://go.xero.com">Simple anchor tag with href</XUIButton>
				</div>
			<div className="testButtonContainer">
				<XUIButton
					type="link"
					isDisabled={true}
					href="http://go.xero.com">Disabled link button</XUIButton>
			</div>
				<div className="testButtonContainer">
					<XUIButton
							type="link"
							href="http://go.xero.com"
							target="_blank">Anchor tag with `_blank` target</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton
						onClick={clickHandler}
						className="fun-times">Button with non-XUI modifier class</XUIButton>
				</div>
				<div className="testButtonContainer">
					<XUIButton
						onClick={clickHandler}
						qaHook="buttonQAHook">Button with a QA hook class</XUIButton>
				</div>
			</div>
	);

	ReactDOM.render(examples, document.getElementById('app'));
})();
