import React from 'react';
import Classes from 'xui-css-classes';
import cn from 'classnames';

const withProp = (prop, value) => element => ({
	...element,
	props: {
		...element.props,
		[prop]: value
	}
});

const propTypes = {
	children: React.PropTypes.node,
	className: React.PropTypes.string
};

export default function XUIButtonGroup(props) {
	const className = cn(props.className, Classes.BUTTON_GROUP);
	return (
		<div className={className}>
			{props.children.map(withProp('isGrouped', true))}
		</div>
	);
}

XUIButtonGroup.propTypes = propTypes;
