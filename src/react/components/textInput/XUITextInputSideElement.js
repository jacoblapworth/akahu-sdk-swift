import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { sideElementBaseClass, typeClasses } from './private/constants';

const XUITextInputSideElement = ({
  alignment,
  backgroundColor,
  children,
  className,
  qaHook,
  type,
}) => {
  const classes = cn(
    sideElementBaseClass,
    className,
    `${sideElementBaseClass}-align-${alignment}`,
    typeClasses[type],
    backgroundColor && `${sideElementBaseClass}-${backgroundColor}`,
    backgroundColor && `${sideElementBaseClass}-has-background`,
  );

  return (
    <div className={classes} data-automationid={qaHook}>
      {children}
    </div>
  );
};

export default XUITextInputSideElement;

XUITextInputSideElement.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,
  /** Classes to apply to the container element */
  className: PropTypes.string,
  /** The background colour for the side element - should only be used with
   * icons where appropriate */
  backgroundColor: PropTypes.string,
  /** Vertical alignment of the content */
  alignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  /** Type of the contents being used */
  type: PropTypes.oneOf(Object.keys(typeClasses)),
};

XUITextInputSideElement.defaultProps = {
  alignment: 'top',
  type: 'icon',
};
