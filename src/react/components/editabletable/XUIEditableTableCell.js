import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}cell`;

const XUIEditableTableCell = ({ children, className, ...spreadProps }) => {
  return (
    <td className={cn(baseName, className)} {...spreadProps}>
      {children}
    </td>
  );
};

XUIEditableTableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default XUIEditableTableCell;
