import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import XUIAvatar from '../avatar/XUIAvatar';
import {ns} from "../helpers/xuiClassNamespace";

class XUIInnerPill extends PureComponent {
	render() {
		const {
			avatarProps,
			href,
			onClick,
			qaHook,
			secondaryText,
			target,
			title,
			value
		} = this.props;

		const avatarClasses = avatarProps && cn(
			avatarProps.className,
			`${ns}-pill--avatar`
		);

		const avatarEl = avatarProps && <XUIAvatar {...avatarProps} className={avatarClasses} />;
		const secondaryTextEl = secondaryText && <span className={`${ns}-color-grey-muted ${ns}-pill--secondary`}>{secondaryText}</span>;
		const valueEl = value && <span className={`${ns}-pill--text`}>{value}</span>;

		const className = cn(
			`${ns}-pill--content`,
			!href && `${ns}-pill--button`
		);
		const innerPillQaHook = qaHook && `${qaHook}--inner`;
		const contents = (
			<Fragment>
				{avatarEl}
				{secondaryTextEl}
				{valueEl}
			</Fragment>
		);

		return (href || onClick) ? (
			<XUIButton
				className={className}
				isLink={!!href}
				href={href}
				target={target}
				title={title}
				variant="unstyled"
				onClick={onClick}
				qaHook={innerPillQaHook}
			>
				{contents}
			</XUIButton>
		): (
			<span className={className} data-automationid={innerPillQaHook}>
				{contents}
			</span>
		);
	}
}

XUIInnerPill.propTypes = {
	/** Props for the avatar to be displayed, must adhere to the XUIAvatar component API described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing props will omit the avatar entirely. */
	avatarProps: PropTypes.object,
	/** This will make the value an `anchor` element instead of a `span` element and adds the href as the link. */
	href: PropTypes.string,
	/** Callback to fire when the main pill content is clicked. */
	onClick: PropTypes.func,
	/**`. */
	qaHook: PropTypes.string,
	/** Adds a muted secondary text for the pill, appears before the main value. */
	secondaryText: PropTypes.string,
	/** When an `href` is supplied, adds a target attribute, else is ignored. */
	target: PropTypes.string,
	/** The title attribute to apply on the pill. */
	title: PropTypes.string,
	/** The text to display inside the pill. */
	value: PropTypes.string
};

export default XUIInnerPill;
