import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}head`;

const XUIEditableTableHead = ({ children, className, ...spreadProps }) => {
  return (
    <thead className={cn(baseName, className)} {...spreadProps}>
      {children}
    </thead>
  );
};

XUIEditableTableHead.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
};

export default XUIEditableTableHead;
