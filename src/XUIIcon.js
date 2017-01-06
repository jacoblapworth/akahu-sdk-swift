import React, { PropTypes } from 'react';
import cn from 'classnames';
import XUIIconBlob from './XUIIconBlob';
import icons from './iconData';

// TODO: Remove this logic in a future version
const names = Object.keys(icons).reduce((object, icon) => {
		object[icon.replace('-','_').toUpperCase()] = icon;
		return object;
	}, {});

export { names as XUIIcons };

const blobId = 'xui-icon-blob-auto';

const sizeClasses = {
	standard: '',
	large: 'xui-icon-large',
	xlarge: 'xui-icon-xlarge'
};

const rotationClasses = {
	'90': 'xui-icon-rotate-90',
	'180': 'xui-icon-rotate-180',
	'270': 'xui-icon-rotate-270'
};

/* eslint-disable camelcase */
const colorClasses = {
	standard: 'xui-icon-color-standard',
	white: 'xui-icon-color-white',
	blue: 'xui-icon-color-blue',
	green: 'xui-icon-color-green',
	red: 'xui-icon-color-red',
	file_spreadsheet: 'xui-icon-color-file-spreadsheet',
	file_pdf: 'xui-icon-color-file-pdf'
};
/* eslint-enabled camelcase */

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
	/** @property {string} [rotation=0] Adds a rotation modifier to the icon */
	rotation: PropTypes.oneOf(Object.keys(rotationClasses)),
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

	if (typeof(document) !== 'undefined' && !document.getElementById(blobId)) {
		renderBlob();
	}

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

function renderBlob() {
	const blobEl = document.createElement('div');
	blobEl.id = blobId;
	blobEl.innerHTML = XUIIconBlob;
	document.body.appendChild(blobEl);
}

XUIIcon.propTypes = propTypes;
XUIIcon.defaultProps = defaultProps;
