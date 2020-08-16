import * as React from 'react';

import XUIPickitem from '../picklist/XUIPickitem';

interface Props {
  /**
   * Class name to apply to the body element.
   */
  bodyClassName?: string;
  children?: React.ReactNode;
  /**
   * Items to be added to the menu's footer.
   */
  footer?: React.ReactElement;
  /**
   * Force wrapping `XUIDropdownPanel` children in a `XUIStatefulPicklist`.
   */
  forceStatefulPicklist?: boolean;
  /**
   * Items to be added to the menu's header.
   */
  header?: React.ReactElement;
  /**
   * An array of keydown keycodes to be ignored from dropdown behaviour.
   */
  ignoreKeyboardEvents?: number[];
  /**
   * Whether or not this component is hidden.
   */
  isHidden?: boolean;
  /**
   * Callback for when the highlighted item in the dropdown changes.
   */
  onHighlightChange?: (item: XUIPickitem, event?: React.MouseEvent) => void;
  /**
   * Keydown event handler.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /**
   * A generalised callback when an item has been selected.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any, item: XUIPickitem) => void;
  /**
   * Used by `XUINestedDropdown` to identify each panel.
   */
  panelId?: string;
  qaHook?: string;
  /**
   * Whether the `XUIStatefulPicklist` manages highlighting of list elements.
   */
  shouldManageInitialHighlight?: boolean;
  /**
   * Inline CSS styles to add to the root DOM node of this component.
   */
  style?: React.CSSProperties;
}

export default class XUIDropdownPanel extends React.PureComponent<Props> {
  /**
   * Used to programmatically clear the highlighted item.
   *
   * If shouldManageInitialHighlight is set to false, the highlighted item will be cleared.
   *
   * If shouldManageInitialHighlight is set to true (default), the first item will be highlighted.
   */
  clearHighlightedItem(): void;
  /**
   * Attempts to focus this element. If the element either doesn't exist yet or is set to
   * "visibility: isHidden", the component will try to focus the element again several times
   * over five seconds. If it still can't after that component will try to focus the element
   * again several times over a half second. If it still can't after that amount of time,
   * then it'll stop trying. This is to ensure that the dropdown can set focus on this panel
   * while the dropdown is going from isHidden to visible. An intermediate stage where the
   * panel's parent is set to "visibility: isHidden" is necessary to ensure that accurate
   * measurements of the DOM nodes can take place and the dropdown can be properly positioned.
   * This will basically attempt to wait that process out and set focus after everything is done.
   */
  focus(): void;
  /**
   * Public API that can be used to simulate a keydown event on the panel. Useful
   * if you want to allow keyboard navigation of a child picklist while keeping
   * the focus elsewhere in the DOM.
   */
  onKeyDown(event: React.KeyboardEvent): void;
  /**
   * Get the React virtual DOM representation of the currently highlighted element in the child `XUIStatefulPicklist` (if applicable).
   */
  getHighlighted(): XUIPickitem | null;
  /**
   * Get the ID of the currently highlighted item in the child `XUIStatefulPicklist` (if applicable).
   */
  getHighlightedId(): string | null;
  /**
   * Selects the highlighted list item, in the child `XUIStatefulPicklist` (if applicable).
   */
  selectHighlighted(): void;
  /**
   * Highlight a specific item in the child `XUIStatefulPicklist` (if applicable).
   */
  highlightItem(item: XUIPickitem, event: React.MouseEvent): void;
  /**
   * Used to highlight an item immediately after a dropdown opens.
   */
  highlightInitial(): void;
  /**
   * Highlights the first item in the list.
   */
  highlightFirstItem(): void;
  /**
   * Find the child DOM node with given ID and adjust the list box's scroll position to
   * ensure that it's in view.
   */
  scrollIdIntoView(id: string): void;
  /**
   * Determine if the currently focused DOM node is a child of this component.
   */
  hasFocus(): boolean;
  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: HTMLElement | null;
}
