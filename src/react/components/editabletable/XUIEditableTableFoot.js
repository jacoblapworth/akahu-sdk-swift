import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}foot`;

const XUIEditableTableFoot = ({ children, className, qaHook, ...spreadProps }) => {
  return (
    <tfoot className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      {children}
    </tfoot>
  );
};

XUIEditableTableFoot.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableFoot;
