import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './private/constants';

const XUIToastMessage = ({ className, children, qaHook }) => {
  const classNames = cn(className, `${baseClass}--message`);

  return (
    <p className={classNames} data-automationid={qaHook}>
      {children}
    </p>
  );
};

export default XUIToastMessage;

XUIToastMessage.propTypes = {
  /** Facility to pass in custom children */
  children: PropTypes.node,
  /** Adds optional class to wrapping component */
  className: PropTypes.string,
  /** Adds QA hook to wrapping component */
  qaHook: PropTypes.string,
};
