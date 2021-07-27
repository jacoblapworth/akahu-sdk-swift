import overflowIcon from '@xero/xui-icon/icons/overflow';
import cn from 'classnames';
import * as React from 'react';

import { XUIIconButton } from '../../../button';
import XUICheckbox from '../../../checkbox';
import XUIDropDown, { XUIDropdownToggled } from '../../../dropdown';
import {
  XUIEditableTableCell,
  XUIEditableTableCellReadOnly,
  XUIEditableTableRow,
} from '../../../editabletable';
import Picklist from '../../../picklist';
import { XUITableCell, XUITableColumn } from '../../../table';
import { isKeyClick } from '../../helpers/reactKeyHandler';
import { tableName } from '../helpers/constants';
import generateCellProps from '../helpers/generateCellProps';
import { RowData } from '../XUITable';

interface BaseProps<RD extends RowData> {
  checkOneRowAriaLabel?: React.ReactNode;
  className?: string;
  columns: Array<XUITableColumn<RD>>;
  hasCheckbox?: boolean;
  hasOverflowMenu?: boolean;
  isRowChecked?: boolean;
  isRowDisabled?: boolean;
  isTruncated?: boolean;
  onCheckRow?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowClick?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    rowData: RD,
  ) => void;
  overflowMenu?: React.ReactNode;
  overflowMenuTitle?: string;
  qaHook?: string;
  rowData: RD;
  shouldRowClick?: boolean;
}

type Props<RD extends RowData> = BaseProps<RD>;

class XUITableBodyRow<RD extends RowData = RowData> extends React.PureComponent<Props<RD>> {
  state = { hasCellPrecedence: false, hasPrecedence: false };

  render() {
    const {
      checkOneRowAriaLabel,
      className,
      columns,
      hasCheckbox,
      hasOverflowMenu,
      isRowChecked,
      isRowDisabled,
      isTruncated,
      onCheckRow,
      onRowClick,
      overflowMenu,
      overflowMenuTitle,
      qaHook,
      rowData,
      shouldRowClick,
    } = this.props;

    const cellClassName = `${tableName}cell-layout`;
    const isRowLink = Boolean(onRowClick && shouldRowClick);

    const rowProps = {
      onClick: this.handleRowInteraction,
      onKeyDown: this.handleRowInteraction,
      onPointerOver: this.addPrecedence,
      onPointerOut: this.removePrecedence,
      role: 'button',
      tabIndex: 0,
    };

    const { onClick, onKeyDown, onPointerOver, onPointerOut, role, tabIndex } = isRowLink
      ? rowProps
      : ({} as Partial<typeof rowProps>);

    return (
      <XUIEditableTableRow
        className={cn(
          className,
          isRowLink && `${tableName}row-link`,
          this.state.hasPrecedence && `${tableName}row-hasprecedence`,
        )}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onPointerOut={onPointerOut}
        onPointerOver={onPointerOver}
        qaHook={qaHook}
        role={role}
        tabIndex={tabIndex}
      >
        {hasCheckbox && (
          <XUIEditableTableCell className={cn(cellClassName, `${tableName}cell-action`)}>
            <XUICheckbox
              className={`${tableName}--checkbox-body`}
              isChecked={isRowChecked}
              isDisabled={isRowDisabled}
              isGrouped
              isLabelHidden
              onChange={onCheckRow}
              qaHook={`${qaHook}-checkbox`}
            >
              {checkOneRowAriaLabel}
            </XUICheckbox>
          </XUIEditableTableCell>
        )}
        {columns.map((column, columnIndex) => {
          if (!React.isValidElement(column)) {
            return false;
          }

          const cells = React.Children.toArray(column.props.body(rowData)) as Array<
            XUITableCell<RD>
          >;
          return cells.map(cell => {
            const isCellClickable = Boolean(rowData && !shouldRowClick && cell.props.onCellClick);
            return (
              <XUIEditableTableCellReadOnly
                cellProps={generateCellProps(
                  cell,
                  column,
                  columnIndex,
                  columns,
                  isCellClickable,
                  isTruncated,
                  rowData,
                  cellClassName,
                  hasOverflowMenu,
                  this.state.hasCellPrecedence,
                )}
                // eslint-disable-next-line react/no-array-index-key
                key={`cell_${columnIndex}`}
                onPointerOut={() => isCellClickable && this.removeCellPrecedence()}
                onPointerOver={() => isCellClickable && this.addCellPrecedence()}
                qaHook={cell.props.qaHook && `${cell.props.qaHook}-cell`}
              >
                {cell.props.children}
              </XUIEditableTableCellReadOnly>
            );
          });
        })}
        {hasOverflowMenu &&
          (overflowMenu ? (
            <XUIEditableTableCell className={cn(cellClassName, `${tableName}cell-action`)}>
              <XUIDropdownToggled
                className={`${tableName}--overflowmenu-body`}
                dropdown={
                  <XUIDropDown>
                    <Picklist>{overflowMenu}</Picklist>
                  </XUIDropDown>
                }
                isLegacyDisplay
                trigger={
                  <XUIIconButton
                    ariaLabel={overflowMenuTitle || ''}
                    icon={overflowIcon}
                    qaHook={`${qaHook}-overflowmenu`}
                    title={overflowMenuTitle}
                  />
                }
              />
            </XUIEditableTableCell>
          ) : (
            <XUIEditableTableCell className={`${tableName}cell--placeholder`} />
          ))}
      </XUIEditableTableRow>
    );
  }

  private removeCellPrecedence = () => {
    this.setCellPrecedence(false);
  };

  private removePrecedence = () => {
    this.setPrecedence(false);
  };

  private addCellPrecedence = () => {
    this.setCellPrecedence(true);
  };

  private addPrecedence = () => {
    this.setPrecedence(true);
  };

  private setCellPrecedence = (hasCellPrecedence: boolean) =>
    this.setState(() => ({ hasCellPrecedence }));

  private setPrecedence = (hasPrecedence: boolean) => this.setState(() => ({ hasPrecedence }));

  /**
   * Register an interaction on a Row providing there is not an predefined action residing in the
   * location that was clicked. E.g clicking on a cell that has a checkbox action in it should not
   * trigger the interaction callback.
   */
  private handleRowInteraction = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => {
    const { onRowClick, rowData } = this.props;
    const { currentTarget } = event;
    const target = event.target as HTMLElement | HTMLInputElement;

    const targetHasActionClassName = target.classList.contains(`${tableName}cell-action`);
    const interactiveInputTypes = ['a', 'checkbox', 'button'];
    const targetTypeIsInteractive = 'type' in target && interactiveInputTypes.includes(target.type);

    const isTargetAction =
      targetHasActionClassName || targetTypeIsInteractive || event.defaultPrevented;
    const isValidInteraction = event.type === 'click' || ('key' in event && isKeyClick(event));

    if (!isTargetAction && isValidInteraction && currentTarget.contains(target)) {
      onRowClick?.(event, rowData);
      currentTarget.focus();
      event.preventDefault();
    }
  };
}

export default XUITableBodyRow;
