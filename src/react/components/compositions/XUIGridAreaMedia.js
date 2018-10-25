import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ns } from '../helpers/xuiClassNamespace';

import '../../../sass/5-structure/_gridarea-media.scss';

export default class XUIGridAreaMedia extends PureComponent {
	render() {
		const {
			children,
			...otherProps
		} = this.props;

		const className = `${ns}-gridarea-media`;

		return (
			<div
				className={className}
				{...otherProps}
			>
				{children}
			</div>
		);
	}
}

XUIGridAreaMedia.propTypes = {
	children: PropTypes.any,
};
