import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../../button';
import { ns } from '../helpers/xuiClassNamespace';

const XUIBannerAction = ({ className, qaHook, onClick, href, isLink, children }) => {
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
        variant="borderless-primary"
      >
        {children}
      </XUIButton>
    </li>
  );
};

export default XUIBannerAction;

XUIBannerAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** URL of the link */
  href: PropTypes.string,
  /** Whether or not to render this button using an anchor element */
  isLink: PropTypes.bool,
  /** Click event handler for the banner action */
  onClick: PropTypes.func,
  qaHook: PropTypes.string,
};

XUIBannerAction.defaultProps = {
  isLink: false,
};
