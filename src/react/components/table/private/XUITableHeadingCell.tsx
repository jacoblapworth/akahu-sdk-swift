import * as React from 'react';

import { XUIEditableTableHeadingCell } from '../../../editabletable';
import { XUITableCell } from '../../../table';
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
  render() {
    const { activeSortKey, generatedCellProps, head, isSortAsc, onSortChange } = this.props;

    return (
      <XUIEditableTableHeadingCell
        isSortActive={activeSortKey === head.props.sortKey}
        isSortAsc={isSortAsc}
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        onSortChange={head.props.sortKey ? () => onSortChange?.(head.props.sortKey!) : undefined}
        {...generatedCellProps}
      >
        <span>{head.props.children}</span>
      </XUIEditableTableHeadingCell>
    );
  }
}

export default XUITableHeadingCell;
