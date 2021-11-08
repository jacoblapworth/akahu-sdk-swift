import * as React from 'react';

import { fixedWidthDropdownSizes } from '../dropdown/private/constants';
import XUIPickitem from '../picklist/XUIPickitem';

interface Props {
  children?: React.ReactNode;
  /**
   * CSS class(es) to go on the wrapping DOM node.
   */
  className?: string;
  /**
   * Maps to the `closeOnSelect` property of the `XUIDropdownToggled` component.
   */
  closeOnSelect?: boolean;
  /**
   * Maps to the `closeOnTab` property of the `XUIDropdownToggled` component. Set to `false`, if you've
   * supplied a footer element with any links or interaction.
   */
  closeOnTab?: boolean;
  /**
   * CSS class(es) to go on the dropdown list.
   */
  dropdownClassName?: string;
  /**
   * If a size is set, this will force the dropdown to that size instead of setting it as a max
   * width.
   */
  dropdownHasFixedWidth?: boolean;
  /**
   * Maps to the 'size' property of the dropdown component.
   */
  dropdownSize?: keyof typeof fixedWidthDropdownSizes;
  /**
   * A footer element can be added.
   */
  footer?: React.ReactElement;
  /**
   * Force the desktop user experience, even if the viewport is narrow enough for mobile.
   */
  forceDesktop?: boolean;
  /**
   * ID to be added to the dropdown element of the completer.
   */
  id?: string;
  /**
   * CSS class(es) to go on the input.
   */
  inputClassName?: string;
  /**
   * CSS class(es) to go on the input container.
   */
  inputContainerClassName?: string;
  /**
   * ID to be applied to the input element.
   */
  inputId?: string;
  /**
   * Label to show above the input.
   */
  inputLabel?: React.ReactNode;
  /**
   * Attributes to set on the native input element.
   */
  inputProps?:
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>
    | React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Whether to allow the dropdown to take the full width of the wrapper (as `XUISelectBox`) or wrap with
   * an inline block.
   */
  isBlock?: boolean;
  /**
   * Should label be applied as an aria-label, rather than being visibly displayed.
   */
  isInputLabelHidden?: boolean;
  /**
   * Whether the underlying DropdownToggled component uses the "legacy" (portaled) display.
   *
   * Defaults to "true."
   */
  isLegacyDisplay?: boolean;

  // TODO: Implement loading pattern
  // /**
  //  * When set to `true` a loader will be displayed instead of the picklist items. State for this
  //  * should be managed externally.
  //  *
  //  * Defaults to `false`.
  //  */
  // isLoading?: boolean;

  /**
   * Setting this to `true` makes the dropdown as wide as the trigger.
   *
   * **Note:** *Setting this to `true` will override any `size` prop on `XUIDropdown`.*
   *
   * Setting this to `false` will allow the dropdown's width to be set independent of the trigger width.
   *
   * Setting this to `'min'` will set the dropdown's `min-width` to be the trigger width.
   *
   * **Note:** *XUI design has also decided to keep a minimum width on the dropdown, so the dropdown
   * may not match the width of narrow triggers (setting this to `'min'` will not override this).*
   */
  matchTriggerWidth?: true | false | 'min';
  /**
   * Callback for when the list closes.
   */
  onClose?: () => void;
  /**
   * Callback for adding additional `onKeyPress` functionality.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /**
   * Callback for when the list opens.
   */
  onOpen?: () => void;
  /**
   * Callback to handle when an option has been selected from the dropdown.
   */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onOptionSelect?: (value: any, element?: React.ReactElement<XUIPickitem>) => void;
  /**
   * Callback for when the user types into the search box.
   */
  onSearch: (newValue: string) => void;
  /**
   * Placeholder for the input.
   */
  placeholder?: string;
  qaHook?: string;
  /**
   * Whether focus should be restricted to the dropdown while it's open.
   */
  restrictFocus?: boolean;
  /**
   * If you want to throttle the input's `onChange` handler, put the throttle interval here.
   */
  searchThrottleInterval?: number;
  /**
   * Value that should be inside the input.
   */
  searchValue?: string;
  /**
   * Will be passed directly down to the `XUIDropdownToggled` component as the main trigger.
   */
  trigger: React.ReactElement;
}

export default class XUIAutocompleterSecondarySearch extends React.PureComponent<Props> {
  /**
   * Clears the value in the search box
   */
  clearValue(): void;

  /**
   * Set the state as not hidden in order to open the list
   */
  openDropdown(): void;

  /**
   * Set the state as hidden in order to close the list
   */
  closeDropdown(): void;

  /**
   * Highlights a specified item in the list
   */
  highlightItem(item: XUIPickitem): void;

  /**
   * Highlights the first item in the list
   */
  highlightFirstItem(): void;

  /**
   * Focus the input element, if visible
   */
  focusInput(): void;

  /**
   * Focuses the autocompleter input before calling onOpen
   */
  onOpen(): void;

  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: React.RefObject<HTMLElement>;
}
