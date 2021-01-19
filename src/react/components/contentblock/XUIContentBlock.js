import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-contentblock`;

const XUIContentBlock = ({ children, className, qaHook }) => {
  const listClasses = cn(className, baseClass);

  return (
    <div className={listClasses} data-automationid={qaHook}>
      {children}
    </div>
  );
};

export default XUIContentBlock;

XUIContentBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};
