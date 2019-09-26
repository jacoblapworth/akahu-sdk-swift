import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './constants';

export default function XUIModalBody({ className, children, qaHook }) {
  const classNames = cn(`${baseClass}--body`, className);

  return (
    <div className={classNames} data-automationid={qaHook}>
      {children}
    </div>
  );
}

XUIModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};
