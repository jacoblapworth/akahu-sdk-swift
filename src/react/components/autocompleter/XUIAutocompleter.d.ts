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
   * Maps to the `closeOnTab` property of the `XUIDropdownToggled` component.
   */
  closeOnTab?: boolean;
  /**
   * Whether the pills should wrap instead of scroll on overflow.
   */
  disableWrapPills?: boolean;
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
   * ID to be added to the dropdown element of the completer.
   */
  dropdownId?: string;
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
   * Hint message to show under the input.
   */
  hintMessage?: React.ReactNode;
  /**
   * ID to be added to the root node of the completer.
   */
  id?: string;
  /**
   * CSS class(es) to go on the input.
   */
  inputClassName?: string;
  /**
   * CSS class(es) to go on the input container component.
   */
  inputContainerClassName?: string;
  /**
   * ID to apply to the input element. Useful for labels.
   */
  inputId?: string;
  /**
   * Label to show above the input, or for accessibility when the input label is hidden
   */
  inputLabel?: React.ReactNode;
  /**
   * Attributes to set on the native input element.
   *
   * **Note:** *It's not recommended to pass `autoFocus` to `inputProps` as it hijacks the focus on
   * load to focus that specific element.*
   */
  inputProps?:
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>
    | React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Whether to render as disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether to use the field layout classes.
   *
   * Defaults to false. *
   */
  isFieldLayout?: boolean;
  /**
   * Whether to hide the label and apply it as an ARIA label instead.
   *
   * Defaults to visible.
   */
  isInputLabelHidden?: boolean;
  /**
   * Whether the current input value is invalid.
   */
  isInvalid?: boolean;
  /**
   * Whether the underlying DropdownToggled component uses the "legacy" (portaled) display.
   *
   * Defaults to "true."
   */
  isLegacyDisplay?: boolean;
  /**
   * When set to true a loader will be displayed instead of the picklist items. State for this
   * should be managed externally.
   *
   * Defaults to `false`.
   */
  isLoading?: boolean;
  /**
   * Left element to render within the `XUITextInput` component. Should not be used together with
   * the `pills` prop.
   */
  leftElement?: React.ReactNode;
  /**
   * Accessibility label for the `XUILoader`. This is required if the `isLoading` prop is set to
   * `true`.
   *
   * Recommended English value: *Loading*
   */
  loadingAriaLabel?: string;
  /**
   * Setting this to `true` makes the dropdown as wide as the trigger.
   *
   * **Note:** *If you have set a `dropdownSize` prop, this will be changed to `false`.*
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
   * Max length of the input.
   */
  maxLength?: number;
  /**
   * Callback to handle when a pill has been backspaced.
   */
  onBackspacePill?: () => void;
  /**
   * Callback for when the list closes.
   */
  onClose?: () => void;
  /**
   * Callback for when the highlighted item changes.
   */
  onHighlightChange?: (item: XUIPickitem) => void;
  /**
   * Callback for adding additional `onKeyDown` functionality.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /**
   * Callback for when the list opens.
   */
  onOpen?: () => void;
  /**
   * Callback to handle when an option has been selected from the dropdown.
   */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onOptionSelect?: (value: any, element?: XUIPickitem) => void;
  /**
   * Callback for when the user types into the search box. The argument passed in is the search term
   * value.
   */
  onSearch?: (newValue: string) => void;
  /**
   * When set to true the dropdown will automatically open when the input is given focus.
   */
  openOnFocus?: boolean;
  /**
   * A set of pills to show next to input. Useful for showing what was selected in a multi-select.
   * Can also be used similarly to `XUITextInput`'s `leftElement`.
   */
  pills?: React.ReactNode;
  /**
   * Placeholder for the input.
   */
  placeholder?: string;
  qaHook?: string;
  /**
   * Right element to render within the `XUITextInput` component.
   */
  rightElement?: React.ReactNode;
  /**
   * The debounce timeout before `onSearch` is called. Set to `0` to disable debouncing.
   */
  searchDebounceTimeout?: number;
  /**
   * Value that should be inside the input.
   */
  searchValue?: string;
  /**
   * CSS class(es) to go on the trigger element which contains the input and pills.
   */
  triggerClassName?: string;
  /**
   * Whether or not to use the new focus behaviour - which treats dropdown navigation
   * like a `combobox` role. Defaults to `false`.
   * */
  useNewFocusBehaviour?: boolean;
  /**
   * Validation message to show under the input if `isInvalid` is true.
   */
  validationMessage?: React.ReactNode;
}

export default class XUIAutocompleter extends React.PureComponent<Props> {
  /**
   * Set the state as hidden in order to toggle the list closed.
   */
  closeDropdown(): void;

  /**
   * Focuses the text input.
   */
  focusInput(): void;

  /**
   * Manually highlight an item in the list for selection.
   */
  highlightItem(item: XUIPickitem): void;

  /**
   * Set the state as not hidden in order to toggle the list open.
   */
  openDropdown(): void;

  /**
   * If an onHighlightChange prop is passed to the completer, it's called passing in the highlighted
   * item.
   */
  onHighlightChange(item: XUIPickitem): void;

  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: React.Ref<HTMLElement>;

  /**
   * Ref to the dropdown trigger of the autocompleter.
   */
  tg: React.Ref<HTMLElement>;

  /**
   * Ref to the placeholder element.
   */
  placeholder: React.Ref<HTMLElement>;

  /**
   * Ref to the XUIDropdownToggled component used in the autocompleter.
   */
  ddt: React.Ref<HTMLElement>;

  /**
   * Ref to the text input element.
   */
  inputNode: React.RefObject<HTMLElement>;
}
