import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import { baseClass } from './private/constants';

const XUIToastAction = ({ children, className, href, qaHook, ...props }) => (
  <XUIButton
    {...props}
    className={cn(className, `${baseClass}--action`)}
    href={href}
    isLink={!!href}
    qaHook={qaHook}
    size="small"
    variant="borderless-main"
  >
    {children}
  </XUIButton>
);

export default XUIToastAction;

XUIToastAction.propTypes = {
  /** Facility to pass in custom children */
  children: PropTypes.node,
  /** Adds optional class to wrapping component */
  className: PropTypes.string,
  /** Turns the button into a link and gives it the href you provide */
  href: PropTypes.string,
  /** Adds QA hook to wrapping component */
  qaHook: PropTypes.string,
  /** Typically internal prop that, when used with the new XUIActions component,
   * removes the extra `<ul>` wrapping element */
  usesActions: PropTypes.bool,
};
