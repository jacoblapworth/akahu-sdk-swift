/**
 * Gets the focusable part of an `HTMLElement`.
 *
 * @param element The element to search through. This can be focusable or have
 * focusable children.
 *
 * @returns The provided element if it is focusable, otherwise the first
 * focusable child of the provided element, or null if the element is not focusable and has no
 * focusable children.
 */
export default function getFocusableElement(element: HTMLElement | null): HTMLElement;
