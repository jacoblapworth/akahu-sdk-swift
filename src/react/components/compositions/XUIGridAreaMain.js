import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ns } from '../helpers/xuiClassNamespace';

import '../../../sass/5-structure/_gridarea-main.scss';

export default class XUIGridAreaMain extends PureComponent {
	render() {
		const {
			children,
			...otherProps
		} = this.props;

		const className = `${ns}-gridarea-main`;

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

XUIGridAreaMain.propTypes = {
	children: PropTypes.any,
};
