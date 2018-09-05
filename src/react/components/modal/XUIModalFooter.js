import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './constants';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIModalFooter({
	className,
	children,
	defaultLayout,
	qaHook,
}) {
	const classNames = cn(
		`${baseClass}--footer`,
		className,
		defaultLayout && `${ns}-padding-large`,
	);

	return (
		<footer className={classNames} data-automationid={qaHook}>
			{children}
		</footer>
	);
}

XUIModalFooter.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** If the modal will use the default XUI style layout */
	defaultLayout: PropTypes.bool,
};

XUIModalFooter.defaultProps = {
	defaultLayout: true,
};
