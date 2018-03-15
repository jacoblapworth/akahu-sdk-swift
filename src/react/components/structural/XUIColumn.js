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

const getAllClasses = ({className, gridColumns, gridColumnsMedium, gridColumnsWide}) => {
	return cn(
		className,
		getClass(gridColumns),
		getClass(gridColumnsMedium, "-medium"),
		getClass(gridColumnsWide, "-wide"));
};

const XUIColumn = ({children, className, gridColumns, gridColumnsMedium, gridColumnsWide, ...otherProps}) =>
	<div
		className={getAllClasses({className, gridColumns, gridColumnsMedium, gridColumnsWide})}
		{...otherProps}
	>
		{children}
	</div>;

XUIColumn.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * Grid columns for the column to inhabit. Can be 1-12 or any of [full, half, third, quarter]
	 */
	gridColumns: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	/**
	 * Grid columns at viewport 940 - 1160px wide. Can be 1-12 or any of [full, half, third, quarter]
	 */
	gridColumnsMedium: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
	/**
	 * Grid columns at viewport > 1160px wide. Can be 1-12 or any of [full, half, third, quarter]
	 */
	gridColumnsWide: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
};

XUIColumn.defaultProps = {
	gridColumns: 12
};

export { XUIColumn as default };
