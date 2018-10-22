import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ns } from '../helpers/xuiClassNamespace';

import '../../../sass/5-structure/_gridarea-header.scss';

export default class XUIGridAreaHeader extends PureComponent {
	render() {
		const {
			children,
			...otherProps
		} = this.props;

		const className = `${ns}-gridarea-header`;

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

XUIGridAreaHeader.propTypes = {
	children: PropTypes.any,
};
