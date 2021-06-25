import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';

const XUIEditableTableCell = React.forwardRef(
  ({ children, className, inlineAlignment, qaHook, ...spreadProps }, ref) => {
    const tableClassName = React.useContext(XUIEditableTableClassContext);
    const baseName = `${tableClassName}cell`;

    return (
      <td
        className={cn(baseName, className, inlineAlignment === 'end' && `${baseName}-rightaligned`)}
        data-automationid={qaHook}
        ref={ref}
        {...spreadProps}
      >
        {children}
      </td>
    );
  },
);

XUIEditableTableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inlineAlignment: PropTypes.oneOf(['end', 'start']),
  qaHook: PropTypes.string,
};

export default XUIEditableTableCell;

XUIEditableTableCell.defaultProps = {
  inlineAlignment: 'start',
};
