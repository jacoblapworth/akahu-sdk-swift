import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_4.scss';

import XUIGridAreaMain from './XUIGridAreaMain';
import XUIGridAreaSummary from './XUIGridAreaSummary';

import baseCompositionClass from './helpers';

export default class XUIComposition4 extends PureComponent {
	render() {
		const {
			summary,
			main,
			className,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-4`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			className,
		);

		return (
			<div className={compositionClasses}>
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

XUIComposition4.propTypes = {
	className: PropTypes.string,
	summary: PropTypes.element.isRequired,
	main: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};
