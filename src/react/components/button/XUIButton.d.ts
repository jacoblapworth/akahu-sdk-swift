import * as React from 'react';

import { XUIIconData } from '../icon/XUIIcon';
import {
  buttonTypes,
  sizeClassNames,
  textButtonVariants,
  widthClassNames,
} from './private/constants';

interface BaseProps {
  /**
   * Optional prop for users to modify the Button caret icon, if required for localisation.
   * Defaults to the caret icon, if no value is provided.
   */
  caretIcon?: XUIIconData;
  children?: React.ReactNode;
  className?: string;
  /**
   * Modifier for the width of the button.
   */
  fullWidth?: keyof typeof widthClassNames;
  /**
   * Use this to specify whether this button will have a dropdown caret.
   */
  hasCaret?: boolean;
  /**
   * The `href` attribute to use on the anchor element.
   *
   * Ignored unless `isLink` is `true`.
   */
  href?: string;
  /**
   * Determines if the button is disabled or not.
   */
  isDisabled?: boolean;
  /**
   * If true, sets appropriate `rel` values to prevent new page from having access to
   * `window.opener`. Should be used for links pointing at external sites.
   *
   * Ignored unless `isLink` is `true`.
   */
  isExternalLink?: boolean;
  /**
   * If this button is part of a parent button group.
   */
  isGrouped?: boolean;
  /**
   * Applies inverted styling.
   */
  isInverted?: boolean;
  /**
   * Whether or not to render this button using an anchor tag.
   */
  isLink?: boolean;
  /**
   * If true, shows a loader inside the button and also disables the button to prevent clicking. Can
   * be used in conjunction with `isDisabled` (which also provides a disabled class).
   */
  isLoading?: boolean;
  /**
   * Icon to appear to the left of the button content.
   */
  leftIcon?: React.ReactNode;
  /**
   * Accessibility label for the `XUILoader`. This is required if the `isLoading` prop is set to
   * `true`.
   */
  loadingAriaLabel?: string;
  /**
   * Use this to specify a min width on the button, when you want to swap to loading states.
   */
  minLoaderWidth?: boolean;
  /**
   * Bind a function to fire when the button is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * A keydown event handler for the button.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  qaHook?: string;
  /**
   * The `rel` attribute to use on the anchor element.
   *
   * Ignored unless `isLink` is `true`.
   */
  rel?: string;
  /**
   * When used with `isLoading` this allows the button to retain children width.
   */
  retainLayout?: boolean;
  /**
   * Icon to appear to the right of the button content.
   */
  rightIcon?: React.ReactNode;
  /**
   * Modifier for the size of the button. Buttons with `variant` set to `unstyled` will ignore the
   * `size` property.
   */
  size?: keyof typeof sizeClassNames;
  /**
   * The HTML `tabIndex` attribute value.
   */
  tabIndex?: number;
  /**
   * The `target` attribute to use on the anchor element.
   *
   * Ignored unless `isLink` is `true`.
   */
  target?: string;
  /**
   * The `title` attribute.
   */
  title?: string;
  /**
   * The type attribute of this button.
   *
   * Ignored unless `isLink` is `false`.
   */
  type?: keyof typeof buttonTypes;
  /**
   * Determines the styling variation to apply.
   */
  variant?: keyof typeof textButtonVariants;
}

type SpreadProps =
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
  | React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = BaseProps & SpreadProps;

export default class XUIButton extends React.PureComponent<Props> {
  /**
   * Focus the button.
   */
  focus(): void;
  /**
   * Check if the button has focus.
   */
  hasFocus(): boolean;
  /**
   * Root node of XUICompleter to enable users to access as a ref.
   */
  rootNode: HTMLElement | null;
}
