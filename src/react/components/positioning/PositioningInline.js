import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import verge from 'verge';
import '../helpers/xuiGlobalChecks';
import Positioning from './Positioning';
import {
	isNarrowViewport,
	getSpacesAroundTrigger,
	isBaseRendered,
} from './private/dom-helpers';
import { positionOptions } from './private/constants';
import { alignBaseWithTrigger, getPreferredPosition } from './private/utils';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-positioningInline`;

class PositioningInline extends Positioning {
	componentDidMount() {
		// Pushing this to the end of the queue seems to give styles enough time
		// to be applied before doing the positioning calculations.
		setTimeout(() => { this.positionComponent(); }, 0);
	}

	componentDidUpdate() {
		const { props } = this;
		// TODO: Investigate whether setState can be avoided here
		this.setState({// eslint-disable-line
			maxHeight: null,
			maxWidth: null,
			marginLeft: null,
			marginRight: null,
			width: null,
		});

		if (props.isVisible) {
			this.positionComponent();
		} else {
			this.calculateMaxDimensions();
		}
	}

	/**
	 * Calculate positioning of the popup if the trigger is rendered.
	 *
	 * @public
	 */
	positionComponent = () => {
		const { parentRef } = this.props;

		if (parentRef != null) {
			const triggerDOM = parentRef.firstChild;
			const baseRect = this.positionEl && this.positionEl.firstChild.getBoundingClientRect();

			if (isBaseRendered(baseRect)) {
				alignBaseWithTrigger(baseRect, triggerDOM, this);
				this.calculateMaxDimensions(baseRect);
			}
		}
	}

	/**
	 * Uses the viewport and trigger element to determine the available space in which to display a
	 * popup element such as a tooltip or dropdown.
	 * Also applies any consumer-supplied maxHeight/maxWidth.
	 *
	 * @public
	 * @param {Object} popupRect
	 *
	 */
	calculateMaxDimensions = popupRect => {
		const baseRect = popupRect ||
			(this.positionEl && this.positionEl.firstChild.getBoundingClientRect());
		const {
			viewportGutter,
			parentRef,
			triggerDropdownGap,
			maxHeight,
			maxWidth,
			preferredPosition,
			shouldRestrictMaxHeight,
		} = this.props;
		const { positionVertically } = getPreferredPosition(preferredPosition);
		const triggerDOM = parentRef != null && parentRef.firstChild;

		if (isBaseRendered(baseRect) && triggerDOM != null && verge.inViewport(triggerDOM)) {
			if (!this.props.isNotResponsive && isNarrowViewport()) {
				// For mobile or very small screens, offer the full viewport, as max. Figure positioning later.
				const viewportH = verge.viewportH();
				const viewportW = verge.viewportW();
				this.setState({
					maxHeight: maxHeight ? Math.min(viewportH, maxHeight) : viewportH,
					maxWidth: maxWidth ? Math.min(viewportW, maxWidth) : viewportW,
				});
			} else {
				const triggerRect = triggerDOM.getBoundingClientRect();
				const spaces = getSpacesAroundTrigger(triggerRect);
				const maxDimensions = {
					maxHeight,
					maxWidth,
				};
				if (positionVertically) {
					if (shouldRestrictMaxHeight) {
						// Get viewport size either above or below, minus gutters.
						const largerVerticalSpace =
							Math.max(spaces.above, spaces.below) - viewportGutter - triggerDropdownGap;
						maxDimensions.maxHeight = maxHeight
							? Math.min(largerVerticalSpace, maxHeight)
							: largerVerticalSpace;
					} else {
						maxDimensions.maxHeight = null;
					}

					// Widest the tip could be in any alignment.
					const possibleCenteredSize = Math.min(spaces.left, spaces.right) * 2;
					const largestAvailableWidth =
						Math.max(spaces.left, spaces.right, possibleCenteredSize) + triggerRect.width;
					if (maxWidth === -1) {
						maxDimensions.maxWidth = null;
					} else {
						maxDimensions.maxWidth = maxWidth
							? Math.min(largestAvailableWidth, maxWidth)
							: largestAvailableWidth;
					}
				} else {
					// Get viewport size to the left or right, minus gutters.
					const largerHorizontalSpace =
						Math.max(spaces.left, spaces.right) - viewportGutter - triggerDropdownGap;
					maxDimensions.maxWidth = maxWidth
						? Math.min(largerHorizontalSpace, maxWidth)
						: largerHorizontalSpace;

					// Tallest the tip could be in any alignment.
					const possibleCenteredSize = Math.min(spaces.above, spaces.below) * 2;
					const largestAvailableHeight =
						Math.max(spaces.above, spaces.below, possibleCenteredSize) + triggerRect.height;
					maxDimensions.maxHeight = maxHeight
						? Math.min(largestAvailableHeight, maxHeight)
						: largestAvailableHeight;
				}
				this.setState(maxDimensions);
			}
		}
	};

	// Disable maxlen for JSDoc object definition
	/* eslint-disable max-len */
	/**
	 * Uses internal state to work out inline styles and returns them.
	 *
	 * @return {{ maxHeight: Number, maxWidth: Number, width: Number, marginLeft: Number, marginRight: Number }}
	 */
	getStyles = () => {
		const { maxHeight, maxWidth, side, alignment } = this.state;
		const { isTriggerWidthMatched, parentRef, isNotResponsive, isVisible } = this.props;

		const isMobile = isNarrowViewport() && !isNotResponsive;
		let width = null;
		let newMaxWidth = maxWidth;
		if (isTriggerWidthMatched && !isMobile && (parentRef != null) && (parentRef.firstChild != null)) {
			({ width } = parentRef.firstChild.getBoundingClientRect());
			newMaxWidth = null;
		}
		let marginLeft = null;
		let marginRight = null;
		if (isVisible) {
			// NB: Negative horizontal margins allow content to stretch to the max-width. This has
			// a similar effect to width: max-content, but works in all tested browsers, when
			// combined with the positioning + translate offsets used for centering in the CSS.
			const maxMargin = this.props.maxWidth && newMaxWidth ?
				Math.max(this.props.maxWidth, newMaxWidth) :
				newMaxWidth || this.props.maxWidth;
			if (side === 'left' || alignment === 'right') {
				marginLeft = -1 * maxMargin;
			} else {
				marginRight = -1 * maxMargin;
			}
		}
		return {
			maxHeight: isMobile ? null : maxHeight,
			width,
			marginLeft,
			marginRight,
			maxWidth: newMaxWidth,
		};
	};
	/* eslint-enable maxl-len */

	render() {
		const { children, qaHook, className } = this.props;
		const { side, alignment, topOffset, isHorizontal } = this.state;
		const sideAlignClassName = side ? `${baseClass}--content-${side}${alignment}` : '';
		const childClasses = cn(children.props.className, sideAlignClassName);
		const wrapperClasses = cn(baseClass, className);

		const clonedChildren = React.cloneElement(children, {
			className: childClasses,
			style: this.getStyles(),
		});

		return (
			<span
				className={wrapperClasses}
				data-automationid={qaHook}
				ref={c => this.positionEl = c}
				style={{ top: topOffset, flexDirection: isHorizontal ? 'row' : 'column' }}
			>
				{clonedChildren}
			</span>
		);
	}
}

PositioningInline.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string,
	/** true when the component is rendered but not displayed */
	isVisible: PropTypes.bool,
	/** A DOM object of the parent node. */
	parentRef: PropTypes.object,
	/** A buffer value added to measure between the edge of the viewport and the
	 * component before flipping its position. */
	viewportGutter: PropTypes.number,
	/** A max height will mean an overflowed popup will scroll for the user rather
	 * than render outside of the viewport. True by default. */
	shouldRestrictMaxHeight: PropTypes.bool,
	/** Force the desktop UI, even if the viewport is narrow enough for mobile. */
	isNotResponsive: PropTypes.bool,
	/** The amount of space to put between the trigger and the dropdown */
	triggerDropdownGap: PropTypes.number,
	/** Callback for when the positioned element becomes visible  */
	onVisible: PropTypes.func,
	/** Setting to true will for the dropdown to be as wide as the trigger. */
	isTriggerWidthMatched: PropTypes.bool,
	/**
	 * Setting a number here will force the maximum size of the child to be the number
	 * provided (in pixels). When the viewport is smaller than this number, it still
	 * shrinks, but never grows beyond that number. Setting either to -1 will set the value to null.
	 */
	maxHeight: PropTypes.number,
	maxWidth: PropTypes.number,
	/**
	 * Preferred side of the trigger and alignment in relation to the trigger for showing the tip.
	 * This will potentially be over-ridden by dimensions of the viewport and tip contents.
	 * Providing only the side (top, right, bottom, left) will default to a center-aligned tip.
	 */
	preferredPosition: PropTypes.oneOf(positionOptions),
	/**
	 * Limit positioning to standard dropdown behaviour. The positioned element will only show above
	 * or below the trigger (never to the side), and will be flush to the left or right of the
	 * trigger (never centered).
	 */
	useDropdownPositioning: PropTypes.bool,
};

PositioningInline.defaultProps = {
	viewportGutter: 10,
	shouldRestrictMaxHeight: true,
	isNotResponsive: false,
	triggerDropdownGap: 10,
	isTriggerWidthMatched: false,
	preferredPosition: 'bottom',
};

export default PositioningInline;
