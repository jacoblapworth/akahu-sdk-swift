import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { rowVariants } from './private/constants';

const getClasses = (className, variant) => {
	const suffix = rowVariants[variant] ? `-${rowVariants[variant]}` : '';
	const rowClass = `${ns}-row${suffix}`;
	return cn(className, rowClass);
};

const XUIRow = ({
	qaHook,
	children,
	className,
	variant,
	...spreadProps
}) => (
	<div
		{...spreadProps}
		className={getClasses(className, variant)}
		data-automationid={qaHook}
	>
		{children}
	</div>
);

XUIRow.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/* Type of row to render */
	variant: PropTypes.oneOf(Object.keys(rowVariants)),
};

XUIRow.defaultProps = {
	variant: 'standard',
};

export { XUIRow as default };
