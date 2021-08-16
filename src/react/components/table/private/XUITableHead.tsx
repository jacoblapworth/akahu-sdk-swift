import cn from 'classnames';
import * as React from 'react';

import XUICheckbox from '../../../checkbox';
import {
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow,
} from '../../../editabletable';
import { XUITableCell, XUITableColumn } from '../../../table';
import { tableName } from '../helpers/constants';
import generateCellProps from '../helpers/generateCellProps';
import { RowData } from '../XUITable';
import XUITableHeadingCell from './XUITableHeadingCell';

interface Props<RD extends RowData> {
  activeSortKey?: string;
  checkAllRowsAriaLabel?: React.ReactNode;
  columns: Array<XUITableColumn<RD>>;
  hasCheckbox?: boolean;
  hasOverflowMenu?: boolean;
  isSelectAllChecked?: boolean;
  isSelectAllDisabled?: boolean;
  isSelectAllIndeterminate?: boolean;
  isSortAsc?: boolean;
  isTruncated?: boolean;
  onCheckAllToggle?: React.ChangeEventHandler<HTMLInputElement>;
  onSortChange?: (newKey: string) => void;
  qaHook?: string;
}

class XUITableHead<RD extends RowData> extends React.PureComponent<Props<RD>> {
  render() {
    const {
      activeSortKey,
      columns,
      checkAllRowsAriaLabel,
      hasCheckbox,
      hasOverflowMenu,
      isSelectAllChecked,
      isSelectAllDisabled,
      isSelectAllIndeterminate,
      isSortAsc,
      isTruncated,
      onCheckAllToggle,
      onSortChange,
      qaHook,
    } = this.props;

    return (
      <XUIEditableTableHead qaHook={qaHook}>
        <XUIEditableTableRow>
          {hasCheckbox && (
            <XUIEditableTableHeadingCell
              className={cn(`${tableName}cell`, `${tableName}cell-action`)}
            >
              {onCheckAllToggle && (
                <XUICheckbox
                  className={`${tableName}--checkbox-head`}
                  excludeFromRangeSelection
                  isChecked={isSelectAllChecked}
                  isDisabled={isSelectAllDisabled}
                  isGrouped
                  isIndeterminate={isSelectAllIndeterminate}
                  isLabelHidden
                  onChange={onCheckAllToggle}
                  qaHook={`${qaHook}-checkbox`}
                >
                  {checkAllRowsAriaLabel}
                </XUICheckbox>
              )}
            </XUIEditableTableHeadingCell>
          )}
          {columns
            .map((column, columnIndex) => {
              if (!React.isValidElement(column)) {
                return null;
              }

              const cells = React.Children.toArray(column.props.head) as Array<XUITableCell<RD>>;
              return cells.map(head => (
                <XUITableHeadingCell
                  activeSortKey={activeSortKey}
                  generatedCellProps={generateCellProps(
                    head,
                    column,
                    columnIndex,
                    columns,
                    Boolean(head.props.onCellClick),
                    isTruncated,
                    undefined,
                    undefined,
                    hasOverflowMenu,
                    undefined,
                  )}
                  head={head}
                  isSortAsc={isSortAsc}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`head_${columnIndex}`}
                  onSortChange={onSortChange}
                />
              ));
            })
            .filter(cell => cell)}
          {hasOverflowMenu && (
            <XUIEditableTableHeadingCell
              className={cn(`${tableName}cell`, `${tableName}cell--placeholder`)}
            />
          )}
        </XUIEditableTableRow>
      </XUIEditableTableHead>
    );
  }
}

export default XUITableHead;
