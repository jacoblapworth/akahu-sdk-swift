import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';

const XUIEditableTable = ({ children, className, rowOptions, ...spreadProps }) => {
  return (
    <table className={cn(tableName, className)} {...spreadProps}>
      <XUIEditableTableContext.Provider value={{ rowOptions: { ...rowOptions } }}>
        {children}
      </XUIEditableTableContext.Provider>
    </table>
  );
};

XUIEditableTable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  rowOptions: PropTypes.shape({ isRemovable: PropTypes.bool }),
};

export default XUIEditableTable;
