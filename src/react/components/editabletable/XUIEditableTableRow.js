import React, { PureComponent, useContext } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';
import XUIEditableTableCell from './XUIEditableTableCell';
import XUIIconButton from './../button/XUIIconButton';
import trashIcon from '@xero/xui-icon/icons/trash';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';

const baseName = `${tableName}row`;

const XUIEditableTableRow = ({ children, className, ...spreadProps }) => {
  const {
    rowOptions: { isRemovable },
  } = useContext(XUIEditableTableContext);
  return (
    <tr className={cn(baseName, className)} {...spreadProps}>
      {children}
      {isRemovable && (
        <React.Fragment>
          <XUIEditableTableCell>
            <XUIIconButton ariaLabel="Delete" icon={trashIcon} />
          </XUIEditableTableCell>
        </React.Fragment>
      )}
    </tr>
  );
};

XUIEditableTableRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
};

export default XUIEditableTableRow;
