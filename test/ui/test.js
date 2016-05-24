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
				&nbsp;
				<XUIButton onClick={clickHandler} isDisabled>Default button (disabled)</XUIButton>
				&nbsp; Same as standard button
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="primary">Primary button</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="primary" isDisabled>Primary button (disabled)</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="create">Create button</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="create" isDisabled>Create button (disabled)</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="link">Link button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="negative">Negative button</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="negative" isDisabled>Negative button (disabled)</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="standard">Standard Button</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="standard" isDisabled>Standard Button (disabled)</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="create">A dropdown button<XUIButtonCaret /></XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButtonGroup>
					{['One', 'Two', 'Three'].map((x, key) => (
						<XUIButton onClick={clickHandler} variant="standard" key={key}>Grouped Button {x}</XUIButton>
					))}
				</XUIButtonGroup>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="standard">Click me for an alert</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="standard" size="small">Small button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="standard" size="full-width">Full width button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="standard" size="full-width-mobile">Full width button (on mobile)</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="standard" type="link">Simple anchor tag with no href</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} type="link" variant="negative">Simple negative anchor tag with no href</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton
					variant="link"
					type="link"
					href="http://go.xero.com">Simple anchor tag with href</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton
					variant="link"
					type="link"
					isDisabled
					href="http://go.xero.com">Disabled link button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton
					variant="link"
					type="link"
					href="http://go.xero.com"
					target="_blank">Anchor tag with `_blank` target</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton
					variant="standard"
					onClick={clickHandler}
					className="fun-times">Button with modifier class</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton
					variant="standard"
					onClick={clickHandler}
					qaHook="buttonQAHook">Button with a QA hook class</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="unstyled">Unstyled button</XUIButton>
				&nbsp;
				<XUIButton onClick={clickHandler} variant="unstyled" isDisabled>Unstyled button (disabled)</XUIButton>
			</div>
		</div>
	);

	ReactDOM.render(examples, document.getElementById('app'));
})();
