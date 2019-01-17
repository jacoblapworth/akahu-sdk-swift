import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaDetail from './XUIGridAreaDetail';
import XUIGridAreaSummary from './XUIGridAreaSummary';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass, { retainValues } from './helpers';

export default class XUICompositionDetailSummaryHeader extends PureComponent {
	render() {
		const {
			className,
			header,
			summary,
			detail,
			isInfinite,
			retainWidth,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-detailsummaryheader`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			retainWidth &&
				retainValues[retainWidth] &&
				`${baseCompositionClass}-detailsummaryheader-retain-${retainWidth}`,
			className,
		);

		return (
			<div className={compositionClasses}>
				<XUIGridAreaHeader>
					{header}
				</XUIGridAreaHeader>
				<XUIGridAreaDetail>
					{detail}
				</XUIGridAreaDetail>
				<XUIGridAreaSummary>
					{summary}
				</XUIGridAreaSummary>
			</div>
		);
	}
}

XUICompositionDetailSummaryHeader.propTypes = {
	className: PropTypes.string,

	/**
	 * Header content or component
	 */
	header: PropTypes.element.isRequired,
	/**
	 * Summary content or component
	 */
	summary: PropTypes.element.isRequired,
	/**
	 * Main content
	 */
	detail: PropTypes.element.isRequired,
	/**
	 * Determines whether the main content takes full width of page
	 */
	isInfinite: PropTypes.bool,
	/**
	 * Lets you set a retain width value so that the layout doesn't change when the
	 * viewport is equal to or larger than the width specified
	 */
	retainWidth: PropTypes.oneOf(['', 'small']),

};

