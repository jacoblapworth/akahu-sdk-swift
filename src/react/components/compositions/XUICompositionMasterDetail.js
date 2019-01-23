import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaDetail from './XUIGridAreaDetail';
import XUIGridAreaMaster from './XUIGridAreaMaster';

import baseCompositionClass, { retainValues, buildGlobalCompositionClasses } from './helpers';

export default class XUICompositionMasterDetail extends PureComponent {
	render() {
		const {
			master,
			detail,
			className,
			retainWidth,
			...spreadProps
		} = this.props;

		const compositionClasses = cn(
			buildGlobalCompositionClasses(spreadProps),
			`${baseCompositionClass}-masterdetail`,
			retainWidth &&
				retainValues[retainWidth] &&
				`${baseCompositionClass}-masterdetail-retain-${retainWidth}`,
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
			</div>
		);
	}
}

XUICompositionMasterDetail.propTypes = {
	className: PropTypes.string,

	/**
	 * Nav content or controls for detail content
	 */
	master: PropTypes.element.isRequired,
	/**
	 * Main content
	 */
	detail: PropTypes.element.isRequired,
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

XUICompositionMasterDetail.defaultProps = {
	hasGridGap: true,
	hasAutoSpaceAround: true,
};
