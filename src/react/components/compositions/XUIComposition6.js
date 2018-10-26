import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_6.scss';

import XUIGridAreaMain from './XUIGridAreaMain';

import baseCompositionClass from './helpers';

export default class XUIComposition6 extends PureComponent {
	render() {
		const {
			main,
			className,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-6`,
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

XUIComposition6.propTypes = {
	className: PropTypes.string,
	main: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};
