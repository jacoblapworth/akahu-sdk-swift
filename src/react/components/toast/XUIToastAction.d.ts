import React from 'react';

import { Props as XUIButtonProps } from '../button/XUIButton';

interface Props extends XUIButtonProps {
  /**
   * Facility to pass in custom children.
   */
  children?: React.ReactNode;
  /**
   * Adds optional class to wrapping component.
   */
  className?: string;
  /**
   * Turns the button into a link and gives it the `href` you provide.
   */
  href?: string;
  /**
   * Adds QA hook to wrapping component.
   */
  qaHook?: string;
  /**
   * Typically internal prop that, when used with the `XUIActions` component, removes the extra `ul`
   * wrapping element.
   */
  usesActions?: boolean;
}

declare const XUIToastAction: React.FunctionComponent<Props>;
export default XUIToastAction;
