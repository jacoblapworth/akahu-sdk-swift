import { nanoid } from 'nanoid';

/**
 * @public
 * Build the control, label, and message ids from a user-provided id, or from scratch
 * This should first be triggered by initialising the control component. The output is
 * then passed to getAriaAttributes.
 * @param {string} labelId - Optional, consumer-provided string to use as the label ID
 * @returns {{label: string, message: string, control: string}}
 */
export default function generateIds(labelId) {
  const label = labelId || `xui-${nanoid(10)}`;
  return {
    label,
    control: `${label}-control`,
    message: `${label}-message`,
  };
}

/**
 * @public
 * Build the control, label, and message ids from a user-provided id, or from scratch
 * This should first be triggered by initialising the control component. The output is
 * then passed to getAriaAttributes.
 * @param {string} controlId - Optional, consumer-provided string to use as the control ID
 * @returns {{label: string, message: string, control: string}}
 */
export function generateIdsFromControlId(controlId) {
  const control = controlId || `xui-${nanoid(10)}`;
  return {
    control,
    label: `${control}-label`,
    message: `${control}-message`,
  };
}
