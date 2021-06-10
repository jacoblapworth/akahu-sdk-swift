import cn from 'classnames';

import { XUITableCell, XUITableColumn } from '../../../table';
import { RowData } from '../XUITable';
import { tableName } from './constants';
import queryIsValidInteraction from './isQueryValidInteraction';

type OnCellClick<RD extends RowData> = (rowData: RD) => void;

function handleCellInteraction<RD extends RowData>(
  event: React.MouseEvent | React.KeyboardEvent,
  rowData: RD,
  onCellClick?: OnCellClick<RD>,
) {
  const isValidInteraction = queryIsValidInteraction(event);

  if (isValidInteraction) {
    onCellClick?.(rowData);
    event.preventDefault();
  }
}

function generateCellProps<RD extends RowData>(
  cell: XUITableCell<RD>,
  column: XUITableColumn<RD>,
  columnIndex: number,
  columns: Array<XUITableColumn<RD>>,
  isCellClickable: boolean,
  isTruncated?: boolean,
  rowData?: RD,
  className?: string,
  hasOverflowMenu?: boolean,
  hasCellPrecedence?: boolean,
) {
  const generatedStyle: React.CSSProperties = {
    overflow: isTruncated ? 'hidden' : undefined,
    textOverflow: isTruncated ? 'ellipsis' : undefined,
    whiteSpace: isTruncated ? 'nowrap' : undefined,
  };

  const isEndAligned = columnIndex === columns.length - 1 && !hasOverflowMenu ? 'end' : 'start';
  const cellAlignment = column.props.inlineAlignment || isEndAligned;

  return {
    className: cn(
      cell.props.className,
      (!cell.props.hasWrapping || isTruncated) && `${tableName}cell-singleline`,
      isCellClickable && `${tableName}cell-link`,
      `${tableName}cell`,
      hasCellPrecedence && `${tableName}cell-hasprecedence`,
      className,
    ),
    onClick: (event: React.MouseEvent) =>
      rowData && isCellClickable && handleCellInteraction(event, rowData, cell.props.onCellClick),
    onKeyDown: (event: React.KeyboardEvent) =>
      rowData && isCellClickable && handleCellInteraction(event, rowData, cell.props.onCellClick),
    style: generatedStyle,
    tabIndex: isCellClickable ? 0 : undefined,
    inlineAlignment: cellAlignment,
  };
}

export default generateCellProps;
