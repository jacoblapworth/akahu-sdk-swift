import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { columnShortNames } from './private/constants';

export default class XUIColumn extends PureComponent {
	render() {
		const {
			columnWidth,
			columnWidthMedium,
			columnWidthWide,
			className,
			children,
			...otherProps
		} = this.props;
		const columnClass = `xui-column-${columnShortNames[columnWidth] || columnWidth}-of-12`;
		const columnClassMed = columnWidthMedium ? `xui-column-${columnShortNames[columnWidthMedium] || columnWidthMedium}-of-12-medium` : '';
		const columnClassWide = columnWidthWide ? `xui-column-${columnShortNames[columnWidthWide] || columnWidthWide}-of-12-wide` : '';
		const classes = cn(className, columnClass, columnClassMed, columnClassWide);

		return (
			<div className={classes} {...otherProps}>
				{children}
			</div>
		)
	}
}

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
