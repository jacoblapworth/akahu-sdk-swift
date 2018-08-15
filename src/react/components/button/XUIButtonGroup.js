import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIButtonGroup({ children, className, qaHook }) {
	return (
		<div className={cn(className, `${ns}-buttongroup`)} data-automationid={qaHook}>
			{Children.map(children, child => cloneElement(child, { isGrouped: true }))}
		</div>
	);
}

XUIButtonGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
};
