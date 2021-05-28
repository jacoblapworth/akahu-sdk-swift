import * as React from 'react';

export interface Props {
  checkboxClassName?: string;
  children?: React.ReactNode;
  className?: string;
  headingElement?: React.ReactNode;
  href?: string;
  /**
   * The disabled behaviour and styles are applied when this is true
   */
  isDisabled?: boolean;
  /**
   * Content to be added to the left of the pickitem
   */
  leftElement?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
  onMouseUp?: React.MouseEventHandler<HTMLElement>;
  /**
   * Less important text to appear pinned at the right
   */
  pinnedElement?: React.ReactNode;
  /**
   * Standard text
   */
  primaryElement?: React.ReactNode;
  qaHook?: string;
  /**
   * Content to be added to the right of the pickitem
   */
  rightElement?: React.ReactNode;
  /**
   * Less important text to appear beside primary
   */
  secondaryElement?: React.ReactNode;
  shouldTruncate?: boolean;
  tabIndex?: number;
  target?: string;
}

export default class PickitemBody extends React.PureComponent<Props> {}
