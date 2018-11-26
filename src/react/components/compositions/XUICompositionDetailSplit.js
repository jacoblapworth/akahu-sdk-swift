import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../../../sass/5-structure/_base.scss';
import '../../../sass/5-structure/compositions/_detailsplit.scss';

import XUIGridAreaMedia from './XUIGridAreaMedia';
import XUIGridAreaMain from './XUIGridAreaMain';

import baseCompositionClass from './helpers';

export default class XUICompositionDetailSplit extends PureComponent {
	render() {
		const {
			main,
			media,
			className,
			isInfinite,
		} = this.props;

		const compositionClasses = cn(
			baseCompositionClass,
			`${baseCompositionClass}-detailsplit`,
			!isInfinite && `${baseCompositionClass}-is-finite`,
			className,
		);

		return (
			<div className={compositionClasses}>
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

XUICompositionDetailSplit.propTypes = {
	className: PropTypes.string,
	main: PropTypes.element.isRequired,
	media: PropTypes.element.isRequired,
	isInfinite: PropTypes.bool,
};
