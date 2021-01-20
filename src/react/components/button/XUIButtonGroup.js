import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';
import { sizeClassNames } from './private/constants';
import SizeContext from '../../contexts/SizeContext';

const XUIButtonGroup = ({ children, className, size, qaHook }) => (
  <SizeContext.Provider value={size}>
    <div className={cn(className, `${ns}-buttongroup`)} data-automationid={qaHook}>
      {Children.map(children, child => cloneElement(child, { isGrouped: true }))}
    </div>
  </SizeContext.Provider>
);

export default XUIButtonGroup;

XUIButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * Modifier for the size of the button. `medium`, `small`, or `xsmall`.
   */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),
};
