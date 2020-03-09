import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}row`;

const XUIEditableTableRow = ({ children, className, ...spreadProps }) => {
  return (
    <div className={cn(baseName, className)} {...spreadProps}>
      {children}
    </div>
  );
};

XUIEditableTableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default XUIEditableTableRow;
