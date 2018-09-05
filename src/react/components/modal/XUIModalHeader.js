import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './constants';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIModalHeader({
	className,
	children,
	defaultLayout,
	qaHook,
	id,
}) {
	const classNames = cn(
		`${baseClass}--header`,
		`${baseClass}--heading`,
		defaultLayout && `${ns}-padding-left-large`,
		className,
	);
	return (
		<header id={id} className={classNames} data-automationid={qaHook}>
			{children}
		</header>
	);
}

XUIModalHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** Id for the modal header. Used for automatically providing a label to the modal. */
	id: PropTypes.string,

	/** If the modal will use the default XUI style layout */
	defaultLayout: PropTypes.bool,
};

XUIModalHeader.defaultProps = {
	defaultLayout: true,
};
