/**
 * Created by kirk.holloway on 18/04/2016.
 */
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
	rotation: PropTypes.oneOf(rotations)
};

const defaultProps = {
	size: 'standard',
	role: 'presentation'
};

export default function XUIIcon(props) {
	const { icon, className, size, title, desc, role, rotation } = props;
	const classes = cn(Classes.Icon.BASE, className, iconSizes[size], Classes.Icon.ROTATE[rotation]);

	if (!document.getElementById('xui-icon-blob')) {
		renderBlob();
	}

	const optionalTitle = title? <title>{ title }</title> : null;
	const optionalDescription = desc? <desc>{ desc }</desc> : null;

	return(
		<svg className={ classes }>
			{ optionalTitle }
			{ optionalDescription }
			<use xlinkHref={'#xui-icon-' + icon } role={ role }/>
		</svg>
	);
}

function renderBlob() {
	const blobEl = document.createElement('div');
	blobEl.setAttribute('id','xui-icon-blob');
	blobEl.innerHTML = XUIIconBlob;
	document.body.appendChild(blobEl);
}

XUIIcon.propTypes = propTypes;
XUIIcon.defaultProps = defaultProps;
