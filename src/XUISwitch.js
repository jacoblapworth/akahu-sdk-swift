import React from 'react';
import XUIBaseComponent from 'xui-base-component';
import CSSClasses from 'xui-css-classes';
import cn from 'classnames';

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

export default class XUISwitch extends XUIBaseComponent {

	render() {
	  const props = this.props;

	  return (
			<label className={CSSClasses.Switch.BASE}>
				<input
					type="checkbox"
					checked={props.isEnabled}
					onChange={props.onChange}
					name={props.name}
					value={props.value}
					className={cn(CSSClasses.Utility.Hidden.VISUALLY, CSSClasses.Switch.CHECKBOX)} />
				<div className={CSSClasses.Switch.CONTROL}></div>
			</label>
		);
	}

}

XUISwitch.propTypes = propTypes;
XUISwitch.defaultProps = defaultProps;
