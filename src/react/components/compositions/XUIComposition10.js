import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_10.scss';

import XUIGridAreaMain from './XUIGridAreaMain';
import XUIGridAreaNav from './XUIGridAreaNav';

import baseCompositionClass from './helpers';

export default class XUIComposition10 extends PureComponent {
	render() {
		const {
			nav,
			main,
			className,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-10`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			className,
		);

		return (
			<div className={compositionClasses}>
				<XUIGridAreaNav>
					{nav}
				</XUIGridAreaNav>
				<XUIGridAreaMain>
					{main}
				</XUIGridAreaMain>
			</div>
		);
	}
}

XUIComposition10.propTypes = {
	className: PropTypes.string,
	nav: PropTypes.element.isRequired,
	main: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};
