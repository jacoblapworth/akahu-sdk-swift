import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { columnShortNames } from './private/constants';

const getClass = (width, suffix) => {
	let colClass = "";
	if (width) {
		colClass = `xui-column-${columnShortNames[width] || width}-of-12${suffix || ""}`;
	}
	return colClass;
};

const getAllClasses = ({className, columnWidth, columnWidthMedium, columnWidthWide}) => {
	return cn(
		className,
		getClass(columnWidth),
		getClass(columnWidthMedium, "-medium"),
		getClass(columnWidthWide, "-wide"));
};

const XUIColumn = ({children, className, columnWidth, columnWidthMedium, columnWidthWide, ...otherProps}) =>
	<div
		className={getAllClasses({className, columnWidth, columnWidthMedium, columnWidthWide})}
		{...otherProps}
	>
		{children}
	</div>;

XUIColumn.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * Column width. Can be 1-12 or any of [full, half, third, quarter]
	 */
	columnWidth: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	/**
	 * Column width at viewport 940 - 1160px wide. Can be 1-12 or any of [full, half, third, quarter]
	 */
	columnWidthMedium: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
	/**
	 * Column width at viewport > 1160px wide. Can be 1-12 or any of [full, half, third, quarter]
	 */
	columnWidthWide: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
};

XUIColumn.defaultProps = {
	columnWidth: 12
};

export { XUIColumn as default };
