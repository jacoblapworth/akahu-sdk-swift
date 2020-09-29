import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableContext from './contexts/XUIEditableTableContext';
import { tableName } from './private/constants';

const baseName = `${tableName}body`;

const XUIEditableTableBody = ({ children, className, qaHook, ...spreadProps }) => {
  const {
    dragAndDrop: { rowPlaceholder },
  } = React.useContext(XUIEditableTableContext);

  return (
    <tbody className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      {children}
      {rowPlaceholder}
    </tbody>
  );
};

XUIEditableTableBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableBody;
