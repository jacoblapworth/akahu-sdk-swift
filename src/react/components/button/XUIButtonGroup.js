import React, { Children, cloneElement } from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';

export default function XUIButtonGroup({children, className}) {
	return (
		<div className={cn(className, 'xui-buttongroup')}>
			{Children.map(children, child => cloneElement(child, { isGrouped: true }))}
		</div>
	);
}

XUIButtonGroup.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
};
