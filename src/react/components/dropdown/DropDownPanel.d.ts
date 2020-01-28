import React from 'react';

import Pickitem from '../picklist/Pickitem';

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
   * Force wrapping `Panel` children in a `StatefulPicklist`.
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
  onHighlightChange?: (item: Pickitem, event?: React.MouseEvent) => void;
  /**
   * Keydown event handler.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /**
   * A generalised callback when an item has been selected.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any, item: Pickitem) => void;
  /**
   * Used by `NestedDropDown` to identify each panel.
   */
  panelId?: string;
  qaHook?: string;
  /**
   * Whether the `StatefulPicklist` manages highlighting of list elements.
   */
  shouldManageInitialHighlight?: boolean;
  /**
   * Inline CSS styles to add to the root DOM node of this component.
   */
  style?: React.CSSProperties;
}

export default class DropDownPanel extends React.PureComponent<Props> {}
