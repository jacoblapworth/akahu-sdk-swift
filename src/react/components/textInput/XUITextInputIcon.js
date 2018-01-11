import React from 'react';
import PropTypes from 'prop-types';
import XUIIcon from '../icon/XUIIcon';
import cn from 'classnames';

import { baseClass } from './private/constants';

const XUITextInputIcon = props => {
	const {
		wrapperColor,
		iconClassName,
		className,
		qaHook,
		path,
		rotation,
		size,
		color,
		inline,
		title,
		desc,
		position,
		...other
	} = props;

	const alignedElementsClasses = cn(
		{
			[`${baseClass}--iconwrapper-${wrapperColor}`]: wrapperColor != null,
		},
		className
	)

	return (
		<div className={alignedElementsClasses} data-automationid={qaHook} {...other}>
			<XUIIcon
				qaHook={`${qaHook}--input`}
				className={cn(`${baseClass}--icon-${position}`, iconClassName)}
				path={path}
				rotation={rotation}
				size={size}
				color={color}
				inline={inline}
				title={title}
				desc={desc}
			/>
		</div>
	)
}

XUITextInputIcon.propTypes = {
	wrapperColor: PropTypes.string,
	iconClassName: PropTypes.string,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	path: PropTypes.string,
	rotation: PropTypes.func,
	size: PropTypes.string,
	color: PropTypes.string,
	inline: PropTypes.bool,
	title: PropTypes.string,
	desc: PropTypes.string,
	position: PropTypes.string
}

export default XUITextInputIcon;
