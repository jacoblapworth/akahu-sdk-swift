import * as React from 'react';

import { XUIEditableTableHeadingCell } from '../../../editabletable';
import { XUITableCell } from '../../../table';
import generateCellProps from '../helpers/generateCellProps';
import { RowData } from '../XUITable';

interface Props<RD extends RowData> {
  activeSortKey?: string;
  generatedCellProps: ReturnType<typeof generateCellProps>;
  head: XUITableCell<RD>;
  inlineAlignment?: 'start' | 'end';
  isSortAsc?: boolean;
  onSortChange?: (newKey: string) => void;
}

class XUITableHeadingCell<RD extends RowData> extends React.PureComponent<Props<RD>> {
  render() {
    const {
      activeSortKey,
      generatedCellProps,
      head,
      inlineAlignment,
      isSortAsc,
      onSortChange,
    } = this.props;

    return (
      <XUIEditableTableHeadingCell
        isSortActive={activeSortKey === head.props.sortKey}
        isSortAsc={isSortAsc}
        onSortChange={head.props.sortKey ? () => onSortChange?.(head.props.sortKey!) : undefined}
        {...generatedCellProps}
        inlineAlignment={inlineAlignment}
      >
        <span>{head.props.children}</span>
      </XUIEditableTableHeadingCell>
    );
  }
}

export default XUITableHeadingCell;
