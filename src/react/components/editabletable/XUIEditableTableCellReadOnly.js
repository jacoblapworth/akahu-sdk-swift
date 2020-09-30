import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCell from './XUIEditableTableCell';
import { tableName } from './private/constants';

const baseName = `${tableName}cellreadonly`;

const XUIEditableTableCellReadOnly = ({ cellProps = {}, children, ...spreadProps }) => {
  return (
    <XUIEditableTableCell
      {...cellProps}
      {...spreadProps}
      className={cn(baseName, cellProps.className)}
    >
      {children}
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellReadOnly.propTypes = {
  cellProps: PropTypes.object,
  children: PropTypes.node,
  qaHook: PropTypes.string,
};

export default XUIEditableTableCellReadOnly;
