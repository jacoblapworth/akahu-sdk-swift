import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaPrimary from './XUIGridAreaPrimary';
import XUIGridAreaMain from './XUIGridAreaDetail';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass, { retainValues, buildGlobalCompositionClasses } from './helpers';

export default class XUICompositionSplitHeader extends PureComponent {
	render() {
		const {
			className,
			header,
			primary,
			secondary,
			retainWidth,
			...spreadProps
		} = this.props;

		const compositionClasses = cn(
			buildGlobalCompositionClasses(spreadProps),
			`${baseCompositionClass}-splitheader`,
			retainWidth &&
				retainValues[retainWidth] &&
				`${baseCompositionClass}-splitheader-retain-${retainWidth}`,
			className,
		);

		return (
			<div className={compositionClasses}>
				<XUIGridAreaHeader>
					{header}
				</XUIGridAreaHeader>
				<XUIGridAreaPrimary>
					{primary}
				</XUIGridAreaPrimary>
				<XUIGridAreaMain>
					{secondary}
				</XUIGridAreaMain>
			</div>
		);
	}
}

XUICompositionSplitHeader.propTypes = {
	className: PropTypes.string,

	/**
	 * Header content or component
	 */
	header: PropTypes.element.isRequired,
	/**
	 * More recent or important content
	 */
	primary: PropTypes.element.isRequired,
	/**
	 * Accompanying content
	 */
	secondary: PropTypes.element.isRequired,
	/**
	 * Determines whether the main content takes full width of page. Defaults to false.
	 */
	isInfinite: PropTypes.bool,
	/**
	 * Lets you set a retain width value so that the layout doesn't change when the
	 * viewport is equal to or larger than the width specified
	 */
	retainWidth: PropTypes.oneOf(['', 'small']),
	/**
	 * Whether to apply a pre-set grid-gap between all grid areas. Defaults to true.
	 */
	hasGridGap: PropTypes.bool,
	/**
	 * Whether to apply pre-set spacing to the outside of the composition grid. Defaults to true.
	 */
	hasAutoSpaceAround: PropTypes.bool,
};

XUICompositionSplitHeader.defaultProps = {
	hasGridGap: true,
	hasAutoSpaceAround: true,
};
