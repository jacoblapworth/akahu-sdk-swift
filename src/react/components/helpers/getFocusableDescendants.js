export default function getFocusableDescendants(element) {
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

  const focusableDescendantsSelector = focusableElements.map(focusableElement =>
    [focusableElement, ...unfocusableStates].join(''),
  );

  return element.querySelectorAll(focusableDescendantsSelector.join(', '));
}
