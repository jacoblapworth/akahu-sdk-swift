import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_3.scss';

import XUIGridAreaMain from './XUIGridAreaMain';
import XUIGridAreaSummary from './XUIGridAreaSummary';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass from './helpers';

export default class XUIComposition3 extends PureComponent {
	render() {
		const {
			className,
			header,
			summary,
			main,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-3`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			className,
		);

		return (
			<div className={compositionClasses}>
				<XUIGridAreaHeader>
					{header}
				</XUIGridAreaHeader>
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

XUIComposition3.propTypes = {
	className: PropTypes.string,
	header: PropTypes.element.isRequired,
	summary: PropTypes.element.isRequired,
	main: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};

