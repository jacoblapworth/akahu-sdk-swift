import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';
import {sizeClassNames, classNames, variantClassNames} from './constants';
import {getAvatarColorClass, abbreviateAvatar} from './utils';

export default class XUIAvatar extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			imageError: false
		};
		this.onError = this.onError.bind(this);
	}
	/**
	 * onError handler for the image element
	 * @param {Error} e Error object
	 */
	onError(e) {
		const { props } = this;

		this.setState({
			imageError: true
		});

		props.onError && props.onError(e);
	}

	render() {
		const { imageError } = this.state;
		const {
			qaHook,
			className,
			imageUrl,
			size,
			identifier,
			value,
			variant
		} = this.props;

		const avatarClassNames = cn(
			className,
			classNames.base,
			sizeClassNames[size],
			variantClassNames[variant]
		);
		return imageUrl && !imageError ? (
			<img onError={this.onError} data-automationid={qaHook} className={avatarClassNames} role="presentation" alt="" src={imageUrl}/>
		) : (
			<abbr
				data-automationid={qaHook}
				className={cn(avatarClassNames, getAvatarColorClass(identifier || value || imageUrl))} role="presentation"
			>
				{abbreviateAvatar(value, variant === 'business' ? 3 : 2)}
			</abbr>
		);

	}
}

XUIAvatar.propTypes = {
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
	size: PropTypes.oneOf(Object.keys(sizeClassNames)).isRequired,

	/** A unique string that will be used to generate the color of the avatar if color is not provided. If this is not set then value is used as the identifier. */
	identifier: PropTypes.string,

	/** Error handler if the avatar image fails to load */
	onError: PropTypes.func
};

XUIAvatar.defaultProps = {
	size: 'medium',
	value: ''
};
