import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {baseClass} from './constants';
import {ns} from "../helpers/xuiClassNamespace";

export default function XUIModalHeader({ className, children, defaultLayout, qaHook }) {
	const classNames = cn(
		`${baseClass}--header`,
		`${baseClass}--heading`,
		defaultLayout && `${ns}-padding-left-large`,
		className
	);
	return (
		<header className={classNames} data-automationid={qaHook}>
			{children}
		</header>
	);
}

XUIModalHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** If the modal will use the default XUI style layout */
	defaultLayout: PropTypes.bool
};

XUIModalHeader.defaultProps = {
	defaultLayout: true,
};
