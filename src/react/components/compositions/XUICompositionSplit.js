import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_split.scss';

import XUIGridAreaPrimary from './XUIGridAreaPrimary';
import XUIGridAreaDetail from './XUIGridAreaDetail';

import baseCompositionClass from './helpers';

export default class XUICompositionSplit extends PureComponent {
	render() {
		const {
			primary,
			secondary,
			className,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-split`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
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

};
