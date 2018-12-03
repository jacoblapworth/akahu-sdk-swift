import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_masterdetailsummary.scss';

import XUIGridAreaDetail from './XUIGridAreaDetail';
import XUIGridAreaSummary from './XUIGridAreaSummary';
import XUIGridAreaMaster from './XUIGridAreaMaster';

import baseCompositionClass from './helpers';

export default class XUICompositionMasterDetailSummary extends PureComponent {
	render() {
		const {
			summary,
			master,
			detail,
			className,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-masterdetailsummary`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			className,
		);

		return (
			<div className={compositionClasses}>
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

XUICompositionMasterDetailSummary.propTypes = {
	className: PropTypes.string,

	/**
	 * Summary content or component
	 */
	summary: PropTypes.element.isRequired,
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

};
