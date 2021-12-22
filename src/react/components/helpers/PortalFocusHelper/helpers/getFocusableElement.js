import getFocusableDescendants, {
  focusableDescendantsSelector,
} from '../../getFocusableDescendants';

/**
 * Ponyfill for
 * [Element.prototype.matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)
 */
function elementMatchesSelector(element, selector) {
  if (element.msMatchesSelector) {
    return element.msMatchesSelector(selector);
  }
  if (element.webkitMatchesSelector) {
    return element.webkitMatchesSelector(selector);
  }
  return element.matches(selector);
}

/**
 * Gets the focusable part of an `HTMLElement`.
 *
 * @param {HTMLElement | null} element The element to search through. This can be focusable or have
 * focusable children.
 *
 * @returns {HTMLElement | null} The provided element if it is focusable, otherwise the first
 * focusable child of the provided element, or null if the element is not focusable and has no
 * focusable children.
 */
export default function getFocusableElement(element) {
  if (!element) {
    return null;
  }

  if (elementMatchesSelector(element, focusableDescendantsSelector)) {
    return element;
  }

  const focusableDescendants = getFocusableDescendants(element);

  if (focusableDescendants.length === 0) {
    return null;
  }

  return focusableDescendants[0];
}
