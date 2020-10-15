import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const XUIBannerActions = ({ children, className, qaHook }) => {
  const actionsClassName = cn(className, `${ns}-banner--actions`);

  return (
    <ul className={actionsClassName} data-automationid={qaHook}>
      {children}
    </ul>
  );
};

export default XUIBannerActions;

XUIBannerActions.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  qaHook: PropTypes.string,
};
