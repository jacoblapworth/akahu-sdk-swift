import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_2.scss';

import XUIGridAreaMain from './XUIGridAreaMain';
import XUIGridAreaSummary from './XUIGridAreaSummary';
import XUIGridAreaNav from './XUIGridAreaNav';

import baseCompositionClass from './helpers';

export default class XUIComposition2 extends PureComponent {
	render() {
		const {
			summary,
			nav,
			main,
			className,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-2`,
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
				<XUIGridAreaSummary>
					{summary}
				</XUIGridAreaSummary>
			</div>
		);
	}
}

XUIComposition2.propTypes = {
	className: PropTypes.string,
	summary: PropTypes.element.isRequired,
	nav: PropTypes.element.isRequired,
	main: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};
