import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import trashIcon from '@xero/xui-icon/icons/trash';

import { tableName } from './private/constants';
import XUIEditableTableHeadingCell from './XUIEditableTableHeadingCell';
import XUIEditableTableCellIconButton from './XUIEditableTableCellIconButton';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';
import XUIEditableTableHeadContext from './contexts/XUIEditableTableHeadContext';

const baseName = `${tableName}row`;

const XUIEditableTableRow = ({ children, className, onRemove, qaHook, ...spreadProps }) => {
  return (
    <tr className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      {children}
      <XUIEditableTableContext.Consumer>
        {({ rowOptions: { isRemovable, removeButtonAriaLabel } }) => (
          <XUIEditableTableHeadContext.Consumer>
            {isHeaderRow =>
              isRemovable &&
              (isHeaderRow ? (
                <XUIEditableTableHeadingCell style={{ width: '40px' }} /> // $xui-control-size-standard
              ) : (
                <XUIEditableTableCellIconButton
                  ariaLabel={removeButtonAriaLabel}
                  iconReference={trashIcon}
                  onClick={onRemove}
                  qaHook={`${qaHook}--button-remove`}
                />
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
  qaHook: PropTypes.string,
};

export default XUIEditableTableRow;
