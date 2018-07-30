import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {baseClass} from "./constants";
import {ns} from "../helpers/xuiClassNamespace";

/**
 * Presentational (aka dumb) component that outputs the container necessary to implement
 * the grouped checkboxes pattern.
 *
 * @export
 * @param {Object} [props]
 * @returns
 */
export default function XUICheckboxGroup({ children, className, qaHook, groupLabel, isLabelHidden }) {
	const classes = cn(className, `${baseClass}-group`);
	const labelElement = !isLabelHidden && groupLabel && (
		<div className={`${ns}-text-label ${ns}-fieldlabel-layout`}>
			{groupLabel}
		</div>
	);
	return (
		<Fragment>
			{labelElement}
			<div
				className={classes}
				data-automationid={qaHook}
				aria-label={isLabelHidden && groupLabel}
			>
				{children}
			</div>
		</Fragment>
	);
}


XUICheckboxGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** Label the checkbox group for accessibility. Highly recommended */
	groupLabel: PropTypes.string,
	/** Whether the label should be visible or hidden. Defaults to hidden, for backwards compatibility */
	isLabelHidden: PropTypes.bool
};

XUICheckboxGroup.defaultProps = {
	isLabelHidden: true
};
