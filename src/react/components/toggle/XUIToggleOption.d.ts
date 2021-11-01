import * as React from 'react';

import { typeMap } from './private/constants';

interface Props {
  /**
   * Accessibility label for the `<XUIToggleOption>`. This is required
   * if the component does not contain a child with text.
   * E.g. if the child is a `<XUIIcon>` without adjacent text.
   */
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  /**
   * The input is selected.
   */
  isChecked?: boolean;
  /**
   * The input is selected initially, but not in a controlled manner.
   */
  isDefaultChecked?: boolean;
  /**
   * The input is disabled.
   */
  isDisabled?: boolean;
  /**
   * The input is required for form submission.
   */
  isRequired?: boolean;
  /**
   * The name to use as a reference for the value.
   */
  name?: string;
  /**
   * The function to call when the control changes state.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  qaHook?: string;
  /**
   * The type of the input.
   */
  type?: keyof typeof typeMap;
  /**
   * The value to return on form submission.
   */
  value?: string;
}

declare const XUIToggleOption: React.FunctionComponent<Props>;
export default XUIToggleOption;
