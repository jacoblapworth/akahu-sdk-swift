import React from 'react';

/**
 * @public
 *
 * Property types for the XUISwitch component
 */
const propTypes = {

	/** @property {function} onChange Fires parent onChange handler */
	handleChange : React.PropTypes.func.isRequired,

	/** @property {boolean} [isEnabled=false] Determines whether the switch is enabled or disabled */
	isEnabled : React.PropTypes.bool

};

/**
 * @public
 *
 * Defaults for the enabled state. Defaults to disabled
 */
const defaultProps = {

	isEnabled : false

};

export default class XUISwitch extends React.Component {
	render() {

		return (
			<label className="xui-switch">
				<input type="checkbox" className="xui-u-hidden xui-switch--checkbox" checked={this.props.isEnabled} onChange={this.props.handleChange} />
				<div className="xui-switch--control"></div>
			</label>
		);

	}
}

XUISwitch.propTypes = propTypes;
XUISwitch.defaultProps = defaultProps;
