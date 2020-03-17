import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}headingcell`;

const XUIEditableTableHeadingCell = ({ children, className, qaHook, ...spreadProps }) => {
  return (
    <th className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      {children}
    </th>
  );
};

XUIEditableTableHeadingCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableHeadingCell;
