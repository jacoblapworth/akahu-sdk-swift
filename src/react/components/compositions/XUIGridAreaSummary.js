import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ns } from '../helpers/xuiClassNamespace';

import '../../../sass/5-structure/_gridarea-summary.scss';

export default class XUIGridAreaSummary extends PureComponent {
	render() {
		const {
			children,
			...otherProps
		} = this.props;

		const className = `${ns}-gridarea-summary`;

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

XUIGridAreaSummary.propTypes = {
	children: PropTypes.any,
};
