const focusableElements = [
  '[contentEditable]',
  '[tabindex]',
  'a[href]',
  'area[href]',
  'button',
  'details',
  'iframe',
  'input',
  'select',
  'textarea',
];

const unfocusableStates = [
  ':not([contentEditable="false"])',
  ':not([disabled])',
  ':not([tabindex="-1"])',
];

export const focusableDescendantsSelector = focusableElements
  .map(focusableElement => [focusableElement, ...unfocusableStates].join(''))
  .join(', ');

export default function getFocusableDescendants(element) {
  return element.querySelectorAll(focusableDescendantsSelector);
}
