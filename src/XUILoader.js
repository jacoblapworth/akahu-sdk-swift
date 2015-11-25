import React from 'react';
import Component from 'xui-base-component';
import cn from 'classnames';

const propTypes = {
	className: React.PropTypes.string,
	customStyle: React.PropTypes.object
};

export default class XUILoader extends Component {
	render() {
		const classNames = cn('xui-loader', this.props.className);
		return (
			<div className={classNames} style={this.props.customStyle}>
				<div className='xui-loader--dot'></div>
				<div className='xui-loader--dot'></div>
				<div className='xui-loader--dot'></div>
			</div>
		);
	}
}
XUILoader.propTypes = propTypes;
