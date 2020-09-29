import { borderSpacing } from '../../constants';

/**
 * Extracts the values from a CSS `transform` property.
 *
 * *Note: Does not support multiple transforms.*
 *
 * *Note: Only supports pixel values.*
 *
 * @returns An array of numbers representing the values in the transform.
 */
function deconstructCSSTransform(transform: string) {
  return transform
    .substring(transform.indexOf('(') + 1, transform.indexOf(')'))
    .replace(/px/g, '')
    .split(', ')
    .map(translation => Number(translation));
}

/**
 * Adds an offset to the [CSS transform
 * property](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) based on the current state
 * of drag and drop.
 *
 * @returns The modified CSS transform property.
 */
export default function addOffsetToTransform(transform: string, isRowBeingDragged: boolean) {
  let transformWithOffset = transform;

  const [translateX, translateY] = deconstructCSSTransform(transformWithOffset);

  const isBelowDragOrigin = translateY > 0;

  if (isRowBeingDragged) {
    const draggingOffset = isBelowDragOrigin ? -borderSpacing * 2 : -borderSpacing;

    transformWithOffset = `translate(${translateX}px, ${translateY + draggingOffset}px)`;

    /**
     * react-beautiful-dnd relies on the transform changing to trigger the ontransitionend event.
     * Unfortunately this doesn't get fired if the transform from dragging is the same as the
     * destination transform.
     *
     * This results in a bug where picking up a row with the keyboard and dropping it again without
     * reordering it will leave the editable table in an unusable state.
     *
     * react-beautiful-dnd fixes this for us, but the offset above breaks it. To allow
     * react-beautiful-dnd's fix to continue working, we don't apply any offset when the row is in
     * exactly the same position it was picked up from.
     *
     * Note: This fix is responsible for the dragged row being 1px too far down when it is initially
     * picked up.
     */
    if (translateX === 0 && translateY === 0) {
      transformWithOffset = `translate(${translateX}px, ${translateY}px)`;
    }
  } else {
    const offset = isBelowDragOrigin ? borderSpacing : 0;

    transformWithOffset =
      translateX || translateY || offset
        ? `translate(${translateX}px, ${translateY + offset}px)`
        : 'none';
  }

  return transformWithOffset;
}
