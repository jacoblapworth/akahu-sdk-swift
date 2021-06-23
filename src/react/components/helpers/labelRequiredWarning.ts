import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

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

//  Helper function to determine whether a node contains text
const nodeContainsText = (node: React.ReactNode) => {
  const regex = /<[\w/].*?>/g;
  const html = ReactDOMServer.renderToStaticMarkup(node as React.ReactElement);
  const htmlText = html.replace(regex, '').trim();
  return htmlText.length > 0;
};

// Messages to consistently communicate how to fulfill common sets of criteria.
const textChildOrLabelId = ['includes a child with text', 'labelId provided']; // For inline controls: Checkbox, Radio, Switch
const ariaLabelOnly = ['`ariaLabel` provided']; // Various controls where only an ARIA label is required
const loadingAriaLabelOnly = ['loadingAriaLabel when isLoading'];

export {
  ariaLabelOnly,
  labelRequiredWarning as default,
  loadingAriaLabelOnly,
  nodeContainsText,
  textChildOrLabelId,
};
