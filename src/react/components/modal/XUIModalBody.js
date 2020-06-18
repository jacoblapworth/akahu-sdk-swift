import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './constants';

const XUIModalBody = ({ className, children, qaHook }) => {
  const classNames = cn(`${baseClass}--body`, className);

  return (
    <div className={classNames} data-automationid={qaHook}>
      {children}
    </div>
  );
};

export default XUIModalBody;

XUIModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};
