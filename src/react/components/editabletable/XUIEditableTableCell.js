import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}cell`;

const XUIEditableTableCell = ({ children, className, qaHook, width, ...spreadProps }) => {
  return (
    <td
      className={cn(baseName, className)}
      data-automationid={qaHook}
      style={{ width }}
      {...spreadProps}
    >
      {children}
    </td>
  );
};

XUIEditableTableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  width: PropTypes.string,
};

export default XUIEditableTableCell;
