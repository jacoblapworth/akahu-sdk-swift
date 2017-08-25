import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';
import {sizeClassNames, classNames, colorClassNames, variantClassNames} from './constants';

const ignoreChars = /[(){}[\]]/; // ignore braces

/**
 * @private
 * Generate an abbreviation for an avatar based on its value. This takes the first character of each word
 * (non-whitespace, not brackets or one of the ignored characters, destructured for unicode handling)
 * @param {String} name The string to abbreviate
 * @param {Number} maxChars The max number of chars desired in the resulting abbreviation
 * @returns {String} The abbreviation
 */
function abbreviateAvatar(name='', maxChars=1) {
	let destructuredName = [...name];
	let nextChar;
	let newName = '';
	let includeNextNonWhitespaceChar = true;

	for(let i = 0; (i < destructuredName.length && newName.length < maxChars); i++) {
		nextChar = destructuredName[i];

		if(/\s/.test(nextChar)) {
			includeNextNonWhitespaceChar = true;
		} else if(includeNextNonWhitespaceChar && !ignoreChars.test(nextChar)) {
			newName += nextChar.toLocaleUpperCase();
			includeNextNonWhitespaceChar = false;
		}
	}

	return newName;
}

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

		const displayValue = value ? abbreviateAvatar(value, variant === 'business' ? 3 : 1) : '';

		if (imageUrl) {
			return <img onError={onError} data-automationid={qaHook} className={avatarClassNames} role="presentation" alt="" src={imageUrl}/>;
		} else {
			return <abbr data-automationid={qaHook} className={avatarClassNames} role="presentation">{displayValue}</abbr>;
		}
	}
}

XUISimpleAvatar.propTypes = {

	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** The avatar variant */
	variant: PropTypes.oneOf(Object.keys(variantClassNames)),

	/** The text to display in the avatar */
	value: function(props, propName) {
		if (!props[propName] && !props.imageUrl) {
			return new Error('Avatar component requires either a non-empty `value` or `imageUrl` property');
		}
	},

	/** the image the component should render. Initials rendered otherwise */
	imageUrl: PropTypes.string,

	/** The size of the avatar. Can be small, medium, large or xlarge */
	size: PropTypes.oneOf(Object.keys(sizeClassNames)),

	/** A unique string that will be used to generate the color of the avatar if color is not provided. If this is not set then value is used as the identifier. */
	identifier: PropTypes.string,

	/** Error handler if the avatar image fails to load */
	onError: PropTypes.func
};

XUISimpleAvatar.defaultProps = {
	size: 'medium'
};
