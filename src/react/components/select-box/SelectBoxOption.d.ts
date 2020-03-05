import React from 'react';

import Pickitem from '../picklist/Pickitem';

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
   * Callback on blur of the pick item.
   */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /**
   * Callback when the pick item is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Callback on focus of the pick item.
   */
  onFocus?: React.FocusEventHandler<HTMLElement>;
  /**
   * Callback on keydown of the pick item.
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
  onSelect?: (selectedValue: any, item: Pickitem) => void;
  /**
   * Additional classes to be applied to the  option insides.
   */
  optionClasses?: string;
  /**
   * The automation-id to add to the item.
   */
  qaHook?: string;
  /**
   * Do the dropdown options show checkboxes.
   */
  showCheckboxes?: boolean;
  /**
   * Restrict `SelectBoxOption` children which are strings to one line.
   */
  truncatedText?: boolean;
  /**
   * The value associated with this option.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export default class SelectBoxOption extends React.PureComponent<Props> {}
