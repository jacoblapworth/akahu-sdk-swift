import React, { PureComponent, useContext } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';
import XUIEditableTableCell from './XUIEditableTableCell';
import XUIEditableTableHeadingCell from './XUIEditableTableHeadingCell';
import XUIIconButton from './../button/XUIIconButton';
import trashIcon from '@xero/xui-icon/icons/trash';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';
import XUIEditableTableHeadContext from './contexts/XUIEditableTableHeadContext';

const baseName = `${tableName}row`;

const XUIEditableTableRow = ({ children, className, onRemove, ...spreadProps }) => {
  return (
    <tr className={cn(baseName, className)} {...spreadProps}>
      {children}
      <XUIEditableTableContext.Consumer>
        {({ rowOptions: { isRemovable } }) => (
          <XUIEditableTableHeadContext.Consumer>
            {isHeaderRow =>
              isRemovable &&
              (isHeaderRow ? (
                <XUIEditableTableHeadingCell />
              ) : (
                <XUIEditableTableCell>
                  <XUIIconButton ariaLabel="Delete" icon={trashIcon} onClick={onRemove} />
                </XUIEditableTableCell>
              ))
            }
          </XUIEditableTableHeadContext.Consumer>
        )}
      </XUIEditableTableContext.Consumer>
    </tr>
  );
};

XUIEditableTableRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  onRemove: PropTypes.func,
};

export default XUIEditableTableRow;
