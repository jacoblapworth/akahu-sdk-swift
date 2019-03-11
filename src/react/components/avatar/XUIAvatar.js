import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import { sizeClassNames, classNames, variantClassNames } from './constants';
import { getAvatarColorClass, abbreviateAvatar } from './utils';

export default class XUIAvatar extends PureComponent {
	state = {
		imageError: false,
	};

	/**
	 * onError handler for the image element
	 * @param {Error} e Error object
	 */
	onError = e => {
		const { onError } = this.props;

		this.setState({
			imageError: true,
		});

		onError && onError(e);
	};

	render() {
		const { imageError } = this.state;
		const {
			qaHook,
			className,
			imageUrl,
			size,
			identifier,
			value,
			variant,
		} = this.props;

		const avatarClassNames = cn(
			className,
			classNames.base,
			sizeClassNames[size],
			variantClassNames[variant],
		);

		const avatarCharacterCount = variant === 'business' && size !== '2xsmall'
			? 3 : 2; // 2xsmall cannot fit 3 characters without overflowing
		return imageUrl && !imageError ? (
			<img
				onError={this.onError}
				data-automationid={qaHook}
				className={avatarClassNames}
				alt=""
				src={imageUrl}
			/>
		) : (
			<abbr
				data-automationid={qaHook}
				className={cn(avatarClassNames, getAvatarColorClass(identifier || value || imageUrl))}
				role="presentation"
			>
				{abbreviateAvatar(value, avatarCharacterCount)}
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
	value(props, propName) {
		const valOrUrl = props[propName] || props.imageUrl;
		if (!valOrUrl) {
			return new Error('XUIAvatar component requires either a ' +
				'non-empty `value` or `imageUrl` property');
		}
		if (typeof valOrUrl !== 'string') {
			return new Error('XUIAvatar: `value` or `imageUrl` must be a string');
		}
		return null;
	},

	/** the image the component should render. Initials rendered otherwise */
	imageUrl: PropTypes.string,

	/** The size of the avatar. Can be small, medium, large or xlarge */
	size: PropTypes.oneOf(Object.keys(sizeClassNames)),

	/** A unique string that will be used to generate the color of the avatar if color is not
	 * provided. If this is not set then value is used as the identifier. */
	identifier: PropTypes.string,

	/** Error handler if the avatar image fails to load */
	onError: PropTypes.func,
};

XUIAvatar.defaultProps = {
	size: 'medium',
	value: '',
};
