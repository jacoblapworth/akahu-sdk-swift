import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './constants';

export default function XUIModalFooter({ className, children, qaHook }) {
  const classNames = cn(`${baseClass}--footer`, className);

  return (
    <footer className={classNames} data-automationid={qaHook}>
      {children}
    </footer>
  );
}

XUIModalFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};
