import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const XUIBannerMessage = ({ className, children, qaHook }) => {
  const messageClassName = cn(className, `${ns}-banner--message`);

  return (
    <p className={messageClassName} data-automationid={qaHook}>
      {children}
    </p>
  );
};

export default XUIBannerMessage;

XUIBannerMessage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  qaHook: PropTypes.string,
};
