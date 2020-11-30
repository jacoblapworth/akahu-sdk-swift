import * as React from 'react';

import XUIPickitem from '../picklist/XUIPickitem';
import { fixedWidthDropdownSizes } from './private/constants';

interface Props {
  /**
   * Will cause the dropdown to animate when closing.
   */
  animateClosed?: boolean;
  /**
   * Will cause the dropdown to animate when opening.
   */
  animateOpen?: boolean;
  /**
   * Aria role for dropdown layout element.
   */
  ariaRole?: string;
  /**
   * Class to apply to the body element of the dropdown.
   */
  bodyClassName?: string;
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether the fixed width class variant should be used for the size prop.
   */
  fixedWidth?: boolean;
  /**
   * Items to be added to the menu's footer.
   */
  footer?: React.ReactElement;
  /**
   * Force the desktop UI, even if the viewport is narrow enough for mobile.
   */
  forceDesktop?: boolean;
  /**
   * Force wrapping `XUIDropdownPanel` children in a `XUIStatefulPicklist`.
   */
  forceStatefulPicklist?: boolean;
  /**
   * Whether or not the dropdown should take focus and handle keyboard events automatically.
   */
  hasKeyboardEvents?: boolean;
  /**
   * The header element.
   */
  header?: React.ReactElement;
  /**
   * DOM ID of the list.
   */
  id?: string;
  /**
   * An array of keydown keycodes to be ignored from dropdown behaviour.
   */
  ignoreKeyboardEvents?: number[];
  /**
   * Whether or not this component is hidden.
   */
  isHidden?: boolean;
  /**
   * Callback for when the animation that closes the dropdown ends.
   */
  onCloseAnimationEnd?: React.EventHandler<React.AnimationEvent<HTMLDivElement>>;
  /**
   * Callback for when the highlighted item in the dropdown changes.
   */
  onHighlightChange?: (item: XUIPickitem, event?: React.MouseEvent) => void;
  /**
   * Callback for adding additional `onKeyPress` functionality.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /**
   * Callback for when animation that opens the dropdown ends.
   */
  onOpenAnimationEnd?: React.EventHandler<React.AnimationEvent<HTMLDivElement>>;
  /**
   * Callback for adding additional `onScroll` functionality.
   */
  onScroll?: React.EventHandler<React.UIEvent<HTMLElement>>;
  /**
   * A generalised callback when an item has been selected.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any, item: XUIPickitem) => void;
  qaHook?: string;
  /**
   * Whether focus should be restricted to the dropdown while it's open.
   */
  restrictFocus?: boolean;
  /**
   * Whether the `XUIStatefulPicklist` manages highlighting of list elements.
   */
  shouldManageInitialHighlight?: boolean;
  /**
   * Applies the correct XUI class based on the chosen size. Default will fit to children's width.
   */
  size?: keyof typeof fixedWidthDropdownSizes;
  /**
   * Inline styles to apply to this component's root node.
   */
  style?: React.CSSProperties;
}

export default class XUIDropdown extends React.PureComponent<Props> {
  /**
   * Used to programmatically clear the highlighted item.
   *
   * If shouldManageInitialHighlight is set to false, the highlighted item will be cleared.
   *
   * If shouldManageInitialHighlight is set to true (default), the first item will be highlighted.
   *
   */
  clearHighlightedItem(): void;

  /**
   * Get the React virtual DOM representation of the currently highlighted element.
   */
  getHighlighted(): XUIPickitem | null;

  /**
   * Get the ID of the currently highlighted element.
   */
  getHighlightedId(): string | null;

  /**
   * Highlights the previous item in the list.
   */
  highlightPrevious(currentItem: XUIPickitem): void;

  /**
   * Highlights the next item in the list.
   */
  highlightNext(currentItem: XUIPickitem): void;

  /**
   * Highlights the first item in the list.
   */
  highlightFirstItem(): void;

  /**
   * Highlights the item passed in and fires the onHighlightChange callback.
   */
  highlightItem(item: XUIPickitem, event: React.MouseEvent): void;

  /**
   * This API is used to ensure that something appropriate is highlighted. Here's the logical
   * ordering of operations:
   *
   * 1. If something's already highlighted, leave it alone.
   * 2. Try and highlight the first selected item.
   * 3. Highlight the first item in the list.
   *
   * If these rules don't apply to you - for example, if you're a search box - you can set the
   * `shouldManageInitialHighlight` prop to `false`.
   */
  highlightInitial(): void;

  /**
   * Find a child element by its ID.
   */
  findItemById(id: string): void;

  /**
   * Allows simulation of keydown events if the DOM focus is elsewhere.
   */
  onKeyDown: React.KeyboardEventHandler;

  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: HTMLElement | null;

  /**
   * Fired when either the enter key or space bar is pressed and calls onclick of the menu item
   * before closing the list.
   */
  selectHighlighted(): void;
}
