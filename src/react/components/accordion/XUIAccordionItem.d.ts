import * as React from 'react';

interface Props {
  /**
   * Optional actions to be right aligned. Use the `XUIActions` component.
   */
  action?: React.ReactNode;
  children?: React.ReactNode;
  /**
   * Description content.
   */
  description?: React.ReactNode;
  /**
   * Whether this accordion item should open, this should only be true for one item.
   */
  isOpen?: boolean;
  /**
   * Left most consumer specified component option, sits to the right of the arrow. Typically a
   * `XUIAvatar`, `XUICheckbox` or `XUIRolloverCheckbox` component.
   */
  leftContent?: React.ReactNode;
  /**
   * Callback for a accordion item toggle.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Any component passed as right most content, typically a `XUIDropdownToggled` component.
   */
  overflow?: React.ReactNode;
  /**
   * Pinned to right side of the accordion item trigger.
   */
  pinnedValue?: React.ReactNode;
  /**
   * Primary heading content.
   */
  primaryHeading?: React.ReactNode;
  qaHook?: string;
  /**
   * Secondary heading content.
   */
  secondaryHeading?: React.ReactNode;
}

declare const XUIAccordionItem: React.FunctionComponent<Props>;
export default XUIAccordionItem;
