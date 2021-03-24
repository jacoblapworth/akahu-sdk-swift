import tableIcon from '@xero/xui-icon/icons/table';
import * as React from 'react';

import {
  XUIEditableTableBody,
  XUIEditableTableCell,
  XUIEditableTableRow,
} from '../../../editabletable';
import XUIIcon from '../../../icon';
import { XUITableColumn } from '../../../table';
import { XUIIconData } from '../../icon/XUIIcon';
import { tableName } from '../helpers/constants';
import XUITable, { RowData } from '../XUITable';
import XUITableBodyRow from './XUITableBodyRow';

interface BaseProps<RD extends RowData> {
  activeSortKey?: string;
  checkOneRowAriaLabel?: React.ReactNode;
  checkedRowIds: string[];
  columns: Array<XUITableColumn<RD>>;
  createOverflowMenu?: (rowData: RD) => React.ReactNode;
  disabledRowIds: string[];
  emptyMessage?: React.ReactNode;
  emptyStateComponent?: React.ReactNode;
  emptyStateIcon?: XUIIconData;
  hasCheckbox?: boolean;
  hasOverflowMenu?: boolean;
  isLoading?: boolean;
  isSortAsc?: boolean;
  isTruncated?: boolean;
  loaderAriaLabel?: string;
  onCheckOneToggle?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onRowClick?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    rowData: RD,
  ) => void;
  overflowMenuTitle?: string;
  qaHook?: string;
  rows: {
    [rowId: string]: RD;
  };
  shouldRowClick?: (rowData: RD) => boolean;
  sortRows: React.ComponentProps<typeof XUITable>['customSort'];
}

type Props<RD extends RowData> = BaseProps<RD>;

class XUITableBody<RD extends RowData = RowData> extends React.PureComponent<Props<RD>> {
  render() {
    const {
      activeSortKey,
      checkedRowIds,
      checkOneRowAriaLabel,
      columns,
      createOverflowMenu,
      disabledRowIds,
      emptyMessage,
      emptyStateComponent,
      emptyStateIcon,
      hasCheckbox,
      hasOverflowMenu,
      isLoading,
      isSortAsc,
      isTruncated,
      onCheckOneToggle,
      onRowClick,
      overflowMenuTitle,
      qaHook,
      rows,
      shouldRowClick,
      sortRows,
    } = this.props;

    const rowsData = Object.entries(rows).map(
      ([rowId, rowData]) => ({ ...rowData, _id: rowId } as RD & { _id: string }),
    );
    const sortedRowsData = activeSortKey
      ? sortRows(rowsData, Boolean(isSortAsc), activeSortKey)
      : rowsData;

    return (
      <XUIEditableTableBody>
        {sortedRowsData.map(rowData => {
          const rowId = rowData._id;
          return (
            <XUITableBodyRow
              checkOneRowAriaLabel={checkOneRowAriaLabel}
              className={rowData.rowClassName}
              columns={columns}
              hasCheckbox={hasCheckbox}
              hasOverflowMenu={Boolean(hasOverflowMenu && createOverflowMenu)}
              isRowChecked={checkedRowIds.includes(rowId)}
              isRowDisabled={disabledRowIds.includes(rowId)}
              isTruncated={isTruncated}
              key={rowId}
              onCheckRow={event => onCheckOneToggle?.(event, rowId)}
              onRowClick={event => shouldRowClick?.(rowData) && onRowClick?.(event, rowData)}
              overflowMenu={createOverflowMenu?.(rowData)}
              overflowMenuTitle={overflowMenuTitle}
              rowData={rowData}
              shouldRowClick={shouldRowClick?.(rowData)}
            />
          );
        })}
        {!isLoading && sortedRowsData.length === 0 && (
          <XUIEditableTableRow>
            <XUIEditableTableCell
              colSpan={
                columns.length + [hasCheckbox, hasOverflowMenu].filter(value => value).length
              }
            >
              <div
                className={`${tableName}--alert`}
                data-automationid={qaHook && `${qaHook}-empty`}
              >
                {emptyStateComponent || (
                  <div className={`${tableName}--emptystate`}>
                    <XUIIcon icon={emptyStateIcon || tableIcon} isBoxed size="large" />
                    <div>{emptyMessage}</div>
                  </div>
                )}
              </div>
            </XUIEditableTableCell>
          </XUIEditableTableRow>
        )}
      </XUIEditableTableBody>
    );
  }
}

export default XUITableBody;
