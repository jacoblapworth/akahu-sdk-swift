import React from 'react';

import { Props as PickitemBodyProps } from './private/PickitemBody';
import { Props as PickitemMultiselectProps } from './private/PickitemMultiselect';

interface Props {
  /**
   * Inherited. Whether parent list is set to render horizontal pickitems. Do not set directly.
   */
  _isHorizontal?: boolean;
  /**
   * Optional label to add to a pickitem.
   */
  ariaLabel?: string;
  /**
   * ARIA attribute defining what purpose this item serves.
   */
  ariaRole?: string;
  /**
   * Classes can be passed to the `XUICheckbox` component in `PickItemBody`.
   *
   * ⚠️ *Vertical picklists only*
   */
  checkboxClassName?: string;
  children?: React.ReactNode;
  className?: string;
  /**
   * For nested children such as checkboxes, icons or groups selected styles should be disabled.
   */
  disableSelectedStyles?: boolean;
  /**
   * Text to appear bolded as the first line. Pushes secondary to a new line.
   *
   * ⚠️ *Vertical picklists only*
   */
  headingElement?: React.ReactNode;
  /**
   * Link to be used in child, will render an anchor element if used and a button element if not.
   */
  href?: string;
  /**
   * id must be unique and unchangeable.
   */
  id: string;
  /**
   * The disabled behaviour and styles are applied when this is `true`.
   */
  isDisabled?: boolean;
  /**
   * Is the item highlighted?
   */
  isHighlighted?: boolean;
  /**
   * Is the item invalid?
   */
  isInvalid?: boolean;
  /**
   * Allows `flex-wrap`, achieving a look much like content-block. Use for `XUIAutoCompleter`.
   *
   * ⚠️ *Vertical picklists only*
   */
  isMultiline?: boolean;
  /**
   * When true a checkbox will be added to the layout of the child component.
   *
   * ⚠️ *Vertical picklists only*
   */
  isMultiselect?: boolean;
  /**
   * Is the item selected?
   */
  isSelected?: boolean;
  /**
   * Whether or not this pickitem sits next to a `NestedPicklistToggle`.
   *
   * ⚠️ *Vertical picklists only*
   */
  isSplit?: boolean;
  /**
   * Content to be added to the left of the pickitem.
   */
  leftElement?: React.ReactNode;
  /**
   * Callback on blur of the pick item.
   */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  /**
   * Callback when the pick item is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Callback on focus of the pick item.
   */
  onFocus?: React.FocusEventHandler<HTMLElement>;
  /**
   * Callback on keydown of the pick item.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /**
   * Callback when this item is selected by a parent component.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any, item: Pickitem) => void;
  /**
   * Props to pass to the pickitem body.
   */
  pickitemBodyProps?: Partial<PickitemBodyProps | PickitemMultiselectProps>;
  /**
   * Less important text to appear pinned at the right.
   *
   * Can be plain text.
   *
   * ⚠️ *Vertical picklists only*
   */
  pinnedElement?: React.ReactNode;
  /**
   * Standard text.
   *
   * Can be plain text.
   */
  primaryElement?: React.ReactNode;
  /**
   * The automation-id to add to the item.
   */
  qaHook?: string;
  /**
   * Content to be added to the right of the pickitem.
   *
   * ⚠️ *Vertical picklists only*
   */
  rightElement?: React.ReactNode;
  /**
   * Less important text to appear beside the `primaryElement`.
   *
   * Can be plain text.
   */
  secondaryElement?: React.ReactNode;
  /**
   * Whether to truncate text instead of wrapping. Where possible, please set this on the
   * containing picklist, which will override any per-item settings.
   */
  shouldTruncate?: boolean;
  /**
   * When a link is preferred, this target prop can be used on the <a> tag
   */
  target?: string;
  /**
   * The value associated with this `PickItem` which will be passed to the `onSelect` callbacks here
   * and in the StatefulPicklist
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}

export default class Pickitem extends React.PureComponent<Props> {}
