import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ns } from '../helpers/xuiClassNamespace';
import '../../../sass/5-structure/_gridarea-nav.scss';

export default class XUIGridAreaNav extends PureComponent {
	render() {
		const {
			children,
			...otherProps
		} = this.props;

		const classNames = cn(`${ns}-gridarea-nav`);

		return (
			<div
				className={classNames}
				{...otherProps}
			>
				{children}
			</div>
		);
	}
}

XUIGridAreaNav.propTypes = {
	children: PropTypes.any,
};
