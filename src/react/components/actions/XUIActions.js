import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-actions`;

const XUIActions = ({
  children,
  className,
  hasLayout,
  isLinear,
  primaryAction,
  qaHook,
  secondaryAction,
  tagName,
  ...spreadProps
}) => {
  const classes = cn(
    baseClass,
    className,
    hasLayout && `${baseClass}-layout`,
    isLinear && `${baseClass}-linear`,
  );
  const Tag = tagName;

  const clonedPrimary =
    primaryAction &&
    React.cloneElement(primaryAction, {
      className: cn(`${baseClass}--primary`, primaryAction.props.className),
    });

  const clonedSecondary =
    secondaryAction &&
    React.cloneElement(secondaryAction, {
      className: cn(`${baseClass}--secondary`, secondaryAction.props.className),
    });

  return (
    <Tag {...spreadProps} className={classes} data-automationid={qaHook}>
      {children}
      {clonedPrimary}
      {clonedSecondary}
    </Tag>
  );
};

export default XUIActions;

XUIActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Applies standard layout settings. Defaults to true
   */
  hasLayout: PropTypes.bool,
  /**
   * Splits buttons to left and right for a linear flow. Can be combined with hasLayout
   */
  isLinear: PropTypes.bool,
  /**
   * XUIButton to style as primary. Alternately, pass in all the children
   */
  primaryAction: PropTypes.element,
  qaHook: PropTypes.string,
  /**
   * XUIButton to style as secondary
   */
  secondaryAction: PropTypes.element,
  /**
   * Wrapper element tag type, for semantic purposes (eg. panel footers). Defaults to "div"
   */
  tagName: PropTypes.string,
};

XUIActions.defaultProps = {
  hasLayout: true,
  tagName: 'div',
};
