import { logWarning } from './developmentConsole';

/**
 * Method for conditionally warning the user that some prop(s) may be required from XUI 19 to be able to provide an aria label to the user
 *
 * @param {string} componentName - Name of the component
 * @param {string[]} conditions - Human readable strings for the conditions that must be met
 * @param {Array<string | boolean>} isLabelProvided - List of conditions that if true mean the label has already been provided
 */
const labelRequiredWarning = (
  componentName: string,
  conditions: string[],
  isLabelProvided: Array<string | boolean>,
) => {
  if (isLabelProvided.some(condition => condition)) {
    return;
  }
  const message = `As of XUI 19, one of the the following will be required in order to meet WCAG accessibility guidelines: ${conditions}`;
  logWarning({
    componentName,
    message,
  });
};

export default labelRequiredWarning;
