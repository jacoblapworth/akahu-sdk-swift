import React from 'react';
import cn from 'classNames';
import BaseComponent from 'base-component';

/**
 * @private
 * @enum
 *
 * CSS classes used by this component
 */
const CSS_CLASSES = {
	COLORPREFIX: 'c-avatar'
};

/**
 * @public
 *
 * Property types for this component
 */
const propTypes = {

	/** @property {String} [firstName] The first name of the user */
	firstName: React.PropTypes.string.isRequired,

	/** @property {String} [lastName] The last name of the user */
	lastName: React.PropTypes.string,

	/** @property {String} [imageUrl] the image the component should render. Initials rendered otherwise */
	imageUrl: React.PropTypes.string,

	/** @property {Number} [avatarSize=24] The diameter size of the avatar. Value will render in px */
	avatarSize: React.PropTypes.number,

	/** @property {Number} [fontSize=10] The font-size of the user initials. Value will render in px */
	fontSize: React.PropTypes.number

};

/**
 * @public
 *
 * Default property values for this component
 */
const defaultProps = {
	avatarSize: 24,
	fontSize: 10
};

export default class UserAvatar extends BaseComponent {

	constructor(props) {
		super(props);
	}

	renderAvatar() {

		let UserAvatar = this;

		const avatarClassNames = cn(
			'c-avatar',
			this.determineBGColor(UserAvatar.getInitials())
		);

		const avatarStyle = {
			backgroundImage: this.props.imageUrl ? 'url(' + this.props.imageUrl + ')' : '',
			width: this.props.avatarSize,
			height: this.props.avatarSize,
			fontSize: this.props.fontSize
		};

		let avatar = '';

		if (this.props.imageUrl) {
			avatar = <span className="c-avatar has-image" style={avatarStyle}></span>;
		} else {
			avatar =
				<span className={avatarClassNames} style={avatarStyle}>
					<span className="c-avatar--initials">{UserAvatar.getInitials()}</span>
				</span>;
		}

		return avatar;
	}

	determineBGColor(initials) {

		let firstInitial = initials[0].toLowerCase();
		let letters = ['ab', 'cd', 'ef', 'ghi', 'jkl', 'mno', 'pqr', 'st', 'uvw', 'xyz'];
		let bgClass = `${CSS_CLASSES.COLORPREFIX}-${letters[0]}`;

		letters.forEach( function(letter, idx) {
			if (letter.indexOf(firstInitial) !== -1) {
				bgClass = `${CSS_CLASSES.COLORPREFIX}-${letter}`;
			}
		});

		return bgClass;
	}

	getInitials() {

		let initials =  this.props.lastName ?
			this.props.firstName[0].toUpperCase() + this.props.lastName[0].toUpperCase() :
			this.props.firstName[0].toUpperCase();

		return initials;
	}

	render() {
		return (
			<span className={this.props.className}>
				{this.renderAvatar()}
			</span>
		);
	}
}

UserAvatar.propTypes = propTypes;
UserAvatar.defaultProps = defaultProps;