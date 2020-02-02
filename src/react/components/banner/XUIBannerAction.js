import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../../button.ts';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIBannerAction({ className, qaHook, onClick, href, isLink, children }) {
  const buttonClassName = cn(className, `${ns}-button-small`);
  const buttonQaHook = qaHook && `${qaHook}--button`;

  return (
    <li className={`${ns}-banner--action`} data-automationid={qaHook}>
      <XUIButton
        className={buttonClassName}
        href={href}
        isLink={isLink}
        onClick={onClick}
        qaHook={buttonQaHook}
        size="small"
        variant="link"
      >
        {children}
      </XUIButton>
    </li>
  );
}

XUIBannerAction.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  qaHook: PropTypes.string,
  /** Click event handler for the banner action */
  onClick: PropTypes.func,
  /** URL of the link */
  href: PropTypes.string,
  /** Whether or not to render this button using an anchor element */
  isLink: PropTypes.bool,
};

XUIBannerAction.defaultProps = {
  isLink: false,
};
