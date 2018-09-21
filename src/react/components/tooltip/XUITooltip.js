import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uuidv4 from 'uuid/v4';

import compose from '../helpers/compose';
import PositioningInline from '../positioning/PositioningInline';
import { positionOptions } from '../positioning/private/constants';
import { ns } from '../helpers/xuiClassNamespace';

import '../../../sass/7-components/_usermessaging.tooltip.scss';

const baseClass = `${ns}-tooltip`;

export default class XUITooltip extends PureComponent {
	state = {
		isHidden: this.props.isHidden,
		isFocused: false,
		isAnimating: false,
	};
	tooltipId = this.props.id || uuidv4();

	/**
	 * Show the tooltip.
	 *
	 * @public
	 * @param {Boolean} isClick
	 */
	openTooltip = isClick => {
		const { isDisabled, openDelay, onOpen } = this.props;
		if (isDisabled) {
			return;
		}
		// No delay for click open/close or if it's already animating.
		const delay = (isClick === true || this.state.isAnimating) ? 0 : openDelay;
		this.handleOpenClose(delay, true, onOpen);
	};

	/**
	 * Hide the tooltip
	 *
	 * @public
	 * @param {Boolean} isClick
	 */
	closeTooltip = isClick => {
		const { closeDelay, onClose } = this.props;
		// No delay for click open/close or if it's already animating.
		const delay = (isClick === true || this.state.isAnimating) ? 0 : closeDelay;
		this.handleOpenClose(delay, false, onClose);
	};

	/**
	 * Hide the tooltip
	 *
	 * @public
	 * @param {Number} delay
	 * @param {Boolean} isOpening // false for a close action
	 * @param {Function} callBack // If provided by the consumer, a function to call on open/close.
	 */
	handleOpenClose = (delay, isOpening, callBack) => {
		window.clearTimeout(this.animationStartTimer);
		this.animationStartTimer = setTimeout(() => {
			window.clearTimeout(this.animationFinishTimer);
			callBack && callBack();
			this.setState({
				isHidden: !isOpening,
				isAnimating: true,
			});
			this.animationFinishTimer = setTimeout(() => {
				this.setState({
					isAnimating: false,
				});
			}, 100); // 100ms is the current animation time.
		}, delay);
	};

	/**
	 * A convenience method to toggle the visibility of the tooltip.
	 *
	 * @public
	 */
	toggle = () => {
		this.state.isHidden ? this.openTooltip(true) : this.closeTooltip(true);
	};

	/**
	 * If user hits enter on the trigger, we may want to open and/or toggle the tooltip.
	 *
	 * @private
	 * @memberof XUITooltip
	 */
	onTriggerKeyDown = event => {
		if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
			this.toggle();
		}
	};

	componentDidMount = () => {
		const { trigger } = this;
		const rootNode = (trigger && (trigger.rootNode || trigger.input)) || trigger;
		if (!rootNode) {
			return;
		}
		const { display } = window.getComputedStyle(rootNode);
		this.triggerIsInline = /inline/.test(display);
	};

	render() {
		const {
			children,
			qaHook,
			className,
			trigger,
			wrapperClassName,
			isDisabled,
			triggerOnFocus,
			triggerOnBlur,
			triggerOnClick,
			triggerOnHover,
		} = this.props;
		const { isHidden, isAnimating, isFocused } = this.state;
		const ignoreFocus = !this.state.isFocused || !triggerOnFocus;

		if (triggerOnFocus) {
			if (isFocused && isHidden) {
				this.openTooltip();
			} else if (!isFocused && !isHidden) {
				this.closeTooltip();
			}
		}

		const wrapperClasses = cn(
			wrapperClassName,
			baseClass,
			this.state.isFocused && `${ns}-has-focused-trigger`,
			this.triggerIsInline && `${ns}-has-inline-trigger`,
			isDisabled && `${ns}-is-disabled`,
			!isHidden && `${baseClass}-tipopen`,
			isAnimating && `${baseClass}-tipanimating`,
		);

		const tipClasses = cn(
			className,
			`${baseClass}--tip`,
			!isHidden && `${baseClass}--tip-open`,
			isAnimating && `${baseClass}--tip-animating`,
		);
		const triggerHasOwnHandlers = trigger.props.onClick || trigger.props.onKeyDown;

		const clonedTrigger = React.cloneElement(trigger, {
			'ref': compose(trigger.ref, c => this.trigger = c),
			// NB: We'll defer to any handlers attached to the trigger, cancelling tooltip behavior.
			// TODO: Properly handle click and keydown behavior that isn't from a prop (eg. anchors).
			'onClick': triggerHasOwnHandlers ?
				trigger.props.onClick :
				(triggerOnClick && ignoreFocus && this.toggle) || undefined,
			'onKeyDown': triggerHasOwnHandlers ?
				trigger.props.onKeyDown :
				(triggerOnClick && this.onTriggerKeyDown) || undefined,
			'onFocus': compose(
				trigger.props.onFocus,
				() => this.setState({ isFocused: true }),
			),
			'onBlur': triggerOnBlur
				? compose(
					trigger.props.onBlur,
					() => this.setState({ isFocused: false }),
				)
				: undefined,
			'onMouseOver': triggerOnHover ? this.openTooltip : undefined,
			'onMouseOut': triggerOnHover && ignoreFocus ? this.closeTooltip : undefined,
			'aria-describedby': this.tooltipId,
		});

		return (
			<span
				className={wrapperClasses}
				ref={c => this.setState({ wrapper: c })}
			>
				{clonedTrigger}
				<PositioningInline
					{...this.props}
					parentRef={this.state.wrapper}
					isVisible={!this.state.isHidden}
				>
					<span
						role="tooltip"
						aria-hidden={this.state.isHidden}
						id={this.tooltipId}
						className={tipClasses}
						data-automationid={qaHook && `${qaHook}--tooltip`}
					>
						{children}
					</span>
				</PositioningInline>
			</span>
		);
	}
}

XUITooltip.propTypes = {
	children: PropTypes.node,
	qaHook: PropTypes.string,
	className: PropTypes.string,
	wrapperClassName: PropTypes.string,

	/** DOM ID of the tooltip */
	id: PropTypes.string,

	/** Whether or not this component is hidden on initial render. */
	isHidden: PropTypes.bool,

	/** Callback that gets triggered when the tooltip begins opening */
	onOpen: PropTypes.func,

	/** Callback that gets triggered when the tooltip has finished closing */
	onClose: PropTypes.func,

	/** Delay in ms for opening the tooltip. Defaults to 500 */
	openDelay: PropTypes.number,
	/** Delay in ms for closing the tooltip. Defaults to 100 */
	closeDelay: PropTypes.number,

	/** Element used to trigger the tooltip opening/closing */
	trigger: PropTypes.element.isRequired,

	/** Setting a number here will force the maximum width of the tooltip to be the
	 * number provided (in pixels). */
	maxWidth: PropTypes.number,

	/** Setting a number here will force the maximum height of the tooltip to be the
	 * number provided (in pixels). */
	maxHeight: PropTypes.number,

	/** Whether clicking on the trigger should toggle the tooltip open/closed. Defaults to false. */
	triggerOnClick: PropTypes.bool,

	/** Whether giving focus to the trigger should toggle the tooltip open/closed.
	 * Defaults to false. */
	triggerOnFocus: PropTypes.bool,

	/** Whether focusing off the trigger should change the tooltip to closed. Defaults to true. */
	triggerOnBlur: PropTypes.bool,

	/** Whether hovering over the trigger should toggle the tooltip open/closed.
	 * Defaults to true. */
	triggerOnHover: PropTypes.bool,

	/** Allow the tooltip to be disabled, for cases of disabled inputs, narrow viewport etc. */
	isDisabled: PropTypes.bool,

	/** Force the desktop UI, even if the viewport is narrow enough for mobile. */
	isNotResponsive: PropTypes.bool,

	/**
	 * Preferred side of the trigger and alignment in relation to the trigger for showing the tip.
	 * This will potentially be over-ridden by dimensions of the viewport and tip contents.
	 * Providing only the side (top, right, bottom, left) will default to a center-aligned tip.
	 */
	preferredPosition: PropTypes.oneOf(positionOptions),
};

XUITooltip.defaultProps = {
	isHidden: true,
	isDisabled: false,
	triggerOnClick: false,
	triggerOnFocus: false,
	triggerOnBlur: true,
	triggerOnHover: true,
	maxWidth: 220,
	openDelay: 500,
	closeDelay: 100,
	preferredPosition: 'top',
};
