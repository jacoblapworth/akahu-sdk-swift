import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}row`;

const XUIEditableTableRow = ({ children, className, ...spreadProps }) => {
  return (
    <tr className={cn(baseName, className)} {...spreadProps}>
      {children}
    </tr>
  );
};

XUIEditableTableRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
};

export default XUIEditableTableRow;
