import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { baseClass } from './private/constants';

export default function XUIToastMessage({ className, children, qaHook }) {
  const classNames = cn(className, `${baseClass}--message`);

  return (
    <p className={classNames} data-automationid={qaHook}>
      {children}
    </p>
  );
}

XUIToastMessage.propTypes = {
  /** Adds optional class to wrapping component */
  className: PropTypes.string,
  /** Adds QA hook to wrapping component */
  qaHook: PropTypes.string,
  /** Facility to pass in custom children */
  children: PropTypes.node,
};
