import React from 'react';

import { colorMap, layoutMap, sizeMap } from './private/constants';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * The color of the toggle.
   */
  color?: keyof typeof colorMap;
  /**
   * Class names to be added to the field wrapper element.
   */
  fieldClassName?: string;
  /**
   * Hint message to show under the input.
   */
  hintMessage?: React.ReactNode;
  /**
   * Whether to use the field layout classes.
   */
  isFieldLayout?: boolean;
  /**
   * Whether the current input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Should label be applied as an `aria-label`, rather than being visibly displayed.
   */
  isLabelHidden?: boolean;
  /**
   * Label to show above the toggle.
   */
  label?: React.ReactNode;
  /**
   * Class names to add to the label.
   */
  labelClassName?: string;
  /**
   * Provide a specific label ID which will be used as the "labelledby" aria property.
   */
  labelId?: string;
  /**
   * The layout of the toggle.
   */
  layout?: keyof typeof layoutMap;
  qaHook?: string;
  /**
   * Additional props to pass to the toggle element.
   */
  secondaryProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * The size of the toggle.
   */
  size?: keyof typeof sizeMap;
  /**
   * Validation message to show under the input if `isInvalid` is `true`.
   */
  validationMessage?: React.ReactNode;
}

export default class XUIToggle extends React.PureComponent<Props> {}
