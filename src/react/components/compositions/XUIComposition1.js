import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_1.scss';

import XUIGridAreaMain from './XUIGridAreaMain';
import XUIGridAreaSummary from './XUIGridAreaSummary';
import XUIGridAreaNav from './XUIGridAreaNav';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass from './helpers';

export default class XUIComposition1 extends PureComponent {
	render() {
		const {
			className,
			header,
			summary,
			nav,
			main,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-1`,
			className,
		);

		return (
			<div className={compositionClasses}>
				<XUIGridAreaHeader>
					{header}
				</XUIGridAreaHeader>
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

XUIComposition1.propTypes = {
	className: PropTypes.string,
	header: PropTypes.element.isRequired,
	summary: PropTypes.element.isRequired,
	nav: PropTypes.element.isRequired,
	main: PropTypes.element.isRequired,
};

