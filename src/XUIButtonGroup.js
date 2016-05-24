import React from 'react';
import Classes from 'xui-css-classes';

const withProp = (prop, value) => element => ({
	...element,
	props: {
		...element.props,
		[prop]: value
	}
});

const XUIButtonGroup = ({ children }) => (
	<div className={Classes.BUTTON_GROUP}>
		{children.map(withProp('isGrouped', true))}
	</div>
);

export default XUIButtonGroup;
