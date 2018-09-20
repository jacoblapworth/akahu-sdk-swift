import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default class XUIIsolationHeaderSecondaryTitle extends PureComponent {
	render() {
		const {
			children,
			className,
			qaHook,
			title,
		} = this.props;
		const classNames = cn(
			className,
			`${ns}-isolationheader--secondary-title`,
		);
		return (
			<h2 title={title} className={classNames} data-automationid={qaHook}>
				{children}
			</h2>
		);
	}
}

XUIIsolationHeaderSecondaryTitle.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node,

	/** The value of the title attribute */
	title: PropTypes.string,
};
