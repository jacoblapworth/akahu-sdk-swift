import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-overview`;

const XUIOverviewBlock = ({
  children,
  className,
  hasBackground,
  hasBorder,
  hasLayout,
  qaHook,
  textAlignment,
  ...spreadProps
}) => {
  const classes = cn(
    baseClass,
    className,
    hasBorder && `${baseClass}-has-border`,
    hasBackground && `${baseClass}-solid`,
    `${baseClass}-text-align-${textAlignment}`,
    hasLayout && `${baseClass}-layout`,
  );

  return (
    <div {...spreadProps} className={classes} data-automationid={qaHook}>
      {children}
    </div>
  );
};

export default XUIOverviewBlock;

XUIOverviewBlock.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Whether the block should have a solid background. Defaults to true */
  hasBackground: PropTypes.bool,
  /** Whether to show wrapping border on the entire block. Defaults to true */
  hasBorder: PropTypes.bool,
  /**
   * Applies default layout styling.
   */
  hasLayout: PropTypes.bool,
  qaHook: PropTypes.string,
  /** How to align text, generally, across all sections */
  textAlignment: PropTypes.oneOf(['left', 'center', 'right']),
};

XUIOverviewBlock.defaultProps = {
  hasBackground: true,
  hasBorder: true,
  hasLayout: true,
  textAlignment: 'center',
};
