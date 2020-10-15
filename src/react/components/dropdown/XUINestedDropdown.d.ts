import * as React from 'react';

import XUIPickitem from '../picklist/XUIPickitem';
import { fixedWidthDropdownSizes } from './private/constants';

interface Props {
  /**
   * Will add the closing animation class.
   */
  animateClosed?: boolean;
  /**
   * Will add the opening animation class.
   */
  animateOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * The `panelId` property of the panel which should currently be open.
   */
  currentPanelId?: string;
  /**
   * Whether the fixed width class variant should be used for the `size` prop. Does nothing if no
   * size is provided.
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
   * Whether or not the dropdown should take focus and handle keyboard events automatically.
   */
  hasKeyboardEvents?: boolean;
  /**
   * DOM ID of the list.
   */
  id?: string;
  /**
   * Pass in an array of `KeyboardEvent` keycodes to be ignored from dropdown behaviour.
   */
  ignoreKeyboardEvents?: number[];
  /**
   * Whether or not the dropdown is hidden.
   */
  isHidden?: boolean;
  /**
   * Callback for when the closing animation has stopped.
   */
  onCloseAnimationEnd?: React.EventHandler<React.AnimationEvent<HTMLDivElement>>;
  /**
   * Callback for when the highlighted item in the dropdown changes.
   */
  onHighlightChange?: (item: XUIPickitem, event?: React.MouseEvent) => void;
  /**
   * Callback for when animation has ended on open.
   */
  onOpenAnimationEnd?: React.EventHandler<React.AnimationEvent<HTMLDivElement>>;
  /**
   * Callback for when the open `XUIDropdownPanel` changes. Receives the name of the selected panel,
   * and the previously selected panel.
   */
  onPanelChange?: (currentPanel: string, previousPanel: string) => void;
  /**
   * Enable a generalised callback when an item has been selected.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any, item: XUIPickitem) => void;
  qaHook?: string;
  /**
   * Applies correct XUI class based on prop value. Default will fit to children's width.
   */
  size?: keyof typeof fixedWidthDropdownSizes;
  /**
   * Style attribute on the dropdown node.
   */
  style?: React.CSSProperties;
}

export default class XUINestedDropdown extends React.PureComponent<Props> {}
