import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import crossSmall from '@xero/xui-icon/icons/cross-small';

import XUIIcon from '../icon/XUIIcon';
import XUIButton from '../button/XUIButton';
import XUIInnerPill from './XUIInnerPill';
import XUITooltip from '../tooltip/XUITooltip';
import { baseClass, sizeClasses } from './private/constants';

function shouldShowTooltip(domElement) {
	return domElement && domElement.clientWidth < domElement.scrollWidth;
}

export default class XUIPill extends PureComponent {
	state = {
		isFocused: false,
		hasTooltip: false,
	};

	_innerPill = React.createRef();
	_tooltip = React.createRef();

	componentDidMount() {
		const innerPillElement = this._innerPill && this._innerPill.current;
		const shouldHaveToolTip = this.state.hasTooltip === false && shouldShowTooltip(innerPillElement);

		if (shouldHaveToolTip) {
			this.setState({
				hasTooltip: true,
			});
		}
	}

	toggleFocus = () => {
		this.setState(prevState => ({
			isFocused: !prevState.isFocused,
		}), () => {
			if (this.state.isFocused && this.state.hasTooltip) {
				this._tooltip.current.openTooltip();
			} else if (this.state.hasTooltip) {
				this._tooltip.current.closeTooltip();
			}
		});
	}

	hoverHandler = () => {
		if (this.state.hasTooltip) {
			this._tooltip.current.openTooltip();
		}
	}

	blurHandler = () => {
		if (this.state.hasTooltip) {
			this._tooltip.current.closeTooltip();
		}
	}

	render() {
		const {
			avatarProps,
			className,
			deleteButtonLabel,
			href,
			isInvalid,
			onClick,
			onDeleteClick,
			qaHook,
			secondaryText,
			target,
			title,
			value,
			isMaxContentWidth,
			size,
			debugShowToolTip,
		} = this.props;

		const {
			isFocused,
			hasTooltip,
		} = this.state;

		const pillClasses = cn(
			className,
			baseClass,
			!isMaxContentWidth && `${baseClass}-maxwidth`, // TODO: Remove
			size && sizeClasses[size],
			isInvalid && `${baseClass}-is-invalid`,
			isFocused && `${baseClass}-is-focused`,
			onDeleteClick && `${baseClass}-is-deletable`,
			(avatarProps != null || isInvalid) && `${baseClass}-has-avatar`,
			(href || onClick) && `${baseClass}-interactive`,
		);

		const deleteButton = onDeleteClick && (
			<XUIButton
				size={size}
				className={`${baseClass}--button-icon`}
				variant={isInvalid ? 'icon-inverted' : 'icon'}
				onClick={onDeleteClick}
				title={deleteButtonLabel}
				aria-label={deleteButtonLabel}
				qaHook={qaHook && `${qaHook}--delete`}
			>
				<XUIIcon icon={crossSmall} />
			</XUIButton>
		);

		const content = (
			<div
				className={pillClasses}
				onFocus={this.toggleFocus}
				onBlur={this.toggleFocus}
				onMouseEnter={this.hoverHandler}
				onMouseLeave={this.blurHandler}
				data-automationid={qaHook}
			>
				<XUIInnerPill
					innerPillRef={this._innerPill}
					{...{
						avatarProps,
						href,
						isInvalid,
						onClick,
						qaHook,
						secondaryText,
						target,
						title,
						value,
						size,
					}}
				/>
				{deleteButton}
			</div>
		);

		if (hasTooltip || debugShowToolTip) {
			return (
				<XUITooltip
					// Extra wrapping div required because tooltip has CSS that stomps on first child
					trigger={<div>{content}</div>}
					isHidden={!debugShowToolTip}
					ref={this._tooltip}
					id={debugShowToolTip && 'tooltipDebugId'}
				>
					{secondaryText}
					{secondaryText && value ? <br /> : null}
					{value}
				</XUITooltip>
			);
		}

		return content;
	}
}

XUIPill.defaultProps = {
	deleteButtonLabel: 'Delete',
	size: 'standard',
};

XUIPill.propTypes = {
	/** Props for the avatar to be displayed, must adhere to the XUIAvatar component API described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing props will omit the avatar entirely. */
	avatarProps: PropTypes.object,
	/** Apply classes to the outer Pill `div` element. */
	className: PropTypes.string,
	/** Specify an alternate label attribute for the delete button, defaults to 'Delete'. */
	deleteButtonLabel: PropTypes.string,
	/** This will make the value an `anchor` element instead of a `span` element and adds the
	 * href as the link. */
	href: PropTypes.string,
	/** When invalid, displays the text in a red colour. */
	isInvalid: PropTypes.bool,
	/** Callback to fire when the main pill content is clicked. */
	onClick: PropTypes.func,
	/** Callback to fire when the delete pill button is clicked. When omitted, the delete button
	 * is also ommitted from the view. */
	onDeleteClick: PropTypes.func,
	/** add a qahook to the component */
	qaHook: PropTypes.string,
	/** When an `href` is supplied, adds a target attribute, else is ignored. */
	target: PropTypes.string,
	/** The title attribute to apply on the pill. */
	title: PropTypes.string,
	/** Adds a muted secondary text for the pill, appears before the main value. */
	secondaryText: PropTypes.string,
	/** The text to display inside the pill. */
	value: PropTypes.string,
	/** Whether the pill shouldn't have a set max-width */
	isMaxContentWidth: PropTypes.bool,
	/** The size of the pill to render */
	size: PropTypes.oneOf(Object.keys(sizeClasses)),
	/**
	 * @ignore
	 * Dev / debug prop to show the tooltip initially on mount instead of based on a user event */
	debugShowToolTip: PropTypes.bool,
};
