import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import verge from 'verge';
import Portal from 'react-portal';
import debounce from 'lodash.debounce';
import cn from 'classnames';
import {
	isNarrowViewport,
	calcSpaceAbove,
	calcSpaceBelow,
	calcSpaceRight,
	calcSpaceLeft,
	scrollTopAmount,
	scrollLeftAmount,
	isBaseRendered,
	attachListeners,
	detachListeners,
} from './private/dom-helpers';

/**
 * @private
 * Calculates the base position and adds it to state, including a flag so we know the calculations have been done.
 *
 * @param {Object} popupRect
 * @param {Object} triggerRect
 * @param {Positioning} popup
 */
function alignBaseWithTrigger(popupRect, triggerRect, popup) {
	const { viewportGutter, triggerDropdownGap } = popup.props;
	const spaceAboveTrigger = calcSpaceAbove(triggerRect);
	const spaceBelowTrigger = calcSpaceBelow(triggerRect);
	const spaceLeftOfTrigger = calcSpaceLeft(triggerRect);
	const spaceRightOfTrigger = calcSpaceRight(triggerRect);

	const canGoBelow = popupRect.height <= spaceBelowTrigger - viewportGutter - triggerDropdownGap;
	const canAlignLeftEdge = popupRect.width <= spaceRightOfTrigger + triggerRect.width - viewportGutter - triggerDropdownGap;

	const placeBelow = canGoBelow || spaceBelowTrigger >= spaceAboveTrigger;
	const alignLeftEdge = canAlignLeftEdge || spaceRightOfTrigger >= spaceLeftOfTrigger;

	const popupLeftPos = alignLeftEdge
		? Math.max(triggerRect.left, viewportGutter)
		: Math.min(Math.max(triggerRect.right - popupRect.width, viewportGutter), verge.viewportW() - popupRect.width - viewportGutter);

	const translateX = isNarrowViewport()
		? '0px'
		: `${Math.floor(popupLeftPos + scrollLeftAmount())}px`
	const translateY = placeBelow
		? `${triggerRect.height}px`
		: '-100%';
	const translate = `translate(${translateX},${translateY})`;
	// Initially the gap offset here was done through css calc properties in the translate function. Unfortunately
	// this caused issues, as calc is invalid as a parameter of translate within IE11
	const topValue = placeBelow ?
		triggerRect.top + scrollTopAmount() + triggerDropdownGap
		: triggerRect.top + scrollTopAmount() - triggerDropdownGap;

	popup.setState({
		top: topValue,
		alignTop: !placeBelow,
		transform: translate,
		bottom: null,
	});
}

/**
* Aligns the popup to the very bottom left of the viewport, commonly useful for narrow viewport widths.
*
* @private
* @param {Positioning} popup
*/
function alignBottomLeft(popup) {
		popup.setState({
			bottom: 0,
			left: 0,
			maxHeight: null,
			transformY: null,
			top: null,
		});
}

/**
 * In order to ensure that measurements are taken after all children are rendered, we need to do a setTimeout inside
 * of the componentDidUpdate method.  This is the callback for that and will correctly position the element with a
 * computed maxHeight, if desired.
 *
 * @private
 * @param {Positioning} popup
 */
function positionOnShow(popup) {
	// Safety check due to slim chance of unmount during setTimeout duration
	if (popup.positionEl && document.body.contains(popup.positionEl)) {
		popup.positionComponent();
		if (popup.props.shouldRestrictMaxHeight) {
			popup.calculateMaxHeight();
		}
		// Tell the render method it's OK to render without "visibility: hidden"
		popup.setState({
			positioned: true,
		});
	}
}

/**
 * Create a copy of a clean, initial state of this component.  Used when setting state during construction and clearing
 * state when hiding the component.
 *
 * @private
 * @returns {{alignRight: boolean, alignTop: boolean, maxHeight: string, positioned: boolean}}
 */
function getDefaultState() {
	return {
		top: 0,
		transform: null,
		alignTop: false,
		maxHeight: verge.viewportH() * 0.99,
		positioned: false,
	};
}

/**
 * While we're calculating where the popup should go, it needs to have a set of styles which makes it invisible with
 * proper dimensions without affecting the layout of the page in general.  These styles will take care of that.
 *
 * @private
 * @param {Positioning} popup
 * @returns {Object|null}
 */
function getPositionCalculationStyles(popup) {
	if (popup.props.isVisible && !popup.state.positioned) {
		return {
			visibility: 'hidden',
			position: 'fixed',
			top: 0,
			transform: null,
			maxHeight: '99%',
			maxWidth: '99%'
		};
	}
	return null;
}

class Positioning extends PureComponent {
	constructor() {
		super();

		const popup = this;

		popup.state = getDefaultState();

		popup.positionComponent = popup.positionComponent.bind(popup);
		popup.calculateMaxHeight = popup.calculateMaxHeight.bind(popup);
		popup.resizeHandler = debounce(popup.positionComponent, 75, { leading: false, trailing: true });
	}

	componentDidMount() {
		if (this.props.isVisible) {
			attachListeners(this);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { props, state } = this;

		// If the popup is going from hidden to visible but hasn't been positioned yet, the render method will ensure
		// that everything is rendered with "visibility: hidden".  Wait a bit to make sure all children also render,
		// then measure things and position the popup correctly on the screen.
		if (props.isVisible && !state.positioned) {
			this._positionTimer = setTimeout(positionOnShow, 50, this);
		}

		if (!prevState.positioned && state.positioned && props.onVisible != null) {
			this._visibleTimer = setTimeout(props.onVisible, 50);
		}

		if (props.isVisible !== prevProps.isVisible) {
			if (!props.isVisible) {
				// If we're hiding the popup, reset the state to defaults so that the next show event will properly
				// reposition everything.
				this.setState(getDefaultState());
				detachListeners(this);

				// In case these haven't fired for some reason, kill them now to prevent errors
				clearTimeout(this._positionTimer);
				clearTimeout(this._visibleTimer);
			} else {
				attachListeners(this);
			}
		}

		if (prevProps.shouldRestrictMaxHeight !== props.shouldRestrictMaxHeight) {
			if (props.shouldRestrictMaxHeight) {
				this.calculateMaxHeight();
			} else {
				this.setState({
					maxHeight: null,
				});
			}
		}
	}

	componentWillUnmount() {
		detachListeners(this);
		clearTimeout(this._positionTimer);
		clearTimeout(this._visibleTimer);
	}

	/**
	 * Calculate positioning of the popup if the trigger is rendered.
	 *
	 * @public
	 */
	positionComponent() {
		const popup = this;
		const { parentRef } = popup.props;

		if (parentRef) {
			const triggerDOM = parentRef.firstChild;
			const baseRect = popup.positionEl && popup.positionEl.firstChild.getBoundingClientRect();

			if (isBaseRendered(baseRect)) {
				if (!popup.props.isNotResponsive && isNarrowViewport()) {
					alignBottomLeft(popup);
				} else {
					alignBaseWithTrigger(baseRect, triggerDOM.getBoundingClientRect(), popup);
				}
			}
		}
	}

	/**
	 * Given we're rendering in the greatest whitespace, we need to work out if a maxHeight should
	 * be added to the popup in order for the full popup to show its content and scroll.
	 *
	 * @public
	 */
	calculateMaxHeight() {
		const popup = this;
		const { viewportGutter, parentRef, triggerDropdownGap } = popup.props;
		const triggerDOM = parentRef.firstChild;

		if (verge.inViewport(triggerDOM)) {
			if (!popup.props.isNotResponsive && isNarrowViewport()) {
				popup.setState({
					maxHeight: verge.viewportH(),
				});
			} else {
				const triggerRect = triggerDOM.getBoundingClientRect();
				const spaceAboveTrigger = calcSpaceAbove(triggerRect);
				const spaceBelowTrigger = calcSpaceBelow(triggerRect);

				popup.setState({
					maxHeight: Math.max(spaceAboveTrigger, spaceBelowTrigger) - viewportGutter - triggerDropdownGap,
				});
			}
		}
	}

	/**
	 * Uses internal state to work out inline styles and returns them.
	 *
	 * @return {{ maxHeight: Number, left: Number, top: Number, transformY: String }}
	 */
	getStyles() {
		const { maxHeight, transform, top, bottom } = this.state;
		const { isTriggerWidthMatched, parentRef, isNotResponsive } = this.props;
		const isMobile = isNarrowViewport() && !isNotResponsive;
		let width = null;
		let maxWidth = null;
		if (isTriggerWidthMatched && !isMobile && parentRef != null && parentRef.firstChild != null) {
			width = parentRef.firstChild.getBoundingClientRect().width;
			maxWidth = 'none';
		}

		return {
			maxHeight: isMobile ? null : maxHeight,
			top,
			width,
			maxWidth,
			bottom,
			transform: isMobile ? '' : transform,
		};
	}

	render() {
		const popup = this;
		const { children, isVisible, qaHook } = popup.props;
		const { positioned } = popup.state;
		const positioningStyles = getPositionCalculationStyles(popup);
		const clonedChildren = !isVisible || !positioned ? children : React.cloneElement(children, {
			className : cn( children.props.className, { 'dropdown-positionabove' : popup.state.alignTop } ),
			style : popup.getStyles(),
		});

		return (
			<Portal isOpened={isVisible} onOpen={popup.positionComponent} >
				<div style={positioningStyles} ref={portal => popup.positionEl = portal} className="xui-container" data-automationid={qaHook}>
					{clonedChildren}
				</div>
			</Portal>
		);
	}
}

Positioning.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string,
	/**true when the component is rendered but not displayed */
	isVisible: PropTypes.bool,
	/**A DOM object of the parent node. */
	parentRef: PropTypes.object,
	/**A buffer value added to measure between the edge of the viewport and the component before flipping its position. */
	viewportGutter: PropTypes.number,
	/**A max height will mean an overflowed popup will scroll for the user rather than render outside of the viewport. True by default. */
	shouldRestrictMaxHeight: PropTypes.bool,
	/** Force the desktop UI, even if the viewport is narrow enough for mobile. */
	isNotResponsive: PropTypes.bool,
	/** The amount of space to put between the trigger and the dropdown */
	triggerDropdownGap: PropTypes.number,
	/** Callback for when the positioned element becomes visible  */
	onVisible: PropTypes.func,
	/** Setting to true will for the dropdown to be as wide as the trigger. */
	isTriggerWidthMatched: PropTypes.bool,
};

Positioning.defaultProps = {
	viewportGutter: 10,
	shouldRestrictMaxHeight: true,
	isNotResponsive: false,
	triggerDropdownGap: 5,
	isTriggerWidthMatched: false,
};

export default Positioning;
