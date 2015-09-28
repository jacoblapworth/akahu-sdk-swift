import React from 'react';
import ClassName from 'classNames';
import 'String.prototype.at';

/**
 * @public
 *
 * Property types for this component
 */
const propTypes = {

	/** @property {String} value The text to display in the avatar */
	value: React.PropTypes.string.isRequired,

	/** @property {String} [imageUrl] the image the component should render. Initials rendered otherwise */
	imageUrl: React.PropTypes.string,

	/** @property {String} [size=small] The size of the avatar. Can be small, medium or large */
	size: React.PropTypes.string,

	/** @property {String} [colour] The background colour of the avatar */
	colour: React.PropTypes.string,

	/** @property {String} [identifier] A unique string that will be used to generate the colour of the avatar if colour is not provided. If this is not set then value is used as the identifier. */
	identifier: React.PropTypes.string

};

/**
 * @public
 *
 * Default property values for this component
 */
const defaultProps = {
	size: 'medium'
};

const AVATAR_SIZE_CLS = {
	'small': 'xui-avatar-small',
	'large': 'xui-avatar-large'
};

const COLOURS = [
	'#FA908C',
	'#FCAD59',
	'#FBC859',
	'#92D960',
	'#8EE7CB',
	'#7FE9FA',
	'#75C8F4',
	'#9595EF',
	'#C48FDE',
	'#FF9CDE'
];

/**
* @private
* Generates a color based on an identifier
* @param {String} identifier
* @returns {String} A color from the colours array
*/
function generateColour(identifier) {
	let i;
	let c;
	let h = 5381;
	const len = identifier.length >>> 0;

	for (i = 0; i < len; i++) {
		c = identifier.charCodeAt(i);
		h = (((h << 5) + h) ^ c) >>> 0;
	}

	return COLOURS[h % COLOURS.length];
}

export default class Avatar extends React.Component {
	render() {
		const avatar = this;

		const value = avatar.props.value.at(0);
		const imageUrl = avatar.props.imageUrl;
		const size = avatar.props.size;
		const identifier = avatar.props.identifier;
		let colour = avatar.props.colour;

		const avatarClassNames = ClassName(
			avatar.props.className,
			'xui-avatar',
			AVATAR_SIZE_CLS[size]
		);

		if (imageUrl) {
			return <img className={avatarClassNames} alt="" src={imageUrl}></img>;
		} else {
			colour = colour || generateColour(identifier || avatar.props.value);
			const avatarStyle = { 'backgroundColor': colour };
			return <abbr className={avatarClassNames} className={avatarClassNames} style={avatarStyle}>{value}</abbr>;
		}
	}
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
