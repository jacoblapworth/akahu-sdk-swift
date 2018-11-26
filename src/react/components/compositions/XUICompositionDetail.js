import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_detail.scss';

import XUIGridAreaMain from './XUIGridAreaMain';

import baseCompositionClass from './helpers';

export default class XUICompositionDetail extends PureComponent {
	render() {
		const {
			main,
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
				<XUIGridAreaMain>
					{main}
				</XUIGridAreaMain>
			</div>
		);
	}
}

XUICompositionDetail.propTypes = {
	className: PropTypes.string,
	main: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};
