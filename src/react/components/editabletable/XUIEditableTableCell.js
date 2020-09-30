import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}cell`;

const XUIEditableTableCell = React.forwardRef(
  ({ children, className, qaHook, ...spreadProps }, ref) => {
    return (
      <td className={cn(baseName, className)} data-automationid={qaHook} ref={ref} {...spreadProps}>
        {children}
      </td>
    );
  },
);

XUIEditableTableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableCell;
