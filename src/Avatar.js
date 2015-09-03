import React from 'react';
import ClassName from 'classNames';
/* eslint no-unused-vars: 0 */
import atPolyfill from 'String.prototype.at';

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
	
	/** @property {String} [identifier] An unique string that will be used to generate the colour of the avatar */
	identifier: React.PropTypes.string

};

/**
 * @public
 *
 * Default property values for this component
 */
const defaultProps = {
	size: 'small'
};

const AVATAR_SIZE_CLS = {
	'small': 'xui-avatar-small',
	'medium': 'xui-avatar-medium',
	'large': 'xui-avatar-large'
};

const COLOURS = [
	'#F6534E',
	'#FA8100',
	'#F8A900',
	'#57C40A',
	'#51DAAF',
	'#3ADCF6',
	'#2BAAED',
	'#5C5CE6',
	'#A352CC',
	'#FF66CC'
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

	constructor(props) {
		super(props);
	}

	renderAvatar() {

		const avatar = this;

		const value = avatar.props.value.at(0);
		const imageUrl = avatar.props.imageUrl;
		const size = avatar.props.size;
		let colour = avatar.props.colour;
		const identifier = avatar.props.identifier;

		const avatarClassNames = ClassName(
			'xui-avatar',
			AVATAR_SIZE_CLS[size]
		);

		let element;

		if (imageUrl) {
			element = <img className={avatarClassNames} alt="" src={imageUrl}></img>;
		} else {
			colour = colour || generateColour(identifier);
			const avatarStyle = { 'backgroundColor': colour };
			element =
			<abbr className={avatarClassNames} style={avatarStyle}>{value}</abbr>;
		}

		return element;
	}

	render() {
		return (
			<span className={this.props.className}>
				{this.renderAvatar()}
			</span>
		);
	}
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;