import React, { PureComponent } from 'react';
import PropTypes from 'proptypes';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import XUIAvatar from '../avatar/XUIAvatar';

class InnerPill extends PureComponent {
	render() {
		const {
			avatarProps,
			href,
			onClick,
			qaHook,
			secondaryText,
			target,
			value
		} = this.props;

		const avatarClasses = avatarProps && cn(
			avatarProps.className,
			'xui-newpill--avatar'
		);

		const avatar = avatarProps && <XUIAvatar {...avatarProps} className={avatarClasses} />;
		const text = secondaryText && <span className="xui-text-color-muted xui-newpill--secondary">{secondaryText}</span>;

		const className = cn(
			'xui-newpill--content',
			{
				'xui-newpill--button': !href
			}
		);

		return (
			<XUIButton
				className={className}
				isLink={!!href}
				href={href}
				target={target}
				variant="unstyled"
				onClick={onClick}
				qaHook={qaHook ? `pillButton-${qaHook}` : null}
			>
				{avatar}
				{text}
				{value}
			</XUIButton>
		);
	}
}

InnerPill.propTypes = {
	/** @property {Object} [avatarProps] Props for the avatar to be displayed, must adhere to the XUIAvatar component API described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing props will omit the avatar entirely. */
	avatarProps: PropTypes.object,
	/** @property {String} [href] This will make the value an `anchor` element instead of a `span` element and adds the href as the link. */
	href: PropTypes.string,
	/** @property {Function} [onClick=noop] Callback to fire when the main pill content is clicked. */
	onClick: PropTypes.func,
	/** @property {String} [qaHook] Adds a data attribute hook for testing. The inner pill has the format `pillButton-${YOUR_STRING_GOES_HERE}`. The delete button has the format `deletePillButton-${YOUR_STRING_GOES_HERE}`. The wrapper pill div has the format `${YOUR_STRING_GOES_HERE}`. */
	qaHook: PropTypes.string,
	/** @property {String} [secondaryText] Adds a muted secondary text for the pill, appears before the main value. */
	secondaryText: PropTypes.string,
	/** @property {Boolean} [target] When an `href` is supplied, adds a target attribute, else is ignored. */
	target: PropTypes.string,
	/** @property {String} [value] The text to display inside the pill. */
	value: PropTypes.string
};

export default InnerPill;
