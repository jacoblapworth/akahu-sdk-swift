import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}foot`;

const XUIEditableTableFoot = ({ children, className, ...spreadProps }) => {
  return (
    <tfoot className={cn(baseName, className)} {...spreadProps}>
      {children}
    </tfoot>
  );
};

XUIEditableTableFoot.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
};

export default XUIEditableTableFoot;
