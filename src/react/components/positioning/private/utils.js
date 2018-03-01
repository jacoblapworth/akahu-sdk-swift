import {
	getSpacesAroundTrigger,
	mapOppositeSpaces
} from './dom-helpers';
import {
	defaultAlignemnt,
	flipDirection,
	verticals,
	horizontals
} from './constants';

/**
 * Given a positionSetting property, split into side and alignment positioning values.
 *
 * @private
 * @param {preferredPositionStr} string
 * @returns {{side: string, alignment: string, positionVertically: boolean, alignVertically: boolean}}
 */
export const getPreferredPosition = function(preferredPositionStr) {
	const [side, alignment] = preferredPositionStr.split('-');
	return {
		side,
		alignment: alignment || defaultAlignemnt,
		positionVertically: verticals.indexOf(side) > -1,
		alignVertically: horizontals.indexOf(side) > -1
	};
}

/**
 * Given info about the trigger, tooltip, and positioning, determine how to align the tooltip.
 *
 * @private
 * @returns {string}
 */
function getAlignment({tooltipRect, triggerRect, viewportGutter, alignmentIsVertical, requestedAlignment, spaces}) {
	const oppositeSideSpace = mapOppositeSpaces(spaces);

	const smallerDimension = alignmentIsVertical ?
		Math.min(spaces.above, spaces.below) :
		Math.min(spaces.left, spaces.right);
	const largerDimension = alignmentIsVertical ?
		Math.max(spaces.above, spaces.below) :
		Math.max(spaces.left, spaces.right);
	const tooltipAlignOverhang = alignmentIsVertical ?
		tooltipRect.height - triggerRect.height :
		tooltipRect.width - triggerRect.width;
	const centeredOverhang = tooltipAlignOverhang / 2;
	// Happy cases.
	if (requestedAlignment === 'center' &&
		(centeredOverhang <= 0 || centeredOverhang <= smallerDimension - viewportGutter)) {
			return requestedAlignment;
	} else if (tooltipAlignOverhang <= oppositeSideSpace[requestedAlignment] - viewportGutter) {
		return requestedAlignment;
	}

	// Flip cases.
	if (tooltipAlignOverhang <= largerDimension - viewportGutter) {
		if (requestedAlignment === 'center') {
			if (alignmentIsVertical) {
				return spaces.above < spaces.below ? 'top' : 'bottom';
			} else {
				return spaces.left < spaces.right ? 'left' : 'right';
			}
		} else {
			return flipDirection[requestedAlignment];
		}
	} else if (centeredOverhang <= smallerDimension - viewportGutter) {
		return 'center';
	}

	// Total fail case. Just leave it as is.
	return requestedAlignment;
}

/**
 * Given the final positioning info and height of the trigger, adjust the placement wrapper, vertically.
 *
 * @private
 * @returns {string}
 */
function getTopOffset(side, alignment, triggerHeight) {
	// Offset the relatively positioned wrapper for ease, in some cases.
	if (side === "top" || alignment === "top") {
		return `-${triggerHeight}px`;
	} else if (side !== "bottom" && alignment === "center") {
		return `-${triggerHeight / 2}px`;
	} else {
		return "auto";
	}
}

/**
 * @private
 * Calculates the position, alignment, and vertical offset of the tooltip and sets the state accordingly.
 *
 * @param {Object} tooltipRect
 * @param {Object} triggerRect
 * @param {Positioning} tooltip
 */
export const alignBaseWithTrigger = function(tooltipRect, triggerDOM, tooltip) {
	const { viewportGutter, triggerDropdownGap } = tooltip.props;
	const preferredPosition = getPreferredPosition(tooltip.props.preferredPosition);
	const triggerRect = triggerDOM.getBoundingClientRect();
	const spaces = getSpacesAroundTrigger(triggerRect);
	const oppositeSideSpace = mapOppositeSpaces(spaces);
	const sameSideSpace = {
		top: spaces.above,
		bottom: spaces.below,
		left: spaces.left,
		right: spaces.right
	};

	let requestedAlignment = preferredPosition.alignment;
	// Kept getSide in closure since changes to requestedAlignment is a side effect that's tricky to disentangle.
	// Also, it re-calls itself.
	const getSide = ({positionVertically, side}, isRotated) => {
		const dimensionToCheck = positionVertically ? tooltipRect.height : tooltipRect.width;
		// Does the tooltip fit where the consumer requested?
		// First, happy case.
		if (dimensionToCheck <= sameSideSpace[side] - viewportGutter - triggerDropdownGap) {
			return side;
		} else if (dimensionToCheck <= oppositeSideSpace[side] - viewportGutter - triggerDropdownGap) {
			// Flip case.
			return flipDirection[side];
		} else {
			// These cases both get the default alignment.
			requestedAlignment = defaultAlignemnt;
			if (!isRotated) {
				// Doesn't fit on either side on the preferred axis. Try placing again, but
				// switch horizontal / vertical placement.
				return getSide({
					side: positionVertically ? 'right' : 'bottom',
					positionVertically: !positionVertically
				}, true); // Passing in true for isRotated, so we only retry once.
			} else {
				// We've already tried rotating this, and it still won't fit. :( Hang it off the bottom.
				return 'bottom';
			}
		}
	};

	const calculatedSide = getSide(preferredPosition);
	const isHorizontal = verticals.indexOf(calculatedSide) > -1;
	const calculatedAlignment = getAlignment({
		tooltipRect,
		triggerRect,
		viewportGutter,
		alignmentIsVertical: !isHorizontal,
		requestedAlignment,
		spaces
	});
	const calculatedTopOffset = getTopOffset(
		calculatedSide,
		calculatedAlignment,
		triggerRect.height
	);

	tooltip.setState(
		{
			side: calculatedSide,
			alignment: calculatedAlignment,
			topOffset: calculatedTopOffset,
			isHorizontal: isHorizontal
		}
	);
}
