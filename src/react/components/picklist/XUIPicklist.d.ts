import * as React from 'react';

import { userBreakpoints } from '../helpers/breakpoints';

interface Props {
  /**
   * Specify an ARIA label for the picklist.
   * Recommended if the picklist is being used within a dropdown.
   */
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether or not the tab-styled dropdown should be automatically hidden when the user selects something.
   * Only used when `swapAtBreakpoint` is set. Defaults to `true`.<br>
   * ⚠️ *Horizontal picklists only*
   */
  closeOnSelect?: boolean;
  /**
   * Whether to add the default layout class.
   */
  hasDefaultLayout?: boolean;
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
   * onClick handler function added to the root HTML element.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Keydown handler function added to the root HTML element.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
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
   * Defines the swap breakpoint (container width) between tab-styled dropdown and horizontal picklist.
   * Supported breakpoints are `small` (600px), `medium` (800px), `large` (1000px), and `xlarge` (1200px) or a custom `number` that represents the size of the swap breakpoint in pixels.
   *
   * ⚠️ *Horizontal picklists only*
   */
  swapAtBreakpoint?: keyof typeof userBreakpoints | number;
}

export default class XUIPicklist extends React.Component<Props> {}
