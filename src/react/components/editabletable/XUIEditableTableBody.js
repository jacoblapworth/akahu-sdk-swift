import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}body`;

const XUIEditableTableBody = ({ children, className, qaHook, ...spreadProps }) => {
  return (
    <tbody className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      {children}
    </tbody>
  );
};

XUIEditableTableBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableBody;
