import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import verge from 'verge';
import { Portal } from 'react-portal';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
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
  getTriggerNodeFromParentRef,
} from './private/dom-helpers';
import portalContainer from '../helpers/portalContainer';
import { ns } from '../helpers/xuiClassNamespace';

/**
 * @private
 * Calculates the base position and adds it to state, including a flag so we know the calculations
 * have been done.
 *
 * @param {Object} options.popupRect shape of the popup to position
 * @param {Object} options.triggerRect Shape of the trigger
 * @param {Number} options.viewportGutter Amount of space to put between the dropdown & the edge
 * of the viewport
 * @param {Number} options.triggerDropdownGap Amount of space to put between the trigger & dropdown
 * @param {Boolean} options.isNotResponsive Whether to enforce standard widescreen behaviour
 * @returns {Object}
 */
function getTriggerAlignmentStyles({
  popupRect,
  triggerRect,
  viewportGutter,
  triggerDropdownGap,
  isNotResponsive,
}) {
  const spaceAboveTrigger = calcSpaceAbove(triggerRect);
  const spaceBelowTrigger = calcSpaceBelow(triggerRect);
  const spaceLeftOfTrigger = calcSpaceLeft(triggerRect);
  const spaceRightOfTrigger = calcSpaceRight(triggerRect);

  const canGoBelow = popupRect.height <= spaceBelowTrigger - viewportGutter - triggerDropdownGap;
  const canAlignLeftEdge =
    popupRect.width <=
    spaceRightOfTrigger + triggerRect.width - viewportGutter - triggerDropdownGap;

  const placeBelow = canGoBelow || spaceBelowTrigger >= spaceAboveTrigger;
  const alignLeftEdge = canAlignLeftEdge || spaceRightOfTrigger >= spaceLeftOfTrigger;

  const popupLeftPos = alignLeftEdge
    ? Math.max(triggerRect.left, viewportGutter)
    : Math.min(
        Math.max(triggerRect.right - popupRect.width, viewportGutter),
        verge.viewportW() - popupRect.width - viewportGutter,
      );

  // Use `round` to cater for subpixel calculations
  // Tested in FF (osx), Chrome (osx), Safari (osx)
  const marginLeft =
    !isNotResponsive && isNarrowViewport()
      ? '0px'
      : `${Math.round(popupLeftPos + scrollLeftAmount())}px`;

  const translateYAmount = placeBelow ? `${triggerRect.height}px` : '-100%';
  const transform = `translateY(${translateYAmount})`;
  // Initially the gap offset here was done through css calc properties in the translate function.
  // Unfortunately this caused issues, as calc is invalid as a parameter of translate within IE11
  const topValue = placeBelow
    ? triggerRect.top + scrollTopAmount() + triggerDropdownGap
    : triggerRect.top + scrollTopAmount() - triggerDropdownGap;

  return {
    marginLeft,
    top: topValue,
    transform,
    bottom: null,
  };
}

const defaultState = {
  top: 0,
  transform: null,
  maxHeight: verge.viewportH() * 0.99,
  positioned: false,
  marginLeft: 0,
};

const stylesForCalculation = {
  visibility: 'hidden',
  position: 'fixed',
  top: 0,
  transform: null,
  maxHeight: '99%',
  maxWidth: '99%',
};

const stylesForBottomLeftPositioning = {
  bottom: 0,
  left: 0,
  maxHeight: null,
  top: null,
  marginLeft: 0,
};

class Positioning extends PureComponent {
  state = { ...defaultState };

  ticking = false;

  componentDidMount() {
    const popup = this;
    if (popup.props.isVisible) {
      attachListeners(popup);
      popup.positionComponent();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isVisible, onVisible, shouldRestrictMaxHeight } = this.props;
    const { positioned } = this.state;

    // If the popup is going from hidden to visible but hasn't been positioned yet, the render
    // method will ensure that everything is rendered with "visibility: hidden".
    // Wait a bit to make sure all children also render, then measure things and position the
    // popup correctly on the screen.
    if (isVisible && !positioned) {
      this._positionTimer = setTimeout(this.positionOnShow, 50, this);
    }

    if (!prevState.positioned && positioned && onVisible != null) {
      this._visibleTimer = setTimeout(onVisible, 50);
    }
    /* eslint-disable react/no-did-update-set-state */
    if (isVisible !== prevProps.isVisible) {
      if (!isVisible) {
        // If we're hiding the popup, reset the state to defaults so that the next show event
        // will properly reposition everything.
        this.setState({ ...defaultState });
        detachListeners(this);

        // In case these haven't fired for some reason, kill them now to prevent errors
        clearTimeout(this._positionTimer);
        clearTimeout(this._visibleTimer);
      } else {
        attachListeners(this);
        this.positionComponent();
      }
    }

    if (prevProps.shouldRestrictMaxHeight !== shouldRestrictMaxHeight) {
      if (shouldRestrictMaxHeight) {
        this.calculateMaxHeight();
      } else {
        this.setState({
          maxHeight: null,
        });
      }
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  componentWillUnmount() {
    detachListeners(this);
    clearTimeout(this._positionTimer);
    clearTimeout(this._visibleTimer);
  }

  /**
   * In order to ensure that measurements are taken after all children are rendered, we need to do a
   * setTimeout inside of the componentDidUpdate method.  This is the callback for that and will
   * correctly position the element with a computed maxHeight, if desired.
   */
  positionOnShow = () => {
    // Safety check due to slim chance of unmount during setTimeout duration
    if (this.positionEl && document.body.contains(this.positionEl)) {
      this.positionComponent();
      if (this.props.shouldRestrictMaxHeight) {
        this.calculateMaxHeight();
      }
      // Tell the render method it's OK to render without "visibility: hidden"
      this.setState({
        positioned: true,
      });
    }
  };

  resizeAndScrollHandler = () => {
    const popup = this;
    if (!popup.ticking) {
      window.requestAnimationFrame(popup.positionComponent);
      popup.ticking = true;
    }
  };

  /**
   * Calculate positioning of the popup if the trigger is rendered.
   *
   * @public
   */
  positionComponent = () => {
    const { parentRef, isNotResponsive, viewportGutter, triggerDropdownGap } = this.props;

    if (parentRef) {
      const triggerDOM = getTriggerNodeFromParentRef(parentRef);
      const popupRect = this.positionEl && this.positionEl.firstChild.getBoundingClientRect();

      if (isBaseRendered(popupRect)) {
        const styles =
          !isNotResponsive && isNarrowViewport()
            ? stylesForBottomLeftPositioning
            : getTriggerAlignmentStyles({
                popupRect,
                triggerRect: triggerDOM.getBoundingClientRect(),
                viewportGutter,
                triggerDropdownGap,
                isNotResponsive,
              });
        this.setState(styles);
      }
    }

    this.ticking = false;
  };

  /**
   * Given we're rendering in the greatest whitespace, we need to work out if a maxHeight should
   * be added to the popup in order for the full popup to show its content and scroll.
   *
   * @public
   */
  calculateMaxHeight = () => {
    const {
      viewportGutter,
      parentRef,
      triggerDropdownGap,
      maxHeight,
      isNotResponsive,
    } = this.props;

    if (!parentRef) {
      return;
    }

    const triggerDOM = getTriggerNodeFromParentRef(parentRef);

    if (verge.inViewport(triggerDOM)) {
      if (!isNotResponsive && isNarrowViewport()) {
        const viewportH = verge.viewportH();
        this.setState({
          maxHeight: Math.min(viewportH, maxHeight),
        });
      } else {
        const triggerRect = triggerDOM.getBoundingClientRect();
        const spaceAboveTrigger = calcSpaceAbove(triggerRect);
        const spaceBelowTrigger = calcSpaceBelow(triggerRect);
        const availableSpace =
          Math.max(spaceAboveTrigger, spaceBelowTrigger) - viewportGutter - triggerDropdownGap;
        const calculatedHeight = Math.round(
          maxHeight ? Math.min(availableSpace, maxHeight) : availableSpace,
        );

        this.setState({
          maxHeight: calculatedHeight,
        });
      }
    }
  };

  /**
   * Uses internal state to work out inline styles and returns them.
   *
   * @return {{ maxHeight: Number, left: Number, top: Number }}
   */
  getStyles = () => {
    const { maxHeight, transform, top, bottom, marginLeft } = this.state;
    const { isTriggerWidthMatched, parentRef, isNotResponsive } = this.props;

    const isMobile = isNarrowViewport() && !isNotResponsive;
    const triggerElement = parentRef != null && getTriggerNodeFromParentRef(parentRef);

    const shouldMatchTriggerWidth = isTriggerWidthMatched && !isMobile && triggerElement != null;
    const width = shouldMatchTriggerWidth ? triggerElement.getBoundingClientRect().width : null;
    const maxWidth = shouldMatchTriggerWidth ? 'none' : null;

    return {
      maxHeight: isMobile ? null : maxHeight,
      top,
      width,
      maxWidth,
      bottom,
      transform: isMobile ? '' : transform,
      willChange: 'transform, max-height, max-width, top, bottom, margin-left',
      marginLeft,
    };
  };

  render() {
    const { children, isVisible, qaHook } = this.props;
    const { positioned } = this.state;
    const clonedChildren =
      isVisible && positioned
        ? React.cloneElement(children, {
            className: cn(children.props.className, `${ns}-dropdown-input-layout-match`),
            style: this.getStyles(),
          })
        : children;

    return isVisible ? (
      <Portal node={portalContainer()}>
        <div
          className={`${ns}-container`}
          data-automationid={qaHook}
          ref={portal => (this.positionEl = portal)}
          style={isVisible && !positioned ? stylesForCalculation : null}
        >
          {clonedChildren}
        </div>
      </Portal>
    ) : null;
  }
}

Positioning.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,
  /** true when the component is rendered but not displayed */
  isVisible: PropTypes.bool,
  /** A DOM object of the parent node. */
  parentRef: PropTypes.object,
  /** A buffer value added to measure between the edge of the viewport and the component before
   * flipping its position. */
  viewportGutter: PropTypes.number,
  /** A max height will mean an overflowed popup will scroll for the user rather than render
   * outside of the viewport. True by default. */
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
   * Setting a number here will force the maximum height of the child to be the number provided
   * (in pixels) if the viewport is too big. When the viewport is smaller than this number, it
   * still shrinks, but never grows beyond that number.
   */
  maxHeight: PropTypes.number,
};

Positioning.defaultProps = {
  viewportGutter: 10,
  shouldRestrictMaxHeight: true,
  isNotResponsive: false,
  triggerDropdownGap: 5,
  isTriggerWidthMatched: false,
};

export default Positioning;
