import React from 'react';
import Component from 'xui-base-component';
import XUIClasses from 'xui-css-classes';

export default class XUIButtonGroup extends Component {
	render() {
		return (
			<div className={XUIClasses.BUTTON_GROUP}>{this.props.children}</div>
		);
	}
}
