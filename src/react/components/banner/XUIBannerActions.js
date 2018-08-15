import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIBannerActions(props) {
	const className = cn(props.className, `${ns}-banner--actions`);

	return (
		<ul className={className} data-automationid={props.qaHook}>
			{props.children}
		</ul>
	);
}

XUIBannerActions.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string,
};
