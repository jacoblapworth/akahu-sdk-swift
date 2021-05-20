import { v4 as uuidv4 } from 'uuid';

/**
 * @public
 * Build the control, label, and message ids from a user-provided id, or from scratch
 * This should first be triggered by initialising the control component. The output is
 * then passed to getAriaAttributes.
 * @param {string} labelId - Optional, consumer-provided string to use as the label ID
 * @returns {{label: string, message: string, control: string}}
 */
export default function generateIds(labelId) {
  const label = labelId || uuidv4();
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
  const control = controlId || uuidv4();
  return {
    control,
    label: `${control}-label`,
    message: `${control}-message`,
  };
}

/**
 * @public
 * Get the collection of aria attributes to be applied to the control.
 * Independent of the component, for timing purposes.
 * @param {Object} ids - generated ids from ./helpers, including label and message ids
 * @param {Object} props - props of the parent control component
 * @returns {{aria-invalid: boolean, aria-label: string, aria-labelledby: string, aria-describedby: string}}
 */
export const getAriaAttributesInline = (ids, props) => {
  const {
    children, // This refers to children of the parent control component. Often plain text.
    isLabelHidden,
    validationMessage,
    hintMessage,
    labelId,
    isInvalid,
  } = props;

  // Create a "labelledby" attribute if there is child content, or if the user has provided an id.
  const ariaLabelledBy =
    (children != null && !isLabelHidden && ids.label) || (!children && labelId) || undefined;

  // Add hidden label if specified by the user, and provided content is a string.
  const ariaLabel =
    (children && isLabelHidden && typeof children[0] === 'string' && children) || undefined;

  // Create a "describedby" attribute if there is a hint or validation message to display.
  const ariaDescribedBy =
    ((hintMessage || (validationMessage && isInvalid)) && ids.message) || undefined;

  return {
    'aria-invalid': isInvalid,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
  };
};

/**
 * @public
 * Get the collection of aria attributes to be applied to the control.
 * Independent of the component, for timing purposes.
 * @param {Object} ids - generated ids from ./helpers, including label and message ids
 * @param {Object} props - props of the parent control component
 * @param {Boolean} isGroup - Whether or not this label is for a group of controls
 * @returns {{aria-invalid: boolean, aria-label: string, aria-labelledby: string, aria-describedby: string}}
 */
export const getAriaAttributes = (ids, props, groupedSetting = {}) => {
  const { isGroup } = groupedSetting;
  const { label, isLabelHidden, validationMessage, hintMessage, labelId, isInvalid } = props;

  // props.placeholder pulls possible backup label from a textInput.
  // props.buttonContent pulls possible backup label from a selectBox.
  const fallBackLabel = props.placeholder || props.buttonContent;

  // Create a "labelledby" attribute if there is no label content and the user has
  // provided an id, or if this is a visible label for a group.
  const ariaLabelledBy =
    (!label && labelId) || (label && !isLabelHidden && isGroup && ids.label) || undefined;

  // Add hidden label if specified by the user, and provided content is a string
  // (or fallBackLabel as label if that's all we've got)
  const ariaLabel =
    (label && isLabelHidden && typeof label[0] === 'string' && label) ||
    (!label && !ariaLabelledBy && fallBackLabel) ||
    undefined;

  // Create a "describedby" attribute if there is a hint or validation message to display.
  const ariaDescribedBy =
    ((hintMessage || (validationMessage && isInvalid)) && ids.message) || undefined;

  // Only provide a control ID if the label will be using htmlFor to target it.
  const controlId = (!isGroup && ids.control) || undefined;

  return {
    'aria-invalid': isInvalid,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    id: controlId,
  };
};
