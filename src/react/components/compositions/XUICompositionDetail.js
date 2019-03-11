import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaDetail from './XUIGridAreaDetail';

import baseCompositionClass, { buildGlobalCompositionClasses } from './helpers';

export default class XUICompositionDetail extends PureComponent {
	render() {
		const {
			detail,
			className,
			...spreadProps
		} = this.props;

		const compositionClasses = cn(
			buildGlobalCompositionClasses(spreadProps),
			`${baseCompositionClass}-detail`,
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
	 * Determines whether the main content takes full width of page. Defaults to false.
	 */
	isInfinite: PropTypes.bool,
	/**
	 * Whether to apply pre-set spacing to the outside of the composition grid. Defaults to true.
	 */
	hasAutoSpaceAround: PropTypes.bool,
};

XUICompositionDetail.defaultProps = {
	hasAutoSpaceAround: true,
};
