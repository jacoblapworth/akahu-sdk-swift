import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaDetail from './XUIGridAreaDetail';

import baseCompositionClass from './helpers';

export default class XUICompositionDetail extends PureComponent {
	render() {
		const {
			detail,
			className,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-detail`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			className,
		);

		return (
			<div className={compositionClasses}>
				<XUIGridAreaDetail>
					{detail}
				</XUIGridAreaDetail>
			</div>
		);
	}
}

XUICompositionDetail.propTypes = {
	className: PropTypes.string,

	/**
	 * The main content
	 */
	detail: PropTypes.element.isRequired,
	/**
	 * Determines whether the main content takes full width of page
	 */
	isInfinite: PropTypes.bool,

};
