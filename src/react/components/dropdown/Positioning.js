import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import verge from 'verge';
import throttle from 'lodash.throttle';
import Portal from 'react-portal';
import cn from 'classnames';
import breakpoints from './private/breakpoints';


/**
 * Tests the height and width of the given rectangle and returns true if the size is greater than 0x0
 *
 * @private
 * @param {DOMRect} baseRect
 * @return {boolean}
 */
const isBaseRendered = baseRect => baseRect && baseRect.height > 0 && baseRect.width > 0;

/**
* Tests the viewport against a narrow width.
*
* @private
* @return {boolean}
*/
const isNarrowViewport = () => verge.viewportW() < breakpoints.narrow;

/**
* Calculates the space below the trigger
*
* @private
* @param {DOMRect} triggerRect
* @return {Number}
*/
const calcSpaceBelow = triggerRect => triggerRect && verge.viewportH() - triggerRect.top - triggerRect.height;

/**
* Calulates the space above the trigger
*
* @private
* @param {DOMRect} triggerRect
* @return {Number}
*/
const calcSpaceAbove = triggerRect => triggerRect.top;

/**
* Tests if the base can be rendered under the trigger at all.
*
* @private
* @param {DOMRect} triggerRect
* @param {DOMRect} popupRect
* @param {Number} gutter
* @return {Boolean}
*/
const canAlignUnderTrigger = (triggerRect, popupRect, gutter) => popupRect.height + gutter < calcSpaceBelow(triggerRect);

/**
* Returns the top scroll amount, supported across mutliple browsers
*
* @private
* @return {Number}
*/
const scrollTopAmount = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

/**
* Returns the left scroll amount, supported across mutliple browsers
*
* @private
* @return {Number}
*/
const scrollLeftAmount = () => window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0

/**
* Tests if the bottom space is greater than the top around the trigger.
*
* @private
* @param {DOMRect} triggerRect
* @return {Boolean}
*/
const isBottomBiggerThanTop = triggerRect => {
	const spaceAbove = calcSpaceAbove(triggerRect);
	const spaceBelow = calcSpaceBelow(triggerRect);

	return spaceBelow > spaceAbove;
}

/**
 * Listeners to attach to window
 *
 * @private
 * @param {Positioning} popup
 */
function attachListeners(popup) {
	window.addEventListener('resize', popup.positionComponent);
	window.addEventListener('scroll', popup.positionComponent);
	if (popup.props.setMaxHeight) {
		window.addEventListener('resize', popup.calculateMaxHeight)
	}
}

/**
 * Listeners to detach from window
 *
 * @private
 * @paramn {Positioning} popup
 */
function detachListeners(popup) {
	window.removeEventListener('resize', popup.positionComponent);
	window.removeEventListener('scroll', popup.positionComponent);
	window.removeEventListener('resize', popup.calculateMaxHeight)
}

/**
 * @private
 * Calculates the base position and adds it to state, including a flag so we know the calculations have been done.
 *
 * @param {Object} popupRect
 * @param {Object} triggerRect
 * @param {Positioning} popup
 */
function alignBaseWithTrigger(popupRect, triggerRect, popup) {
	const { gutter } = popup.props;

	// If there's not enough space below the trigger and there's more space above the trigger than below, render above
	const alignTop = !isBottomBiggerThanTop(triggerRect) && !canAlignUnderTrigger(triggerRect, popupRect, gutter);
	const alignRight = verge.viewportW() - popupRect.width < triggerRect.left + gutter;

	const positionBelowTrigger = triggerRect.top + triggerRect.height;
	const positionAboveTrigger = triggerRect.top - popupRect.height;
	const triggerOffsetTop = (alignTop ? positionAboveTrigger: positionBelowTrigger) + scrollTopAmount();

	const positionRightOfTrigger = triggerRect.left + triggerRect.width - popupRect.width;
	const positionLeftOfTrigger = triggerRect.left;
	const triggerOffsetLeft = (alignRight ? positionRightOfTrigger : positionLeftOfTrigger) + scrollLeftAmount();

	popup.setState({
		left: triggerOffsetLeft,
		top: triggerOffsetTop,
		alignTop: alignTop
	});
}

/**
* Aligns the popup to the very top left of the viewport, commonly useful for narrow viewport widths.
*
* @private
* @param {Positioning} popup
*/
function alignTopLeft(popup) {
		popup.setState({
			left: 0,
			top: 0
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
		if (popup.props.setMaxHeight) {
			popup.calculateMaxHeight();
		}
		// Tell the render method it's OK to render without "visibility: hidden"
		popup.setState({
			positioned: true
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
		left: 0,
		alignTop: false,
		maxHeight: 0,
		positioned: false
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
	if (!popup.props.renderHidden && !popup.state.positioned) {
		return {
			visibility: 'hidden',
			position: 'fixed',
			top: 0,
			left: 0,
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

		popup.positionComponent = throttle(popup.positionComponent.bind(popup), 100, { trailing: true });
		popup.calculateMaxHeight = throttle(popup.calculateMaxHeight.bind(popup), 100, { trailing: true });
	}

	componentWillUnmount() {
		// Safety cleanup
		detachListeners(this);
	}

	/**
	 * Calculate positioning of the popup if the trigger is rendered.
	 */
	positionComponent() {
		const popup = this;
		const { parentRef } =  popup.props;

		if (parentRef) {
			const triggerDOM = parentRef.firstChild;
			const baseRect =  popup.positionEl && popup.positionEl.firstChild.getBoundingClientRect();

			if (isBaseRendered(baseRect) && verge.inViewport(triggerDOM)) {
				isNarrowViewport() ? alignTopLeft(popup) : alignBaseWithTrigger(baseRect, triggerDOM.getBoundingClientRect(), popup);
			}
		}
	}

	/**
	 * Given we're rendering in the greatest whitespace, we need to work out if a maxHeight should be added to the popup
	 * in order for the full popup to show its content and scroll.
	 */
	calculateMaxHeight() {
		const popup = this;
		const { gutter, parentRef } = popup.props;
		const triggerDOM = parentRef.firstChild;

		if (verge.inViewport(triggerDOM)) {
			const triggerRect = triggerDOM.getBoundingClientRect();

			const spaceAbove = calcSpaceAbove(triggerRect);
			const spaceBelow = calcSpaceBelow(triggerRect);

			popup.setState({
				maxHeight: isNarrowViewport() ? verge.viewportH() : Math.max(spaceAbove, spaceBelow) - gutter
			});
		}
	}

	componentDidUpdate(prevProps) {
		const {props, state} = this;

		// If the popup is going from hidden to visible but hasn't been positioned yet, the render method will ensure
		// that everything is rendered with "visibility: hidden".  Wait a bit to make sure all children also render,
		// then measure things and position the popup correctly on the screen.
		if (!props.renderHidden && !state.positioned) {
			setTimeout(positionOnShow, 100, this);
		}

		// In order to ensure that the event listeners are properly attached based on a potentially changing
		// setMaxHeight prop when visible and detached when hidden, we'll need to unconditionally detach then reattach
		// if visible here.
		detachListeners(this);
		if (!props.renderHidden) {
			attachListeners(this);
		}

		// If we're hiding the popup, reset the state to defaults so that the next show event will properly reposition
		// everything.
		if (!prevProps.renderHidden && props.renderHidden) {
			this.setState(getDefaultState());
		}
	}

	/**
	 * @public
	 * Uses internal state to work out inline styles and returns them.
	 *
	 * @return {{position: string}}
	 */
	getStyles() {
		const { maxHeight, left, top } = this.state;

		return {
			maxHeight,
			left,
			top
		};
	}

	render() {
		const popup = this;
		const { children, renderHidden } = popup.props;
		const { positioned } = popup.state;
		const positioningStyles = getPositionCalculationStyles(popup);
		const clonedChildren = renderHidden || !positioned ? children : React.cloneElement(children, {
			className : cn( children.props.className, { 'dropdown-positionabove' : popup.state.alignTop } ),
			style : popup.getStyles()
		});

		return (
			<Portal isOpened={!renderHidden} onOpen={popup.positionComponent}>
				<div style={positioningStyles} ref={portal => popup.positionEl = portal}>
					{clonedChildren}
				</div>
			</Portal>
		);
	}
}

Positioning.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	/** @property {renderHidden} true when the component is rendered but not displayed */
	renderHidden: PropTypes.bool,
	/** @property {parentRef} A DOM object of the parent node. */
	parentRef: PropTypes.object,
	/** @property {gutter} A buffer value added to measure between the edge of the viewport and the component before flipping its position. */
	gutter: PropTypes.number,
	/** @property {setMaxHeight} A max height will mean an overflowed popup will scroll for the user rather than render outside of the viewport. True by default. */
	setMaxHeight: PropTypes.bool
};

Positioning.defaultProps = {
	gutter: 20,
	setMaxHeight: true
};

export default Positioning;
