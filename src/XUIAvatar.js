import React from 'react';
import cn from 'classnames';
import XUIClasses from 'xui-css-classes';
import 'String.prototype.at';

/**
 * @public
 *
 * Property types for this component
 */
const propTypes = {

	className: React.PropTypes.string,
	qaHook: React.PropTypes.string,

	/** @property {String} [value] The text to display in the avatar */
	value: function(props, propName) {
		if (!props[propName] && !props.imageUrl) {
			return new Error('Avatar component requires either a non-empty `value` or `imageUrl` property');
		}
	},

	/** @property {String} [imageUrl] the image the component should render. Initials rendered otherwise */
	imageUrl: React.PropTypes.string,

	/** @property {String} [size=medium] The size of the avatar. Can be small, medium or large */
	size: React.PropTypes.oneOf(['small', 'medium', 'large']),

	/** @property {String} [identifier] A unique string that will be used to generate the color of the avatar if color is not provided. If this is not set then value is used as the identifier. */
	identifier: React.PropTypes.string,

	/** @property {Function} [onError] Error handler if the avatar image fails to load */
	onError: React.PropTypes.fn
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
 * Map of sizes to XUI Classes properties
 */
const sizeMap = {
	'small': 'SMALL',
	'medium': '',
	'large': 'LARGE'
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
	const colorNumber = (h % XUIClasses.Avatar.COLORS.length);
	return XUIClasses.Avatar.COLORS[colorNumber];
}

export default function Avatar(props) {
	const { qaHook, imageUrl, size, identifier, value, onError } = props;

	const avatarClassNames = cn(
		props.className,
		XUIClasses.Avatar.BASE,
		XUIClasses.Avatar[sizeMap[size]],
		imageUrl ? null : getAvatarColorClass(identifier || value)
	);

	if (imageUrl) {
		return <img onError={onError} data-automationid={qaHook} className={avatarClassNames} role="presentation" alt="" src={imageUrl}/>;
	} else {
		return <abbr data-automationid={qaHook} className={avatarClassNames} role="presentation">{props.value.at(0)}</abbr>;
	}
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
