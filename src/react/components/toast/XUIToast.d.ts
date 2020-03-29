import * as React from 'react';

import { sentimentMap } from './private/constants';

interface BaseProps {
  /**
   * Custom Actions.
   */
  actions?: React.ReactNode[];
  /**
   * Facility to pass in custom children.
   */
  children?: React.ReactNode;
  /**
   * Adds optional class to wrapping component.
   */
  className?: string;
  /**
   * Applies default layout class to the component.
   */
  defaultLayout?: boolean;
  /**
   * Hides the component when set to `true`.
   */
  isHidden?: boolean;
  /**
   * Custom toast message.
   */
  message?: React.ReactNode;
  /**
   * When defined, displays the close button.
   */
  onCloseClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Handles the event for when the mouse moves out of the toast.
   */
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  /**
   * Handles the event for when the mouse hovers over the toast.
   */
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
  /**
   * Adds QA hook to wrapping component.
   */
  qaHook?: string;
  /**
   * Applies a role attribute to the toast element. This will override any component-determined
   * value.
   *
   * When given a `sentiment`, will automatically apply an appropriate role.
   *
   * Defaults to `status`.
   */
  role?: string;
  /**
   * The sentiment of the toast.
   */
  sentiment?: keyof typeof sentimentMap;
}

type ActionProps =
  | {}
  | {
      /**
       * First and primary action. Always use this one first before using `secondaryAction`.
       */
      primaryAction: React.ReactNode;
      /**
       * Secondary action.
       */
      secondaryAction?: React.ReactNode;
    };

type Props = BaseProps & ActionProps;

declare const XUIToast: React.FunctionComponent<Props>;
export default XUIToast;
