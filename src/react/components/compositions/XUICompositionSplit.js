import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaPrimary from './XUIGridAreaPrimary';
import XUIGridAreaDetail from './XUIGridAreaDetail';

import baseCompositionClass, { retainValues } from './helpers';

export default class XUICompositionSplit extends PureComponent {
	render() {
		const {
			primary,
			secondary,
			className,
			isInfinite,
			retainWidth,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-split`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			retainWidth &&
				retainValues[retainWidth] &&
				`${baseCompositionClass}-split-retain-${retainWidth}`,
			className,
		);

		return (
			<div className={compositionClasses}>
				<XUIGridAreaPrimary>
					{primary}
				</XUIGridAreaPrimary>
				<XUIGridAreaDetail>
					{secondary}
				</XUIGridAreaDetail>
			</div>
		);
	}
}

XUICompositionSplit.propTypes = {
	className: PropTypes.string,

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
