import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import verge from 'verge';
import '../helpers/xuiGlobalChecks';
import Positioning from './Positioning';
import { isNarrowViewport, getSpacesAroundTrigger, isBaseRendered } from './private/dom-helpers';
import { positionOptions } from './private/constants';
import { alignBaseWithTrigger, getPreferredPosition } from './private/utils';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-positioningInline`;

class PositioningInline extends Positioning {
  positionEl = React.createRef();

  componentDidMount() {
    // Pushing this to the end of the queue seems to give styles enough time
    // to be applied before doing the positioning calculations.
    setTimeout(() => {
      this.positionComponent();
    }, 0);
  }

  componentDidUpdate() {
    const { props } = this;
    // TODO: Investigate whether setState can be avoided here
    // eslint-disable-next-line
    this.setState({
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
      const baseRect = this.positionEl.current?.firstChild.getBoundingClientRect();

      if (isBaseRendered(baseRect)) {
        alignBaseWithTrigger(baseRect, triggerDOM, this);
        this.calculateMaxDimensions(baseRect);
      }
    }
  };

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
    const baseRect = popupRect || this.positionEl.current?.firstChild.getBoundingClientRect();
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
      const triggerRect = triggerDOM.getBoundingClientRect();
      const spaces = getSpacesAroundTrigger(triggerRect);

      // Common measurements needed for setting sizes, depending on various positioning values
      const largerVerticalSpace =
        Math.max(spaces.above, spaces.below) - viewportGutter - triggerDropdownGap;
      const largerHorizontalSpace =
        Math.max(spaces.left, spaces.right) - viewportGutter - triggerDropdownGap;
      const possibleHorizCenteredSize = Math.min(spaces.left, spaces.right) * 2;
      const possibleVertCenteredSize = Math.min(spaces.above, spaces.below) * 2;
      const largestAvailableWidth =
        Math.max(largerHorizontalSpace, possibleHorizCenteredSize) + triggerRect.width;
      const largestAvailableHeight =
        Math.max(largerVerticalSpace, possibleVertCenteredSize) + triggerRect.height;

      const maxDimensions = {
        maxHeight,
        maxWidth,
      };

      if (!this.props.isNotResponsive && isNarrowViewport()) {
        // For mobile or very small screens, use the largest available space as max. Figure positioning later.
        maxDimensions.maxHeight = maxHeight
          ? Math.min(largestAvailableHeight, maxHeight)
          : largestAvailableHeight;
        maxDimensions.maxWidth = maxWidth
          ? Math.min(largestAvailableWidth, maxWidth)
          : largestAvailableWidth;
        this.setState(maxDimensions);
      } else {
        // Non-mobile treatment.
        if (positionVertically) {
          if (shouldRestrictMaxHeight) {
            maxDimensions.maxHeight = maxHeight
              ? Math.min(largerVerticalSpace, maxHeight)
              : largerVerticalSpace;
          } else {
            maxDimensions.maxHeight = null;
          }

          if (maxWidth === -1) {
            maxDimensions.maxWidth = null;
          } else {
            maxDimensions.maxWidth = maxWidth
              ? Math.min(largestAvailableWidth, maxWidth)
              : largestAvailableWidth;
          }
        } else {
          maxDimensions.maxWidth = maxWidth
            ? Math.min(largerHorizontalSpace, maxWidth)
            : largerHorizontalSpace;

          maxDimensions.maxHeight = maxHeight
            ? Math.min(largestAvailableHeight, maxHeight)
            : largestAvailableHeight;
        }
        this.setState(maxDimensions);
      }
    }
  };

  // Disable maxlen for JSDoc object definition
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
    if (isTriggerWidthMatched && !isMobile && parentRef != null && parentRef.firstChild != null) {
      ({ width } = parentRef.firstChild.getBoundingClientRect());
      newMaxWidth = null;
    }
    let marginLeft = null;
    let marginRight = null;
    if (isVisible) {
      // NB: Negative horizontal margins allow content to stretch to the max-width. This has
      // a similar effect to width: max-content, but works in all tested browsers, when
      // combined with the positioning + translate offsets used for centering in the CSS.
      const maxMargin =
        this.props.maxWidth && newMaxWidth
          ? Math.max(this.props.maxWidth, newMaxWidth)
          : newMaxWidth || this.props.maxWidth;
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
        ref={this.positionEl}
        style={{ top: topOffset, flexDirection: isHorizontal ? 'row' : 'column' }}
      >
        {clonedChildren}
      </span>
    );
  }
}

PositioningInline.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Force the desktop UI, even if the viewport is narrow enough for mobile. */
  isNotResponsive: PropTypes.bool,
  /** Setting to true will for the dropdown to be as wide as the trigger. */
  isTriggerWidthMatched: PropTypes.bool,
  /** true when the component is rendered but not displayed */
  isVisible: PropTypes.bool,
  /**
   * Setting a number here will force the maximum size of the child to be the number
   * provided (in pixels). When the viewport is smaller than this number, it still
   * shrinks, but never grows beyond that number. Setting either to -1 will set the value to null.
   */
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  /** Callback for when the positioned element becomes visible  */
  onVisible: PropTypes.func,
  /** A DOM object of the parent node. */
  parentRef: PropTypes.object,
  /**
   * Preferred side of the trigger and alignment in relation to the trigger for showing the tip.
   * This will potentially be over-ridden by dimensions of the viewport and tip contents.
   * Providing only the side (top, right, bottom, left) will default to a center-aligned tip.
   */
  preferredPosition: PropTypes.oneOf(positionOptions),
  qaHook: PropTypes.string,
  /** A max height will mean an overflowed popup will scroll for the user rather
   * than render outside of the viewport. True by default. */
  shouldRestrictMaxHeight: PropTypes.bool,
  /** The amount of space to put between the trigger and the dropdown */
  triggerDropdownGap: PropTypes.number,
  /**
   * Limit positioning to standard dropdown behaviour. The positioned element will only show above
   * or below the trigger (never to the side), and will be flush to the left or right of the
   * trigger (never centered).
   */
  useDropdownPositioning: PropTypes.bool,
  /** A buffer value added to measure between the edge of the viewport and the
   * component before flipping its position. */
  viewportGutter: PropTypes.number,
};

PositioningInline.defaultProps = {
  isNotResponsive: false,
  isTriggerWidthMatched: false,
  preferredPosition: 'bottom',
  shouldRestrictMaxHeight: true,
  triggerDropdownGap: 10,
  viewportGutter: 10,
};

export default PositioningInline;
