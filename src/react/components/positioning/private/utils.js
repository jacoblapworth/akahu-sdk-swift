import { getSpacesAroundTrigger, mapOppositeSpaces } from './dom-helpers';
import { defaultAlignemnt, flipDirection, verticals, horizontals } from './constants';

/**
 * Given a positionSetting property, split into side and alignment positioning values.
 *
 * @private
 * @param {preferredPositionStr} string
 * @returns {{side: string, alignment: string,positionVertically: boolean, alignVertically: boolean}}
 */
export const getPreferredPosition = preferredPositionStr => {
  const [side, alignment] = preferredPositionStr.split('-');
  return {
    side,
    alignment: alignment || defaultAlignemnt,
    positionVertically: verticals.indexOf(side) > -1,
    alignVertically: horizontals.indexOf(side) > -1,
  };
};

/**
 * Given info about the trigger, popup, and positioning, determine how to align the popup.
 *
 * @private
 * @returns {string}
 */
function getAlignment({
  popupRect,
  triggerRect,
  viewportGutter,
  alignmentIsVertical,
  requestedAlignment,
  spaces,
  useDropdownPositioning,
}) {
  const oppositeSideSpace = mapOppositeSpaces(spaces);

  const smallerDimension = alignmentIsVertical
    ? Math.min(spaces.above, spaces.below)
    : Math.min(spaces.left, spaces.right);
  const largerDimension = alignmentIsVertical
    ? Math.max(spaces.above, spaces.below)
    : Math.max(spaces.left, spaces.right);
  const popupAlignOverhang = alignmentIsVertical
    ? popupRect.height - triggerRect.height
    : popupRect.width - triggerRect.width;
  const centeredOverhang = popupAlignOverhang / 2;
  // Happy cases.
  if (
    requestedAlignment === 'center' &&
    (centeredOverhang <= 0 || centeredOverhang <= smallerDimension - viewportGutter)
  ) {
    return requestedAlignment;
  } else if (popupAlignOverhang <= oppositeSideSpace[requestedAlignment] - viewportGutter) {
    return requestedAlignment;
  }

  // Flip cases.
  if (popupAlignOverhang <= largerDimension - viewportGutter) {
    if (requestedAlignment === 'center') {
      if (alignmentIsVertical) {
        return spaces.above < spaces.below ? 'top' : 'bottom';
      }
      return spaces.left < spaces.right ? 'left' : 'right';
    }
    return flipDirection[requestedAlignment];
  } else if (!useDropdownPositioning && centeredOverhang <= smallerDimension - viewportGutter) {
    return 'center';
  }

  // Total fail case. Just leave it as is.
  return requestedAlignment;
}

/**
 * Given the final positioning info and height of the trigger, adjust the placement
 * wrapper, vertically.
 *
 * @private
 * @returns {string}
 */
function getTopOffset(side, alignment, triggerHeight, triggerDropdownGap) {
  // Offset the relatively positioned wrapper for ease, in some cases.
  if (side === 'top') {
    return `-${triggerHeight + triggerDropdownGap}px`;
  } else if (alignment === 'top') {
    return `-${triggerHeight}px`;
  } else if (side !== 'bottom' && alignment === 'center') {
    return `-${triggerHeight / 2}px`;
  } else if (alignment === 'bottom') {
    return 'auto';
  }
  return `${triggerDropdownGap}px`;
}

/**
 * @private
 * Calculates the position, alignment, and vertical offset of the popup and sets the
 * state accordingly.
 *
 * @param {Object} popupRect
 * @param {Object} triggerRect
 * @param {Positioning} popup
 */
export const alignBaseWithTrigger = (popupRect, triggerDOM, popup) => {
  const { viewportGutter, triggerDropdownGap, useDropdownPositioning } = popup.props;
  const preferredPosition = getPreferredPosition(popup.props.preferredPosition);
  const triggerRect = triggerDOM.getBoundingClientRect();
  const spaces = getSpacesAroundTrigger(triggerRect);
  const oppositeSideSpace = mapOppositeSpaces(spaces);
  const sameSideSpace = {
    top: spaces.above,
    bottom: spaces.below,
    left: spaces.left,
    right: spaces.right,
  };

  let requestedAlignment = preferredPosition.alignment;
  /** Kept getSide in closure since changes to requestedAlignment is a side effect that's
   * tricky to disentangle. Also, it re-calls itself.
   */
  const getSide = ({ positionVertically, side }, isRotated) => {
    const dimensionToCheck = positionVertically ? popupRect.height : popupRect.width;
    // Does the popup fit where the consumer requested?
    // First, happy case.
    if (dimensionToCheck <= sameSideSpace[side] - viewportGutter - triggerDropdownGap) {
      return side;
    } else if (dimensionToCheck <= oppositeSideSpace[side] - viewportGutter - triggerDropdownGap) {
      // Flip case.
      return flipDirection[side];
    } else if (useDropdownPositioning) {
      // If positioning with top/bottom dropdown behavior, don't even try the flip.
      return 'bottom';
    }
    // These cases both get the default alignment.
    requestedAlignment = defaultAlignemnt;
    if (!isRotated) {
      // Doesn't fit on either side on the preferred axis. Try placing again, but
      // switch horizontal / vertical placement.
      return getSide(
        {
          side: positionVertically ? 'right' : 'bottom',
          positionVertically: !positionVertically,
        },
        true,
      ); // Passing in true for isRotated, so we only retry once.
    }
    // We've already tried rotating this, and it still won't fit. :( Hang it off the bottom.
    return 'bottom';
  };

  const calculatedSide = getSide(preferredPosition);
  const isHorizontal = verticals.indexOf(calculatedSide) > -1;
  const calculatedAlignment = getAlignment({
    popupRect,
    triggerRect,
    viewportGutter,
    alignmentIsVertical: !isHorizontal,
    requestedAlignment,
    spaces,
    useDropdownPositioning,
  });
  const calculatedTopOffset = getTopOffset(
    calculatedSide,
    calculatedAlignment,
    triggerRect.height,
    triggerDropdownGap,
  );

  popup.setState({
    side: calculatedSide,
    alignment: calculatedAlignment,
    topOffset: calculatedTopOffset,
    isHorizontal,
  });
};
