import React from 'react';
import PropTypes from 'prop-types';

import XUIEditableTableCell from './XUIEditableTableCell';

import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}cellreadonly`;

const XUIEditableTableCellReadOnly = ({ children, className, ...spreadProps }) => {
  return (
    <XUIEditableTableCell className={cn(baseName, className)} {...spreadProps}>
      {children}
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellReadOnly.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default XUIEditableTableCellReadOnly;
