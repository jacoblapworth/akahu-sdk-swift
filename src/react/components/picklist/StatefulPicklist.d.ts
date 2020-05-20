import * as React from 'react';

import Pickitem from './Pickitem';

type StatefulPicklistWrapperProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

interface Props {
  /**
   * Whether or not the user should be allowed to tab to this component.
   */
  canFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * ID of the list.
   */
  id?: string;
  /**
   * An array of keydown keycodes to be ignored from dropdown behaviour.
   */
  ignoreKeyboardEvents?: number[];
  /**
   * Whether to use left/right arrow keys to move between pickitems as opposed to up/down.
   */
  isHorizontal?: boolean;
  /**
   * Callback when the highlighted element has changed.
   */
  onHighlightChange?: (item: Pickitem, event?: React.MouseEvent) => void;
  /**
   * Enables a generalised callback when an item has been selected.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any, item: Pickitem) => void;
  qaHook?: string;
  /**
   * An object of props that can be spread on the stateful picklist, useful for aria attributes.
   */
  secondaryProps?: StatefulPicklistWrapperProps;
  /**
   * Whether the `StatefulPicklist` manages highlighting of list elements.
   */
  shouldManageInitialHighlight?: boolean;
}

export default class StatefulPicklist extends React.Component<Props> {
  /**
   * Clears the highlighted element and fires the onHighlightChange callback.
   *
   * If shouldManageInitialHighlight is set to false, the highlighted item will be cleared.
   *
   * If shouldManageInitialHighlight is set to true (default), the first item will be highlighted.
   */
  clearHighlightedItem(): void;
  /**
   * Find a child element by its ID.
   */
  findItemById(id: string): void;
  /**
   * Get the React virtual DOM representation of the currently highlighted element.
   */
  getHighlighted(): null | Pickitem;
  /**
   * Get the ID of the currently highlighted element.
   */
  getHighlightedId(): null | string;
  /**
   * Highlights the previous item in the list.
   */
  highlightPrevious(currentItem: Pickitem): void;
  /**
   * Highlights the next item in the list.
   */
  highlightNext(currentItem: Pickitem): void;
  /**
   * Highlights the first item in the list.
   */
  highlightFirst(): void;
  /**
   * Highlights the item passed in and fires the `onHighlightChange` callback.
   */
  highlightItem(item: Pickitem, event: React.MouseEvent): void;
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
   * Allows simulation of keydown events if the DOM focus is elsewhere.
   */
  onKeyDown: React.KeyboardEventHandler;
  /**
   * Fired when either the enter key or space bar is pressed and calls onclick of the menu item
   * before closing the list.
   */
  selectHighlighted(item: Pickitem): void;
}
