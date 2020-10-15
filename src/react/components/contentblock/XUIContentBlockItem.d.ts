import * as React from 'react';

interface Props {
  /**
   * For accordion: identifies content associated with the trigger.
   */
  _ariaControls?: string;
  /**
   * For accordion: denotes whether content associated with the trigger is expanded.
   */
  _ariaExpanded?: boolean;
  /**
   * Gives accordion items the proper name for styling and semantics.
   */
  _isAccordionTrigger?: boolean;
  /**
   * Optional actions to be right aligned. Use the `XUIActions` component.
   */
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /**
   * Description to be placed under the heading.
   */
  description?: React.ReactNode;
  /**
   * Determines whether to apply bottom left and bottom right border radius on the content block
   * item.
   */
  hasBottomRadius?: boolean;
  /**
   * Determines whether to apply default layout styling or not.
   */
  hasLayout?: boolean;
  /**
   * Determines whether to apply top left and top right border radius on the content block item.
   */
  hasTopRadius?: boolean;
  /**
   * The `href` attribute to use on the anchor element.
   */
  href?: string;
  /**
   * Determines whether to apply hover styling on the entire content block item.
   */
  isRowLink?: boolean;
  /**
   * Left most component option, typically an `avatar`, `checkbox` or `rollover checkbox` component.
   */
  leftContent?: React.ReactNode;
  /**
   * Callback to fire when content block item is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /**
   * Callback to fire on keyDown for each content block item.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Any component passed as right most content, typically a `dropdown toggled` component.
   */
  overflow?: React.ReactNode;
  /**
   * Text pinned to right side of content block.
   */
  pinnedValue?: React.ReactNode;
  /**
   * Primary heading for the content block.
   */
  primaryHeading?: React.ReactNode;
  qaHook?: string;
  /**
   * Secondary heading for the content block.
   */
  secondaryHeading?: React.ReactNode;
  /**
   * Repositions the tags in other places around the component.
   */
  tagPosition?: 'description' | 'inline' | 'right';
  /**
   * Tag or other user determined node to go to right of primary heading.
   */
  tags?: React.ReactNode;
}

declare const XUIContentBlockItem: React.FunctionComponent<Props>;
export default XUIContentBlockItem;
