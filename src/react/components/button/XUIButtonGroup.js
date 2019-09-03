import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';
import { sizeClassNames } from './private/constants';
import SizeContext from '../../contexts/SizeContext';

export default function XUIButtonGroup({ children, className, size, qaHook }) {
  return (
    <SizeContext.Provider value={size}>
      <div className={cn(className, `${ns}-buttongroup`)} data-automationid={qaHook}>
        {Children.map(children, child => cloneElement(child, { isGrouped: true }))}
      </div>
    </SizeContext.Provider>
  );
}

XUIButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Modifier for the size of the button group. `medium` value is supported. `small` and `xsmall` variants now have a `sunsetting` flag due to poor touch interaction potential.
   */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),

  qaHook: PropTypes.string,
};
