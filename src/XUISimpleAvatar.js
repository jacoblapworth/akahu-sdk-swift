import React from 'react';
import cn from 'classnames';
import CSSClasses from 'xui-css-classes';
import 'String.prototype.at';
import {sizeMap, variantClassNames} from './constants';

/**
 * @public
 *
 * Property types for this component
 */
const propTypes = {

	className: React.PropTypes.string,
	qaHook: React.PropTypes.string,

	/** @property {String} [variant] The avatar variant */
	variant: React.PropTypes.oneOf(['business']),

	/** @property {String} [value] The text to display in the avatar */
	value: function(props, propName) {
		if (!props[propName] && !props.imageUrl) {
			return new Error('Avatar component requires either a non-empty `value` or `imageUrl` property');
		}
	},

	/** @property {String} [imageUrl] the image the component should render. Initials rendered otherwise */
	imageUrl: React.PropTypes.string,

	/** @property {String} [size=medium] The size of the avatar. Can be small, medium, large or xlarge */
	size: React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),

	/** @property {String} [identifier] A unique string that will be used to generate the color of the avatar if color is not provided. If this is not set then value is used as the identifier. */
	identifier: React.PropTypes.string,

	/** @property {Function} [onError] Error handler if the avatar image fails to load */
	onError: React.PropTypes.func
};

/**
 * @public
 * Default property values for this component
 */
const defaultProps = {
	size: 'medium',
	pureRender: true
};

/**
 * @private
 * Gets the avatar color class based on the identifier
 * @param {String} identifier
 * @returns {String} The class name to use for the avatar's color
 */
function getAvatarColorClass(identifier) {
	let i;
	let c;
	let h = 5381;
	const len = identifier.length >>> 0;

	for (i = 0; i < len; i++) {
		c = identifier.charCodeAt(i);
		h = (((h << 5) + h) ^ c) >>> 0;
	}

	// The XUI class names are not zero-indexed
	const colorNumber = (h % CSSClasses.Avatar.COLORS.length);
	return CSSClasses.Avatar.COLORS[colorNumber];
}

export default function XUISimpleAvatar(props) {
	const { qaHook, imageUrl, size, identifier, value, variant, onError } = props;

	const avatarClassNames = cn(
		props.className,
		CSSClasses.Avatar.BASE,
		CSSClasses.Avatar[sizeMap[size]],
		variantClassNames[variant],
		imageUrl ? null : getAvatarColorClass(identifier || value)
	);

	let displayValue = '';
	if(variant === 'business') {
		// An acronym up to 3 characters long based on the business name
		const segments = value.trim().split(' ');
		for(var i = 0; i < 3; i++) {
			if(segments[i]) {
				displayValue += [...segments[i]][0].toLocaleUpperCase();
			} else {
				break;
			}
		}
	} else {
		displayValue = [...value.trim()][0].toLocaleUpperCase();
	}

	if (imageUrl) {
		return <img onError={onError} data-automationid={qaHook} className={avatarClassNames} role="presentation" alt="" src={imageUrl}/>;
	} else {
		return <abbr data-automationid={qaHook} className={avatarClassNames} role="presentation">{displayValue}</abbr>;
	}
}

XUISimpleAvatar.propTypes = propTypes;
XUISimpleAvatar.defaultProps = defaultProps;
