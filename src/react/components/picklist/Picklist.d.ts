import React from 'react';

import { userBreakpoints } from '../helpers/breakpoints';

interface BaseProps {
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
}
interface VerticalProps {
  /**
   * Whether to render as horizontal pickitems.
   */
  isHorizontal?: false;
  /**
   * When true checkboxes will be added to the layout of the child components.
   */
  isMultiselect?: boolean;
}
interface HorizontalProps {
  isHorizontal: true;
  /**
   * Defines the swap breakpoint (container width) between tab-styled dropdown and horizontal
   * picklist.
   */
  swapAtBreakpoint?: keyof typeof userBreakpoints;
}

type DirectionalProps = VerticalProps | HorizontalProps;
type Props = BaseProps & DirectionalProps;

export default class Picklist extends React.Component<Props> {}
