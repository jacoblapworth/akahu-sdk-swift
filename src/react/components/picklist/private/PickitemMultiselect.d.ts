import * as React from 'react';

export interface Props {
  checkboxClassName?: string;
  children?: React.ReactNode;
  /**
   * The disabled behaviour and styles are applied when this is true
   */
  isDisabled?: boolean;
  isSelected?: boolean;
  onBlur?: React.MouseEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
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
}

export default class PickitemMultiselect extends React.PureComponent<Props> {}
