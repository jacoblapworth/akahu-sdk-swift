import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_5.scss';

import XUIGridAreaMain from './XUIGridAreaMain';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass from './helpers';

export default class XUIComposition5 extends PureComponent {
	render() {
		const {
			className,
			header,
			main,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-5`,
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
			</div>
		);
	}
}

XUIComposition5.propTypes = {
	className: PropTypes.string,
	header: PropTypes.element.isRequired,
	main: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};

