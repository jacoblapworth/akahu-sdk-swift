import * as React from 'react';

import XUIAvatar from '../avatar/XUIAvatar';
import { sizeClasses } from './private/constants';

interface BaseProps {
  /**
   * Apply classes to the outer Pill `div` element.
   */
  className?: string;
  /**
   * Specify a label attribute for the delete button.
   *
   * Recommended English value: *Delete*
   */
  deleteButtonLabel?: string;
  /**
   * Whether the pill should have a `max-width` of `200px`.
   */
  hasLimitedWidth?: boolean;
  /**
   * This will make the value an anchor element instead of a span element and adds the `href` as
   * the link.
   */
  href?: string;
  /**
   * When invalid, displays the text in a red colour.
   */
  isInvalid?: boolean;
  /** Used to control whether the secondary text (`secondaryText`) has truncation priority. Defaults to `true`,
   * along with `isValueTruncated` such that the default behaviour is that both pieces of text are truncated.
   */
  isSecondaryTextTruncated?: boolean;
  /**
   * Used to control whether the primary text (`value`) has truncation priority. Defaults to `true`,
   * along with `isSecondaryTextTruncated` such that the default behaviour is that both pieces of text are truncated.
   */
  isValueTruncated?: boolean;
  /**
   * Callback to fire when the main pill content is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Callback to fire when the delete pill button is clicked. When omitted, the delete button is
   * also ommitted from the view.
   */
  onDeleteClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Add a qahook to the component.
   */
  qaHook?: string;
  /**
   * Adds a muted secondary text for the pill, appears before the main value.
   */
  secondaryText?: React.ReactNode;
  /**
   * The size of the pill to render.
   */
  size?: keyof typeof sizeClasses;
  /**
   * When an `href` is supplied, adds a target attribute, else is ignored.
   */
  target?: string;
  /**
   * The title attribute to apply on the pill.
   */
  title?: string;
  /**
   * The text to display inside the pill.
   */
  value?: React.ReactNode;
  /**
   * @ignore
   * Dev / debug prop to show the tooltip initially on mount instead of based on a user event.
   */
  debugShowToolTip?: boolean; // eslint-disable-line typescript-sort-keys/interface
}

type AvatarProp =
  | {
      /**
       * A component to be displayed in place of the avatar for the pill.
       */
      avatar?: React.ReactNode;
    }
  | {
      /**
       * Props for the avatar to be displayed. Not providing props will omit the avatar entirely.
       *
       * **Note:** *Cannot be accepted if `avatar` is also supplied.*
       */
      avatarProps?: React.ComponentProps<typeof XUIAvatar>;
    };

type Props = BaseProps & AvatarProp;

declare const XUIPill: React.FunctionComponent<Props>;
export default XUIPill;
