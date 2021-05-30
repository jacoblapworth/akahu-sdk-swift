import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCell from './XUIEditableTableCell';
import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';

const XUIEditableTableCellReadOnly = ({ cellProps = {}, children, ...spreadProps }) => {
  const tableClassName = React.useContext(XUIEditableTableClassContext);
  const baseName = `${tableClassName}cellreadonly`;

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
