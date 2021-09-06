import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import verge from 'verge';
import { Portal } from 'react-portal';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import {
  attachListeners,
  detachListeners,
  getAbsoluteBoundingClientRect,
  getSpacesAroundTrigger,
  getTriggerNodeFromParentRef,
  isBaseRendered,
  isNarrowViewport,
  scrollLeftAmount,
  scrollTopAmount,
} from './private/dom-helpers';
import { positionOptions } from './private/constants';
import portalContainer from '../helpers/portalContainer';
import { ns } from '../helpers/xuiClassNamespace';
import { getPreferredPosition } from './private/utils';

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
  preferredPosition,
}) {
  const spaceAroundTrigger = getSpacesAroundTrigger(triggerRect);

  const canGoBelow =
    popupRect.height <= spaceAroundTrigger.below - viewportGutter - triggerDropdownGap;
  const canGoAbove =
    popupRect.height <= spaceAroundTrigger.above - viewportGutter - triggerDropdownGap;
  const canAlignLeftEdge =
    popupRect.width <=
    spaceAroundTrigger.right + triggerRect.width - viewportGutter - triggerDropdownGap;
  const canAlignRightEdge =
    popupRect.width <=
    spaceAroundTrigger.left + triggerRect.width - viewportGutter - triggerDropdownGap;

  // Place popup above if:
  // it is the preferred position and either it fits, or it doesn't fit properly above or below.
  // OR if it doesn't fit below, and the space above is larger than the space below.
  // For all other cases (default), place below.
  const placeAbove =
    (preferredPosition.side === 'top' && (canGoAbove || (!canGoBelow && !canGoAbove))) ||
    (!canGoBelow && spaceAroundTrigger.above > spaceAroundTrigger.below);

  // Aligning the popup to one edge means the popup overhang will be on the opposite side.
  // Align popup to the right if:
  // it is the preferred position AND EITHER it fits when right-aligned, or it doesn't fit properly to either side.
  // OR if it doesn't fit left-aligned, and the space to the left is larger than the space to the right.
  // For all other cases (default), align to the left edge.
  const alignRightEdge =
    (preferredPosition.alignment === 'right' &&
      (canAlignRightEdge || (!canAlignLeftEdge && !canAlignRightEdge))) ||
    (!canAlignLeftEdge && spaceAroundTrigger.left > spaceAroundTrigger.right);

  const popupLeftPos = alignRightEdge
    ? Math.min(
        Math.max(triggerRect.right - popupRect.width, viewportGutter),
        verge.viewportW() - popupRect.width - viewportGutter,
      )
    : Math.max(triggerRect.left, viewportGutter);

  // Use `round` to cater for subpixel calculations
  // Tested in FF (osx), Chrome (osx), Safari (osx)
  const marginLeft =
    !isNotResponsive && isNarrowViewport()
      ? '0px'
      : `${Math.round(popupLeftPos + scrollLeftAmount())}px`;

  const marginRight = !isNotResponsive && isNarrowViewport() ? '0px' : `${viewportGutter}px`;

  const translateYAmount = placeAbove
    ? `calc(-100% - ${triggerDropdownGap}px)`
    : `${triggerRect.height + triggerDropdownGap}px`;
  const transform = `translateY(${translateYAmount})`;

  return {
    marginLeft,
    marginRight,
    top: triggerRect.top + scrollTopAmount(),
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
  marginRight: 0,
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
  marginRight: 0,
};

class Positioning extends PureComponent {
  state = { ...defaultState };

  positionEl = React.createRef();

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

    if (isVisible) {
      this.positionComponent();
      // If the popup is going from hidden to visible but hasn't been positioned yet, the render
      // method will ensure that everything is rendered with "visibility: hidden".
      // Wait a bit to make sure all children also render, then measure things and position the
      // popup correctly on the screen.
      if (!positioned) {
        this._positionTimer = setTimeout(this.positionOnShow, 50, this);
      }
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
        this.calculateMaxDimensions();
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
    if (this.positionEl.current && document.body.contains(this.positionEl.current)) {
      this.positionComponent();
      this.calculateMaxDimensions();
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
    const {
      parentRef,
      isNotResponsive,
      leaveRoomForValidationMessage,
      viewportGutter,
      triggerDropdownGap,
      preferredPosition,
    } = this.props;

    if (parentRef) {
      const triggerDOM = getTriggerNodeFromParentRef(parentRef, leaveRoomForValidationMessage);
      const popupRect =
        this.positionEl.current?.firstChild &&
        getAbsoluteBoundingClientRect(this.positionEl.current.firstChild);

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
                preferredPosition: getPreferredPosition(preferredPosition),
              });
        this.setState(styles);
      }
    }

    this.ticking = false;
  };

  /**
   * Work out the max dimensions of the popup, given its position. Store them to state.
   *
   * @public
   */
  calculateMaxDimensions = () => {
    const {
      viewportGutter,
      leaveRoomForValidationMessage,
      parentRef,
      triggerDropdownGap,
      maxHeight,
      isNotResponsive,
      shouldRestrictMaxHeight,
    } = this.props;

    if (!parentRef) {
      return;
    }

    const triggerDOM = getTriggerNodeFromParentRef(parentRef, leaveRoomForValidationMessage);

    if (verge.inViewport(triggerDOM)) {
      if (!isNotResponsive && isNarrowViewport()) {
        const viewportH = verge.viewportH();
        const viewportW = verge.viewportW();
        this.setState({
          maxHeight: Math.min(viewportH, maxHeight),
          maxWidth: viewportW,
        });
      } else {
        const triggerRect = triggerDOM.getBoundingClientRect();
        const spaceAroundTrigger = getSpacesAroundTrigger(triggerRect);
        if (shouldRestrictMaxHeight) {
          const availableVerticalSpace =
            Math.max(spaceAroundTrigger.above, spaceAroundTrigger.below) -
            viewportGutter -
            triggerDropdownGap;
          const calculatedHeight = Math.round(
            maxHeight ? Math.min(availableVerticalSpace, maxHeight) : availableVerticalSpace,
          );
          this.setState({
            maxHeight: calculatedHeight,
          });
        }
        // If the popup is right-aligned, the left margin will be less than the space to the left of the trigger.
        // We may need to re-calc the max-width to keep that aligned to the right edge of the trigger.
        if (parseInt(this.state.marginLeft, 10) < spaceAroundTrigger.left) {
          const availableHorizontalSpace =
            spaceAroundTrigger.left + triggerRect.width - viewportGutter - triggerDropdownGap;
          const calculatedWidth = Math.round(availableHorizontalSpace);
          this.setState({
            maxWidth: calculatedWidth,
          });
        }
      }
    }
  };

  /**
   * Uses internal state to work out inline styles and returns them.
   *
   * @return {{ maxHeight: Number, maxWidth: Number, bottom: Number, top: Number, width: Number, transform: String, willChange: String, marginLeft: Number, marginRight: Number }}
   */
  getStyles = () => {
    const { maxHeight, maxWidth, transform, top, bottom, marginLeft, marginRight } = this.state;
    const {
      isTriggerWidthMatched,
      leaveRoomForValidationMessage,
      parentRef,
      isNotResponsive,
      isDynamicWidth,
    } = this.props;

    const isMobile = isNarrowViewport() && !isNotResponsive;
    const triggerElement =
      parentRef && getTriggerNodeFromParentRef(parentRef, leaveRoomForValidationMessage);

    const shouldMatchTriggerWidth =
      isTriggerWidthMatched === true && !isMobile && triggerElement != null;

    const minWidthShouldMatchTriggerWidth =
      isTriggerWidthMatched === 'min' && !isMobile && triggerElement != null;

    const styles = {
      maxHeight: isMobile ? null : maxHeight,
      top,
      width: shouldMatchTriggerWidth ? triggerElement.getBoundingClientRect().width : null,
      maxWidth: (isDynamicWidth && !isMobile && maxWidth) || null, // Allows CSS max-widths to do their thing.
      bottom,
      transform: isMobile ? '' : transform,
      willChange: 'transform, max-height, max-width, top, bottom, margin-left',
      marginLeft,
      marginRight,
    };

    if (minWidthShouldMatchTriggerWidth) {
      styles.minWidth = triggerElement.getBoundingClientRect().width;
    }

    return styles;
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
          ref={this.positionEl}
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
  /** If dropdown width is not limited by other props and max should be set dynamically. */
  isDynamicWidth: PropTypes.bool,
  /** Force the desktop UI, even if the viewport is narrow enough for mobile. */
  isNotResponsive: PropTypes.bool,
  /**
   * Setting this to `true` makes the dropdown as wide as the trigger.
   * Setting this to `false` will allow the dropdown's width to be set independent of the trigger width.
   * Setting this to `'min'` will set the dropdown's `min-width` to be the trigger width.
   */
  isTriggerWidthMatched: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([true, false, 'min']),
  ]),

  /** true when the component is rendered but not displayed */
  isVisible: PropTypes.bool,
  /** Prevent the positioned element from sitting over the trigger's validation message */
  leaveRoomForValidationMessage: PropTypes.bool,
  /**
   * Setting a number here will force the maximum height of the child to be the number provided
   * (in pixels) if the viewport is too big. When the viewport is smaller than this number, it
   * still shrinks, but never grows beyond that number.
   */
  maxHeight: PropTypes.number,
  /** A DOM object of the parent node. */
  /** Callback for when the positioned element becomes visible  */
  onVisible: PropTypes.func,
  parentRef: PropTypes.object,
  /**
   * Preferred side of the trigger and alignment in relation to the trigger for showing the popup.
   * This will potentially be over-ridden by dimensions of the viewport and popup contents.
   */
  preferredPosition: PropTypes.oneOf(positionOptions),
  qaHook: PropTypes.string,
  /** A max height will mean an overflowed popup will scroll for the user rather than render
   * outside of the viewport. True by default. */
  shouldRestrictMaxHeight: PropTypes.bool,
  /** The amount of space to put between the trigger and the dropdown */
  triggerDropdownGap: PropTypes.number,
  /** A buffer value added to measure between the edge of the viewport and the component before
   * flipping its position. */
  viewportGutter: PropTypes.number,
};

Positioning.defaultProps = {
  isNotResponsive: false,
  isTriggerWidthMatched: false,
  shouldRestrictMaxHeight: true,
  triggerDropdownGap: 5,
  viewportGutter: 10,
};

export default Positioning;
