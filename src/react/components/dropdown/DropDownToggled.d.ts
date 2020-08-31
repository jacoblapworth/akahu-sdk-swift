import * as React from 'react';

import { dropdownPositionOptions } from './private/constants';

interface Props {
  /**
   * The "aria-haspopup" value.
   *
   * Defaults to `listbox`.
   *
   * https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup
   */
  ariaPopupType?: 'listbox' | 'menu' | 'tree' | 'grid' | 'dialog' | false;
  /**
   * Aria role for dropdown wrapper.
   */
  ariaRole?: string;
  className?: string;
  /**
   * Whether or not the dropdown should be automatically hidden when the user selects something.
   */
  closeOnSelect?: boolean;
  /**
   * Whether or not the dropdown should be automatically hidden when the user hits the tab key. Good
   * to turn this off if you've got a date picker, nested dropd down, form, or other complex
   * component inside of a dropdown.
   */
  closeOnTab?: boolean;
  /**
   * Whether scroll locking behaviour should be disabled on mobile.
   */
  disableScrollLocking?: boolean;
  /**
   * The dropdown that will be rendered when triggered.
   */
  dropdown: React.ReactNode;
  /**
   * Force the desktop UI, even if the viewport is narrow enough for mobile.
   */
  forceDesktop?: boolean;
  /**
   * Whether to allow the dropdown to take the full width of the wrapper (as `SelectBox`) or wrap
   * with an inline block.
   *
   * Defaults to `false`.
   *
   * **Note:** *This setting is only for non-legacy display.*
   */
  isBlock?: boolean;
  /**
   * Whether the dropdown is hidden on initial render.
   */
  isHidden?: boolean;
  /**
   * Use the "legacy" (portaled) display.
   *
   * Currently defaults to `true`.
   */
  isLegacyDisplay?: boolean;
  /**
   * Setting to `true` makes the dropdown as wide as the trigger.
   *
   * **Note:** *Setting this to `true` will override any `size` prop on `DropDown`.*
   *
   * **Note:** *XUI design has also decided to keep a minimum width on the dropdown, so the dropdown
   * may not match the width of narrow triggers.*
   */
  matchTriggerWidth?: boolean;
  /**
   * Setting a number here will force the maximum height of the dropdown to be the number provided
   * (in pixels) if the viewport is too big. When the viewport is smaller than this number, it still
   * shrinks, but never grows beyond that number.
   */
  maxHeight?: number;
  /**
   * Callback that gets triggered when the dropdown has finished closing.
   */
  onClose?: () => void;
  /**
   * Function to be called once the closing animation has finished.
   */
  onCloseAnimationEnd?: () => void;
  /**
   * Callback that gets triggered when the dropdown begins opening.
   */
  onOpen?: () => void;
  /**
   * Callback for when animation has ended on open.
   */
  onOpenAnimationEnd?: () => void;
  /**
   * Preferred position to display the dropdown, relative to the trigger.
   *
   * Defaults to `bottom-left`.
   *
   * **Note:** *This setting is only for non-legacy display.*
   */
  preferredPosition?: typeof dropdownPositionOptions[number];
  qaHook?: string;
  /**
   * Repositioning on scroll is usually just annoying. However, if you have a fixed position
   * trigger, it's essential to make sure that the dropdown stays next to the trigger.
   */
  repositionOnScroll?: boolean;
  /**
   * Whether or not we should set a `maxHeight` on the dropdown to restrict it to the window.
   */
  restrictToViewPort?: boolean;
  /**
   * Element used to trigger the dropdown opening/closing (typically a button).
   */
  trigger: React.ReactNode;
  /**
   * What action to take when the user clicks the trigger. Default is to toggle the dropdown
   * open/close. Can just open ('open') or do nothing ('none').
   */
  triggerClickAction?: 'none' | 'open' | 'toggle';
  /**
   * Space between trigger and dropdown, in pixels.
   *
   * Defaults to `6`.
   *
   * **Note:** *This setting is only for non-legacy display.*
   */
  triggerDropdownGap?: number;
}

export default class DropDownToggled extends React.PureComponent<Props> {
  /**
   * Hide the dropdown.
   */
  closeDropDown(): void;

  /**
   * Determine if the dropdown is currently open.
   */
  isDropDownOpen(): boolean;

  /**
   * Show the dropdown.
   */
  openDropDown(): void;

  /**
   * Force the dropdown to reposition itself relative to the current position of the trigger.
   */
  repositionDropDown(): void;

  /**
   * A convenience method to toggle the visibility of the dropdown.
   */
  toggle(): void;
}
