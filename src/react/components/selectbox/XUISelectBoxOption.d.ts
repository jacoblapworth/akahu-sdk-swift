import * as React from 'react';

import XUIPickitem from '../picklist/XUIPickitem';

interface Props {
  /**
   * Defaults to `option` for the aria role attribute, but can be defined for other uses.
   */
  ariaRole?: string;
  children?: React.ReactNode;
  /**
   * Link to be used in child, will render an anchor element if used and a button element if not.
   */
  href?: string;
  id: string;
  /**
   * Render the option disabled.
   */
  isDisabled?: boolean;
  /**
   * `true` if the item is highlighted.
   */
  isHighlighted?: boolean;
  /**
   * `true` if the item is selected.
   */
  isSelected?: boolean;
  /**
   * Callback on blur of the pickitem.
   */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /**
   * Callback when the pickitem is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Callback on focus of the pickitem.
   */
  onFocus?: React.FocusEventHandler<HTMLElement>;
  /**
   * Callback on keydown of the pickitem.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /**
   * Callback for mouseover event.
   */
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
  /**
   * Callback to be executed after a selection is made.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (selectedValue: any, item: XUIPickitem) => void;
  /**
   * Additional classes to be applied to the  option insides.
   */
  optionClassName?: string;
  /**
   * The automation-id to add to the item.
   */
  qaHook?: string;
  /**
   * Do the dropdown options show checkboxes.
   */
  showCheckboxes?: boolean;
  /**
   * Truncate `XUISelectBoxOption` children which are strings to one line.
   */
  truncateText?: boolean;
  /**
   * The value associated with this option.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export default class XUISelectBoxOption extends React.PureComponent<Props> {}
