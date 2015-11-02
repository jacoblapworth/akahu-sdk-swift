import React from 'react';

export default class XUIButtonGroup extends React.Component {
	render() {
		return (
			<div className='xui-buttongroup'>{this.props.children}</div>
		);
	}
}