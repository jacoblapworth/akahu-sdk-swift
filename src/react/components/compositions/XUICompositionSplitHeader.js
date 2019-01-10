import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaPrimary from './XUIGridAreaPrimary';
import XUIGridAreaMain from './XUIGridAreaDetail';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass, { retainValues } from './helpers';

export default class XUICompositionSplitHeader extends PureComponent {
	render() {
		const {
			className,
			header,
			primary,
			secondary,
			isInfinite,
			retainWidth,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-splitheader`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
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
	 * Determines whether the main content takes full width of page
	 */
	isInfinite: PropTypes.bool,
	/**
	 * Lets you set a retain width value so that the layout doesn't change when the
	 * viewport is equal to or larger than the width specified
	 */
	retainWidth: PropTypes.oneOf(['', 'small']),
};

