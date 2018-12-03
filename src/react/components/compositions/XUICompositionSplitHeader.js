import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_splitheader.scss';

import XUIGridAreaPrimary from './XUIGridAreaPrimary';
import XUIGridAreaMain from './XUIGridAreaDetail';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass from './helpers';

export default class XUICompositionSplitHeader extends PureComponent {
	render() {
		const {
			className,
			header,
			primary,
			secondary,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-splitheader`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
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

};

