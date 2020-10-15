import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './constants';

const XUIModalFooter = ({ className, children, qaHook }) => {
  const classNames = cn(`${baseClass}--footer`, className);

  return (
    <footer className={classNames} data-automationid={qaHook}>
      {children}
    </footer>
  );
};

export default XUIModalFooter;

XUIModalFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};
