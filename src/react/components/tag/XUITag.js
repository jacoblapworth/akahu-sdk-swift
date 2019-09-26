import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../helpers/xuiGlobalChecks';
import { baseClass, variants, sizes } from './private/constants';

const XUITag = ({ className, variant, qaHook, children, size }) => (
  <span
    className={cn(baseClass, className, variants[variant], sizes[size])}
    data-automationid={qaHook}
    role="status"
  >
    {children}
  </span>
);

XUITag.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,
  className: PropTypes.string,
  /** Variant of tag to render */
  variant: PropTypes.oneOf(Object.keys(variants)),
  /** Size of tag to render */
  size: PropTypes.oneOf(Object.keys(sizes)),
};

XUITag.defaultProps = {
  variant: 'standard',
  size: 'medium',
};

export { XUITag as default, variants, sizes };
