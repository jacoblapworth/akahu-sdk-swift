import React, {PropTypes} from 'react';
import cn from 'classnames';
import XUIIconBlob from './XUIIconBlob';
import Classes from 'xui-css-classes';
import icons from './iconData';

const iconNames = Object.keys(icons).reduce((object, icon, i) => {
		object[icon.replace('-','_').toUpperCase()] = icon;
		return object;
	}, {});
export const XUIIcons = iconNames;
const iconBlobId = 'xui-icon-blob-auto';
const iconSizes = {
	standard: '',
	large: Classes.Icon.LARGE,
	xlarge: Classes.Icon.XLARGE
};
const rotations = [
	0,
	90,
	180,
	270
];
const colors = Object.keys(Classes.Icon.Color).map(key=>{return key.toLowerCase()});
const propTypes = {
	/** @property {string} Defines the icon to be rendered */
	icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
	/** @property {string} [className=''] Additional classes to be applied to the icon */
	className: PropTypes.string,
	/** @property {string} [size=''] Adds a size modifier to the icon */
	size: PropTypes.oneOf(Object.keys(iconSizes)),
	/** @property {string} [title=''] Title to be read by screen readers */
	title: PropTypes.string,
	/** @property {string} [desc=''] Description to be read by screen readers */
	desc: PropTypes.string,
	/** @property {string} [desc=''] Role to be applied to the SVG for screen readers */
	role: PropTypes.string,
	/** @property {string} [rotation=0] Adds a rotation modifier to the icon */
	rotation: PropTypes.oneOf(rotations),
	/** @property {string} [color] Adds a color modifier to the icon */
	color: PropTypes.oneOf(colors),
	/** @property {bool} [inline] Whether the inline class modifier should be added */
	inline: PropTypes.bool
};

const defaultProps = {
	size: 'standard',
	role: 'presentation'
};

export default function XUIIcon(props) {
	const { icon, className, size, title, desc, role, rotation, color, inline } = props;
	const classes = cn(
		Classes.Icon.BASE,
		className,
		iconSizes[size],
		Classes.Icon.Color[color ? color.toUpperCase() : null],
		{
			[Classes.Icon.ROTATE[rotation]] : rotation,
			[Classes.Icon.INLINE] : inline
		}
		);

	if (typeof(document) !== 'undefined' && !document.getElementById(iconBlobId)) {
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
	blobEl.id = iconBlobId;
	blobEl.innerHTML = XUIIconBlob;
	document.body.appendChild(blobEl);
}

XUIIcon.propTypes = propTypes;
XUIIcon.defaultProps = defaultProps;
