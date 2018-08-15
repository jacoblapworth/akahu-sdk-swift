import React from 'react';
import ReactDOM from 'react-dom';
import XUICapsule from '../XUICapsule';

const onClick = () => alert('You clicked the capsule'); // eslint-disable-line no-alert
const baseClass = 'xui-capsule';
const largeHeadingClass = 'xui-heading-large';
const mediumHeadingClass = 'xui-heading';
const smallHeadingClass = 'xui-heading-small';
const containerClasses = 'xui-margin-bottom-small';

const capsules = (
	<section>
		<h1> Capsules </h1>
		<div className={`${containerClasses} ${largeHeadingClass}`}>
			If there is a line of text with the `xui-heading-large` CSS class and a
			<XUICapsule className={`${baseClass} ${largeHeadingClass}`}>capsule</XUICapsule> within it,
			then the capsule will automatically inherit font size, to prevent the line height from changing
		</div>
		<div className={`${containerClasses} ${mediumHeadingClass}`}>
			If there is a line of text with the `xui-heading` CSS class and a
			<XUICapsule className={`${baseClass} ${mediumHeadingClass}`}>capsule</XUICapsule> within it,
			then the capsule will automatically inherit font size, to prevent line height from changing
		</div>
		<div className={`${containerClasses} ${smallHeadingClass}`}>
			If there is a line of text with the `xui-heading-small` CSS class and a
			<XUICapsule className={`${baseClass} ${smallHeadingClass}`}>capsule</XUICapsule> within it,
			then the capsule will automatically inherit font size, to prevent line height from changing
		</div>
		<div className={containerClasses}>
			If there is a line of standard text with a
			<XUICapsule className={`${baseClass}`}>capsule</XUICapsule> within it,
			then the capsule will automatically inherit font size, to prevent line height from changing
		</div>
		<div className={containerClasses}>
			As a <XUICapsule className={`${baseClass}`}>capsule</XUICapsule> is selcted
			(either clicked on or tabbed into), it will turn blue
		</div>
		<div className={containerClasses}>
			As interactive <XUICapsule className={`${baseClass}`} onClick={onClick}>capsule</XUICapsule>,
			such as this one, will have a white background with blue text,
			indicating that it does something. Clicking on this one will pop up an alert
		</div>
		<div className={containerClasses}>
			An invalid <XUICapsule className={`${baseClass}`} isValid={false}>capsule</XUICapsule>, such as
			this one, will have a red background and red text, indicating that something is amiss
		</div>
	</section>
);
ReactDOM.render(
	<div className="xui-page-width-large">
		{capsules}
	</div>,
	document.getElementById('app'),
);
