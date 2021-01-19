import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import XUIButtonGroup from './XUIButtonGroup';
import { sizeClassNames, standardVariantClassNames } from './private/constants';

const XUISplitButtonGroup = ({ children, className, isDisabled, size, variant, qaHook }) => {
  const cloneProps = { isDisabled, variant };
  return (
    <XUIButtonGroup className={className} data-automationid={qaHook} size={size}>
      {Children.map(children, child => cloneElement(child, cloneProps))}
    </XUIButtonGroup>
  );
};

export default XUISplitButtonGroup;

XUISplitButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Determines if the button is disabled or not. */
  isDisabled: PropTypes.bool,
  qaHook: PropTypes.string,
  /**
   * Modifier for the size of the split button. `medium`, `small`, or `xsmall`.
   */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),
  /**
   * Determines the styling variation to apply: `standard`, `primary`, `create`, or `negative`.
   */
  variant: PropTypes.oneOf(Object.keys(standardVariantClassNames)),
};

XUISplitButtonGroup.defaultProps = {
  variant: 'standard',
};
