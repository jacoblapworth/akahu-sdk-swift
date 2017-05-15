import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import icons from './private/iconData';
import { ensureIconBlobOnPage } from './XUIIconBlob';
import {sizeClasses, rotationClasses, colorClasses } from './private/constants';

const names = Object.keys(icons).reduce((object, icon) => {
		object[icon.replace('-','_').toUpperCase()] = icon;
		return object;
	}, {});

export { names as XUIIcons };

const propTypes = {
	/** @property {string} Defines the icon to be rendered */
	icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
	/** @property {string} [className=''] Additional classes to be applied to the icon */
	className: PropTypes.string,
	/** @property {string} [size=''] Adds a size modifier to the icon */
	size: PropTypes.oneOf(Object.keys(sizeClasses)),
	/** @property {string} [title=''] Title to be read by screen readers */
	title: PropTypes.string,
	/** @property {string} [desc=''] Description to be read by screen readers */
	desc: PropTypes.string,
	/** @property {string} [desc=''] Role to be applied to the SVG for screen readers */
	role: PropTypes.string,
	/** @property {string|number} [rotation=0] Adds a rotation modifier to the icon. Accepted values are 0 (default), 90, 180, 270 */
	rotation: PropTypes.oneOf(Object.keys(rotationClasses).concat(Object.keys(rotationClasses).map(n => parseInt(n)))),
	/** @property {string} [color] Adds a color modifier to the icon */
	color: PropTypes.oneOf(Object.keys(colorClasses)),
	/** @property {bool} [inline] Whether the inline class modifier should be added */
	inline: PropTypes.bool
};

const defaultProps = {
	size: 'standard',
	role: 'presentation'
};

export default function XUIIcon(props) {

	const {
		icon,
		className,
		size,
		title,
		desc,
		role,
		rotation,
		color,
		inline
	} = props;

	const classes = cn(
		'xui-icon',
		className,
		sizeClasses[size],
		colorClasses[color],
		rotationClasses[rotation],
		{
			'xui-icon-inline' : inline
		}
	);

	ensureIconBlobOnPage();

	const optionalTitle = title? <title>{ title }</title> : null;
	const optionalDescription = desc? <desc>{ desc }</desc> : null;

	return(
		<svg focusable="false" className={ classes }>
			{ optionalTitle }
			{ optionalDescription }
			<use xlinkHref={'#xui-icon-' + icon } role={ role }/>
		</svg>
	);
}

XUIIcon.propTypes = propTypes;
XUIIcon.defaultProps = defaultProps;
