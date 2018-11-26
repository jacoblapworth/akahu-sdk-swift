import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_detailsplitheader.scss';

import XUIGridAreaMedia from './XUIGridAreaMedia';
import XUIGridAreaMain from './XUIGridAreaMain';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass from './helpers';

export default class XUICompositionDetailSplitHeader extends PureComponent {
	render() {
		const {
			className,
			header,
			main,
			media,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-detailsplitheader`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			className,
		);

		return (
			<div className={compositionClasses}>
				<XUIGridAreaHeader>
					{header}
				</XUIGridAreaHeader>
				<XUIGridAreaMedia>
					{media}
				</XUIGridAreaMedia>
				<XUIGridAreaMain>
					{main}
				</XUIGridAreaMain>
			</div>
		);
	}
}

XUICompositionDetailSplitHeader.propTypes = {
	className: PropTypes.string,
	header: PropTypes.element.isRequired,
	main: PropTypes.element.isRequired,
	media: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};

