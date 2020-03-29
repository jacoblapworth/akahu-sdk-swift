import * as React from 'react';

import { userBreakpoints } from '../helpers/breakpoints';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether to add the default layout class.
   */
  defaultLayout?: boolean;
  /**
   * Id to be applied to the root HTML element.
   */
  id?: string;
  /**
   * Whether to render as horizontal pickitems.
   */
  isHorizontal?: boolean;
  /**
   * When true checkboxes will be added to the layout of the child components.
   *
   * ⚠️ *Vertical picklists only*
   */
  isMultiselect?: boolean;
  /**
   * Keydown handler function added to the root HTML element.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /**
   * Mousedown handler function added to the root HTML element.
   */
  onMouseDown?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
  /**
   * Additional props to pass to the root HTML element.
   */
  secondaryProps?: React.HTMLAttributes<HTMLUListElement>;
  /**
   * Whether to truncate text instead of wrapping.
   */
  shouldTruncate?: boolean;
  /**
   * Defines the swap breakpoint (container width) between tab-styled dropdown and horizontal
   * picklist.
   *
   * ⚠️ *Horizontal picklists only*
   */
  swapAtBreakpoint?: keyof typeof userBreakpoints;
}

export default class Picklist extends React.Component<Props> {}
