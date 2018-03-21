import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {ns} from '../helpers/xuiClassNamespace';

import { rowVariants } from './private/constants';

const getClasses = (className, variant) => {
	const suffix = rowVariants[variant] ? `-${rowVariants[variant]}` : '';
	const rowClass = `${ns}-row${suffix}`;
	return cn(className, rowClass);
};

const XUIRow = ({children, className, variant, ...otherProps}) =>
	<div
		className={getClasses(className, variant)}
		{...otherProps}
	>
		{children}
	</div>;

XUIRow.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/* Type of row to render */
	variant: PropTypes.oneOf(Object.keys(rowVariants)),
};

XUIRow.defaultProps = {
	variant: 'standard'
};

export { XUIRow as default };
