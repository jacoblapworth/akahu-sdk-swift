import React from 'react';
import Component from 'xui-base-component';
import XUIClasses from 'xui-css-classes';

const withProp = (prop, value) => element => ({
	...element,
	props: {
		...element.props,
		[prop]: value
	}
});

export default class XUIButtonGroup extends Component {
	render() {
		return (
			<div className={XUIClasses.BUTTON_GROUP}>{this.props.children.map(withProp('isGrouped', true))}</div>
		);
	}
}
