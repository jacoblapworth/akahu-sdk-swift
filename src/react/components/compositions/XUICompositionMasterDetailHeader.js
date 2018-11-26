import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_masterdetailheader.scss';

import XUIGridAreaMain from './XUIGridAreaMain';
import XUIGridAreaNav from './XUIGridAreaNav';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass from './helpers';

export default class XUICompositionMasterDetailHeader extends PureComponent {
	render() {
		const {
			className,
			header,
			nav,
			main,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-masterdetailheader`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
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
			</div>
		);
	}
}

XUICompositionMasterDetailHeader.propTypes = {
	className: PropTypes.string,
	header: PropTypes.element.isRequired,
	nav: PropTypes.element.isRequired,
	main: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};
