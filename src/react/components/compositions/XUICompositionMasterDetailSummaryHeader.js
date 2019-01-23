import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaDetail from './XUIGridAreaDetail';
import XUIGridAreaSummary from './XUIGridAreaSummary';
import XUIGridAreaMaster from './XUIGridAreaMaster';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass, { retainValues, buildGlobalCompositionClasses } from './helpers';

export default class XUICompositionMasterDetailSummaryHeader extends PureComponent {
	render() {
		const {
			className,
			header,
			master,
			detail,
			summary,
			retainWidth,
			...spreadProps
		} = this.props;

		const compositionClasses = cn(
			buildGlobalCompositionClasses(spreadProps),
			`${baseCompositionClass}-masterdetailsummaryheader`,
			retainWidth &&
				retainValues[retainWidth] &&
				`${baseCompositionClass}-masterdetailsummaryheader-retain-${retainWidth}`,
			className,
		);

		return (
			<div className={compositionClasses}>
				<XUIGridAreaHeader>
					{header}
				</XUIGridAreaHeader>
				<XUIGridAreaMaster>
					{master}
				</XUIGridAreaMaster>
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

XUICompositionMasterDetailSummaryHeader.propTypes = {
	className: PropTypes.string,

	/**
	 * Header content or component
	 */
	header: PropTypes.element.isRequired,
	/**
	 * Nav content or controls for detail content
	 */
	master: PropTypes.element.isRequired,
	/**
	 * Main content
	 */
	detail: PropTypes.element.isRequired,
	/**
	 * Summary content or component
	 */
	summary: PropTypes.element.isRequired,
	/**
	 * Determines whether the main content takes full width of page. Defaults to false.
	 */
	isInfinite: PropTypes.bool,
	/**
	 * Lets you set a retain width value so that the layout doesn't change when the
	 * viewport is equal to or larger than the width specified
	 */
	retainWidth: PropTypes.oneOf(['', 'medium', 'small']),
	/**
	 * Whether to apply a pre-set grid-gap between all grid areas. Defaults to true.
	 */
	hasGridGap: PropTypes.bool,
	/**
	 * Whether to apply pre-set spacing to the outside of the composition grid. Defaults to true.
	 */
	hasAutoSpaceAround: PropTypes.bool,
	/**
	 * Whether to apply pre-set widths to columsn of the composition grid. Defaults to true.
	 */
	hasAutoColumnWidths: PropTypes.bool,
};

XUICompositionMasterDetailSummaryHeader.defaultProps = {
	hasGridGap: true,
	hasAutoSpaceAround: true,
	hasAutoColumnWidths: true,
};
