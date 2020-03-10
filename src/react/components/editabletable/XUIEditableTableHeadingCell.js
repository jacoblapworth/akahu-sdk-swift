import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}headingcell`;

const XUIEditableTableHeadingCell = ({ children, className, ...spreadProps }) => {
  return (
    <th className={cn(baseName, className)} {...spreadProps}>
      {children}
    </th>
  );
};

XUIEditableTableHeadingCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default XUIEditableTableHeadingCell;
