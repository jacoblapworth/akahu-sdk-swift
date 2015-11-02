import React from 'react';
import Component from 'reporting-base-component';

export default class XUIButtonGroup extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className='xui-buttongroup'>{this.props.children}</div>
		);
	}
}