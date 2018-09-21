import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { rowVariants } from './private/constants';

import '../../../sass/99-utils/_grid.scss'; // TODO: make grid rows components rather than utils in the SCSS

const getClasses = (className, variant) => {
	const suffix = rowVariants[variant] ? `-${rowVariants[variant]}` : '';
	const rowClass = `${ns}-row${suffix}`;
	return cn(className, rowClass);
};

const XUIRow = ({
	children,
	className,
	variant,
	...spreadProps
}) => (
	<div
		{...spreadProps}
		className={getClasses(className, variant)}
	>
		{children}
	</div>
);

XUIRow.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/* Type of row to render */
	variant: PropTypes.oneOf(Object.keys(rowVariants)),
};

XUIRow.defaultProps = {
	variant: 'standard',
};

export { XUIRow as default };
