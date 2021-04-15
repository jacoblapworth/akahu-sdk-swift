import sortPathData from '@xero/xui-icon/icons/sort-single';
import cn from 'classnames';
import * as React from 'react';

import { XUIEditableTableHeadingCell } from '../../../editabletable';
import { XUITableCell } from '../../../table';
import XUIIcon from '../../icon/XUIIcon';
import { tableName } from '../helpers/constants';
import generateCellProps from '../helpers/generateCellProps';
import { RowData } from '../XUITable';

interface Props<RD extends RowData> {
  activeSortKey?: string;
  generatedCellProps: ReturnType<typeof generateCellProps>;
  head: XUITableCell<RD>;
  isSortAsc?: boolean;
  onSortChange?: (newKey: string) => void;
}

class XUITableHeadingCell<RD extends RowData> extends React.PureComponent<Props<RD>> {
  sortButtonContentRef = React.createRef<HTMLDivElement>();

  render() {
    const { activeSortKey, generatedCellProps, head, isSortAsc, onSortChange } = this.props;
    const handleInteraction = () => head.props.sortKey && onSortChange?.(head.props.sortKey);
    const sortButtonClassName = `${tableName}--sortbutton`;
    const sortButtonContentClassName = `${tableName}--sortbuttoncontent`;
    const sortIconWrapperClassName = `${tableName}--sorticonwrapper`;
    const sortIconClassName = `${tableName}--sorticon`;
    const isRightAligned =
      this.sortButtonContentRef.current &&
      window?.getComputedStyle(this.sortButtonContentRef.current).textAlign === 'right';

    return (
      <XUIEditableTableHeadingCell {...generatedCellProps}>
        {head.props.sortKey ? (
          <div
            className={head.props.sortKey && sortButtonClassName}
            onClick={handleInteraction}
            onKeyDown={handleInteraction}
            role="button"
            tabIndex={0}
          >
            <div
              className={cn(
                sortButtonContentClassName,
                activeSortKey === head.props.sortKey && `${sortButtonContentClassName}-active`,
                isRightAligned && `${sortButtonContentClassName}-rightaligned`,
              )}
              ref={this.sortButtonContentRef}
            >
              {head.props.children}
              <div
                className={cn(
                  sortIconWrapperClassName,
                  activeSortKey !== head.props.sortKey && `${sortIconWrapperClassName}-hidden`,
                )}
              >
                <XUIIcon
                  className={sortIconClassName}
                  icon={sortPathData}
                  rotation={isSortAsc ? 180 : undefined}
                />
              </div>
            </div>
          </div>
        ) : (
          <span>{head.props.children}</span>
        )}
      </XUIEditableTableHeadingCell>
    );
  }
}

export default XUITableHeadingCell;