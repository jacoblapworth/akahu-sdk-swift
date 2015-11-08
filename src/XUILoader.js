import React from 'react';
import Component from 'xui-base-component';

const propTypes = {
	className: React.PropTypes.string,
	customStyle: React.PropTypes.string
};

export default class XUILoader extends Component {
	render() {
		return (
			<div className={'xui-loader ' + this.props.className} style={this.props.customStyle}>
				<div className={'xui-loader--dot'}></div>
				<div className={'xui-loader--dot'}></div>
				<div className={'xui-loader--dot'}></div>
			</div>
		);
	}
}
XUILoader.propTypes = propTypes;
