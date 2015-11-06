import React from 'react';
import Component from 'xui-base-component';

export default class Loader extends Component {
	render() {
		return (
			<div className={'xui-loader'}>
				<div className={'xui-loader--dot'}></div>
				<div className={'xui-loader--dot'}></div>
				<div className={'xui-loader--dot'}></div>
			</div>
		);
	}
}
