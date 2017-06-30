import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

/**
 * Presentational (aka dumb) component that outputs the container necessary to implement
 * the grouped checkboxes pattern.
 *
 * @export
 * @param {Object} [props]
 * @returns
 */
export default function XUICheckboxGroup({ children, className, qaHook }) {
	const classes = cn(className, 'xui-styledcheckbox-group');

	return (
		<div className={classes} data-automationid={qaHook}>
			{children}
		</div>
	);
}


XUICheckboxGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string
};
