import React from 'react';
import Component from 'base-component';

export default class XUIButtonGroup extends Component {
	render() {
		return (
			<div className='xui-buttongroup'>{this.props.children}</div>
		);
	}
}