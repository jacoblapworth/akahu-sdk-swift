import React from 'react';

import Pickitem from '../picklist/Pickitem';
import { sizes, widths } from './private/constants';

interface Props {
  /**
   * Additional classes to be applied to the button.
   */
  buttonClasses?: string;
  /**
   * Display text to be rendered on `SelectBox` button.
   */
  buttonContent: React.ReactNode;
  /**
   * The XUI button variant to use as a trigger for the select box.
   */
  buttonVariant?: string;
  /**
   * Title for the button caret.
   *
   * Recommended English value: *Toggle list*
   */
  caretTitle?: string;
  children?: React.ReactNode;
  /**
   * When a selection is made, close the dropdown.
   */
  closeAfterSelection?: boolean;
  /**
   * Additional classes to be applied to the container.
   */
  containerClasses?: string;
  /**
   * Use XUI provided layout classes.
   */
  defaultLayout?: boolean;
  /**
   * Additional classes to be applied to the dropDown.
   */
  dropDownClasses?: string;
  /**
   * Force the desktop experience, even if the viewport is narrow enough for mobile.
   */
  forceDesktop?: boolean;
  /**
   * Modifier for the width of the `SelectBox`.
   */
  fullWidth?: typeof widths[number];
  /**
   * Hint message to show under the input.
   */
  hintMessage?: React.ReactNode;
  /**
   * ID to apply to the dropdown. Used primarily to associate a label with it's matched content. If
   * none is provided it's automatically generated.
   */
  id?: string;
  /**
   * Additional classes to be applied to the input group.
   */
  inputGroupClasses?: string;
  /**
   * Whether the button trigger and functionality are disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether to use the field layout classes.
   */
  isFieldLayout?: boolean;
  /**
   * Whether the current input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Input Label visibility.
   */
  isLabelHidden?: boolean;
  /**
   * Whether or not the list should be forced open.
   */
  isOpen?: boolean;
  /**
   * Optionally toggles the text truncation.
   */
  isTextTruncated?: boolean;
  /**
   * Input Label.
   */
  label: React.ReactNode;
  /**
   * Additional classes to be applied to the label.
   */
  labelClassName?: string;
  /**
   * Setting to `false` will allow the dropdown's width to be set independent of the trigger width.
   *
   * **Note:** *Setting this to true will override any size prop on `DropDown`.*
   *
   * XUI design has also decided to keep a minimum width on the dropdown, so dropdown may not match
   * the width of narrow triggers.
   */
  matchTriggerWidth?: boolean;
  /**
   * Optional callback to be executed when dropdown closes.
   */
  onDropdownHide?: () => void;
  /**
   * Selection callback.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any, item: Pickitem) => void;
  /**
   * For adding automation ID to component as well as input and button sub-components.
   */
  qaHook?: string;
  /**
   * Whether focus should be restricted to the dropdown while it's open.
   */
  restrictFocus?: boolean;
  /**
   * Modifier for the size of the SelectBox.
   *
   * If `SelectBoxOption` does not have a size set, it will inherit the size from `SelectBox`.
   */
  size?: typeof sizes[number];
  /**
   * Validation message to show under the input if `isInvalid` is `true`.
   */
  validationMessage?: React.ReactNode;
}

export default class SelectBox extends React.Component<Props> {
  /**
   * Check if the DropDown is open
   */
  isDropDownOpen(): boolean;
}
