import React, { PureComponent } from 'react';
import cn from 'classnames';
import {sizeClassNames, classNames, colorClassNames, variantClassNames} from './constants';

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
	const colorNumber = (h % colorClassNames.length);
	return colorClassNames[colorNumber];
}

export default class XUISimpleAvatar extends PureComponent {
	render() {
		const { qaHook, className, imageUrl, size, identifier, value, variant, onError } = this.props;

		const avatarClassNames = cn(
			className,
			classNames.base,
			sizeClassNames[size],
			variantClassNames[variant],
			imageUrl ? null : getAvatarColorClass(identifier || value)
		);

		let displayValue = '';
		if (value) {
			if(variant === 'business') {
				// An acronym up to 3 characters long based on the business name
				const segments = value.trim().split(' ');
				for(let i = 0; i < 3; i++) {
					if(segments[i]) {
						displayValue += [...segments[i]][0].toLocaleUpperCase();
					} else {
						break;
					}
				}
			} else {
				displayValue = [...value.trim()][0].toLocaleUpperCase();
			}
		}

		if (imageUrl) {
			return <img onError={onError} data-automationid={qaHook} className={avatarClassNames} role="presentation" alt="" src={imageUrl}/>;
		} else {
			return <abbr data-automationid={qaHook} className={avatarClassNames} role="presentation">{displayValue}</abbr>;
		}
	}
}

XUISimpleAvatar.propTypes = {

	className: React.PropTypes.string,
	qaHook: React.PropTypes.string,

	/** @property {String} [variant] The avatar variant */
	variant: React.PropTypes.oneOf(Object.keys(variantClassNames)),

	/** @property {String} [value] The text to display in the avatar */
	value: function(props, propName) {
		if (!props[propName] && !props.imageUrl) {
			return new Error('Avatar component requires either a non-empty `value` or `imageUrl` property');
		}
	},

	/** @property {String} [imageUrl] the image the component should render. Initials rendered otherwise */
	imageUrl: React.PropTypes.string,

	/** @property {String} [size=medium] The size of the avatar. Can be small, medium, large or xlarge */
	size: React.PropTypes.oneOf(Object.keys(sizeClassNames)),

	/** @property {String} [identifier] A unique string that will be used to generate the color of the avatar if color is not provided. If this is not set then value is used as the identifier. */
	identifier: React.PropTypes.string,

	/** @property {Function} [onError] Error handler if the avatar image fails to load */
	onError: React.PropTypes.func
};

XUISimpleAvatar.defaultProps = {
	size: 'medium'
};
