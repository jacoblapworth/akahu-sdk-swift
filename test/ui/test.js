import React from 'react';
import ReactDOM from 'react-dom';
import XUIButton, {XUIButtonGroup, XUIButtonCaret} from '../../index.js';

(function() {
	const clickHandler = function() {
		alert('I was clicked'); //eslint-disable-line no-alert
	};

	const secondaryClickHandler = function() {
		alert('I was clicked too'); //eslint-disable-line no-alert
	};
	let firstButton;

	const examples = (
		<div>
			<div className="testButtonContainer">
				<XUIButton ref={c => firstButton = c} onClick={clickHandler}>Default button</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} isDisabled>Default button (disabled)</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} isLoading>Default button (loading)</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} isLoading isDisabled>Default button (loading and disabled)</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="primary">Primary button</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="primary" isDisabled>Primary button (disabled)</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="primary" isLoading>Primary button (loading)</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="primary" isLoading isDisabled>Primary button (loading and disabled)</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="create">Create button</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="create" isDisabled>Create button (disabled)</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="create" isLoading>Create button (loading)</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="create" isLoading isDisabled>Create button (loading and disabled)</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="link">Link button</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="negative">Negative button</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="negative" isDisabled>Negative button (disabled)</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="negative" isLoading>Negative button (loading)</XUIButton>
				{" "}
				<XUIButton onClick={clickHandler} variant="negative" isLoading isDisabled>Negative button (loading and disabled)</XUIButton>
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
				<XUIButton
					variant="link"
					type="link"
					isLoading={true}
					onClick={clickHandler}
					qaHook="buttonQAHook">Loading link</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} variant="unstyled">Unstyled button</XUIButton>
				&nbsp;
				<XUIButton onClick={clickHandler} variant="unstyled" isDisabled>Unstyled button (disabled)</XUIButton>
			</div>
			<div className="testButtonContainer">
				<XUIButton onClick={clickHandler} onSecondaryClick={secondaryClickHandler} split={true} variant="primary">Split button</XUIButton>
			</div>
			<XUIButton onClick={() => firstButton.focus()}>Focus first button</XUIButton>
		</div>
	);

	ReactDOM.render(examples, document.getElementById('app'));
})();
