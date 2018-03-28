import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {baseClass} from "./private/constants";

export default function XUIToastMessage({ className, children, qaHook }) {
	const classNames = cn(className, `${baseClass}--message`);

	return (
		<p className={classNames} data-automationid={qaHook}>
			{children}
		</p>
	);
}

XUIToastMessage.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string
};
