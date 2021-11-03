import { logError } from './developmentConsole';

/**
 * Method for conditionally warning the user that some prop(s) are required from XUI 19 to be able to provide an aria label to the user
 *
 * @param {string} componentName - Name of the component
 * @param {string[]} conditions - Human readable strings for the conditions that must be met
 * @param {Array<string | boolean>} isLabelProvided - List of conditions that if true mean the label has already been provided
 */
const labelRequiredError = (
  componentName: string,
  conditions: string[],
  isLabelProvided: Array<string | boolean>,
) => {
  if (isLabelProvided.some(condition => condition)) {
    return;
  }
  const message = `One of the following is required in order to meet WCAG accessibility guidelines: ${conditions}`;
  logError({
    componentName,
    message,
  });
};

// Messages to consistently communicate how to fulfill common sets of criteria.
const textChildOrLabelId = ['includes a child with text', 'labelId provided']; // For inline controls: Checkbox, Radio, Switch
const ariaLabelOnly = ['`ariaLabel` provided']; // Various controls where only an ARIA label is required
const loadingAriaLabelOnly = ['loadingAriaLabel when isLoading'];

export { ariaLabelOnly, labelRequiredError as default, loadingAriaLabelOnly, textChildOrLabelId };
