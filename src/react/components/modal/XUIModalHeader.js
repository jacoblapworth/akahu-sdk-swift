import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './constants';

const XUIModalHeader = ({ className, children, qaHook, id }) => {
  const classNames = cn(`${baseClass}--header`, `${baseClass}--heading`, className);
  return (
    <header className={classNames} data-automationid={qaHook} id={id}>
      {children}
    </header>
  );
};

export default XUIModalHeader;

XUIModalHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,

  /** Id for the modal header. Used for automatically providing a label to the modal. */
  id: PropTypes.string,
};
