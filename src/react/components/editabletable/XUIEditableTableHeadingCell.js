import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}headingcell`;

const XUIEditableTableHeadingCell = ({ children, className, qaHook, ...spreadProps }) => {
  // TODO: sort out how we’re going to handle text alignment and add some logic here
  const cellClassName = cn(baseName, className, `${baseName}-leftaligned`);

  return (
    <th className={cellClassName} data-automationid={qaHook} {...spreadProps}>
      {children}
    </th>
  );
};

XUIEditableTableHeadingCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableHeadingCell;
