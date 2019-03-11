import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default class XUIIsolationHeaderTitle extends PureComponent {
	render() {
		const {
			children,
			className,
			qaHook,
			title,
		} = this.props;
		const classNames = cn(
			className,
			`${ns}-isolationheader--title`,
		);
		return (
			<h2 title={title} className={classNames} data-automationid={qaHook}>
				{children}
			</h2>
		);
	}
}

XUIIsolationHeaderTitle.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node,

	/** The value of the title attribute */
	title: PropTypes.string,
};
