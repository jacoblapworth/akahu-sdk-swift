import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaDetail from './XUIGridAreaDetail';
import XUIGridAreaMaster from './XUIGridAreaMaster';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass, { retainValues } from './helpers';

export default class XUICompositionMasterDetailHeader extends PureComponent {
	render() {
		const {
			className,
			header,
			master,
			detail,
			isInfinite,
			retainWidth,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-masterdetailheader`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			retainWidth &&
				retainValues[retainWidth] &&
				`${baseCompositionClass}-masterdetailheader-retain-${retainWidth}`,
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
			</div>
		);
	}
}

XUICompositionMasterDetailHeader.propTypes = {
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
	 * Determines whether the main content takes full width of page
	 */
	isInfinite: PropTypes.bool,
	/**
	 * Lets you set a retain width value so that the layout doesn't change when the
	 * viewport is equal to or larger than the width specified
	 */
	retainWidth: PropTypes.oneOf(['', 'small']),

};
