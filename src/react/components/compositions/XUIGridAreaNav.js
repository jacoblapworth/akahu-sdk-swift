import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ns } from '../helpers/xuiClassNamespace';
import '../../../sass/5-structure/_gridarea-nav.scss';

const BodyElement = ({ children, mobileEnabled = false }) => (mobileEnabled ?
	(
		<div className={`${ns}-gridarea-nav-mobile ${ns}-gridarea-nav-mobile-is-open`}>
			<div className={`${ns}-gridarea-nav-mobile--mask`} />
			<div className={`${ns}-gridarea-nav-mobile--body`}>
				{children}
			</div>
		</div>
	) : { children });

BodyElement.propTypes = {
	children: PropTypes.any,
	mobileEnabled: PropTypes.bool,
};

export default class XUIGridAreaNav extends PureComponent {
	render() {
		const {
			children,
			mobileEnabled,
			...otherProps
		} = this.props;

		const classNames = cn(`${ns}-gridarea-nav`);

		return (
			<div
				className={classNames}
				{...otherProps}
			>
				<BodyElement mobileEnabled={mobileEnabled}>
					{children}
				</BodyElement>
			</div>
		);
	}
}

XUIGridAreaNav.propTypes = {
	children: PropTypes.any,
	mobileEnabled: PropTypes.bool,
};
