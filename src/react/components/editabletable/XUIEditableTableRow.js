import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import trashIcon from '@xero/xui-icon/icons/trash';

import { tableName } from './private/constants';
import XUIEditableTableCell from './XUIEditableTableCell';
import XUIEditableTableHeadingCell from './XUIEditableTableHeadingCell';
import XUIIconButton from './../button/XUIIconButton';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';
import XUIEditableTableHeadContext from './contexts/XUIEditableTableHeadContext';

const baseName = `${tableName}row`;

const XUIEditableTableRow = ({
  children,
  className,
  onRemove,
  qaHook,
  removeButtonAriaLabel,
  ...spreadProps
}) => {
  return (
    <tr className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
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
                  <XUIIconButton
                    ariaLabel={removeButtonAriaLabel}
                    icon={trashIcon}
                    onClick={onRemove}
                    qaHook={`${qaHook}--button-remove`}
                  />
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
  qaHook: PropTypes.string,
  removeButtonAriaLabel: PropTypes.string,
};

export default XUIEditableTableRow;
