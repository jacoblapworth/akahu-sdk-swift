import React from 'react';

/**
 * @public
 *
 * Property types for the XUISwitch component
 */
const propTypes = {

	/** @property {function} onChange Fires parent onChange handler */
	onChange : React.PropTypes.func.isRequired,

	/** @property {boolean} [isEnabled=false] Determines whether the switch is enabled or disabled */
	isEnabled : React.PropTypes.bool,

	/** @property {string} [name=name] Name attribute for the input */
	name : React.PropTypes.string,

	/** @property {string} [value=value] Value attribute for the input */
	value: React.PropTypes.string

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

		const props = this.props;

		return (
			<label className="xui-switch">
				<input
					type="checkbox"
					checked={props.isEnabled}
					onChange={props.onChange}
					name={props.name}
					value={props.value}
					className="xui-u-hidden xui-switch--checkbox" />
				<div className="xui-switch--control"></div>
			</label>
		);

	}
}

XUISwitch.propTypes = propTypes;
XUISwitch.defaultProps = defaultProps;
