import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}foot`;

const XUIEditableTableFoot = ({ children, className, ...spreadProps }) => {
  return (
    <div className={cn(baseName, className)} {...spreadProps}>
      {children}
    </div>
  );
};

XUIEditableTableFoot.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default XUIEditableTableFoot;
