import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';

const XUIEditableTableCell = React.forwardRef(
  ({ children, className, qaHook, ...spreadProps }, ref) => {
    const tableClassName = React.useContext(XUIEditableTableClassContext);
    const baseName = `${tableClassName}cell`;

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
