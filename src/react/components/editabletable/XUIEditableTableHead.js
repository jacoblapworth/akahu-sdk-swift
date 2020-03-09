import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}head`;

const XUIEditableTableHead = ({ children, className, ...spreadProps }) => {
  return (
    <div className={cn(baseName, className)} {...spreadProps}>
      {children}
    </div>
  );
};

XUIEditableTableHead.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default XUIEditableTableHead;
