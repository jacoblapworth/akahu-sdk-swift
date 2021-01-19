import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getCellLocation, queryIsValidInteraction } from '../helpers/utilities';
import { NAME_SPACE } from '../helpers/constants';
import CheckBoxCell from './CheckBoxCell';
import OverflowMenuCell from './OverflowMenuCell';
import GenericCell from './GenericCell';

class TableBodyRow extends PureComponent {
  state = { hasPrecedence: false };

  removePrecedence = () => this.setPrecedence(false);

  addPrecedence = () => this.setPrecedence(true);

  setPrecedence = hasPrecedence => this.setState(() => ({ hasPrecedence }));

  // Register an interaction on a Row providing there is not an predefined
  // action residing in the location that was clicked. E.g clicking on a cell
  // that has a checkbox action in it should not trigger the interaction callback.
  handleRowInteraction = event => {
    const { onRowClick, rowData } = this.props;
    const { target, currentTarget } = event;
    const actionClassName = `${NAME_SPACE}--cell-action`;
    const isAction =
      target.classList.contains(`${actionClassName}`) ||
      target.type === 'checkbox' ||
      target.type === 'a' ||
      target.type === 'button' ||
      event.defaultPrevented;
    const isValidInteraction = queryIsValidInteraction(event);

    if (!isAction && isValidInteraction && currentTarget.contains(target)) {
      onRowClick(event, rowData);
      currentTarget.focus();
      event.preventDefault();
    }
  };

  handleCellInteraction = (event, onCellClick) => {
    const { rowData } = this.props;
    const isValidInteraction = queryIsValidInteraction(event);

    if (isValidInteraction) {
      onCellClick(rowData);
      event.preventDefault();
    }
  };

  createOverflowMenu = () => {
    const { rowData, createOverflowMenu } = this.props;
    return createOverflowMenu && createOverflowMenu(rowData);
  };

  render = () => {
    const {
      rowData,
      rowIndex,
      columns,
      hasCheckbox,
      isChecked,
      isDisabled,
      onCheckOneToggle,
      checkOneRowAriaLabel,
      onRowClick,
      shouldRowClick,
      hasOverflowMenu,
      overflowMenuTitle,
      createDividerClasses,
      ensureCellVisibility,
      qaHook,
    } = this.props;
    const calculatedQaHook = qaHook && `${qaHook}-row-${rowData._id}`;
    const isRowLink = Boolean(onRowClick && shouldRowClick(rowData));
    const { onClick, onKeyDown, tabIndex, role, onPointerOver, onPointerOut } = isRowLink
      ? {
          onClick: this.handleRowInteraction,
          onKeyDown: this.handleRowInteraction,
          tabIndex: 0,
          role: 'button',
          onPointerOver: this.addPrecedence,
          onPointerOut: this.removePrecedence,
        }
      : {};
    const dividerClasses = createDividerClasses(rowIndex);
    const rowClassName = cn(rowData.rowClassName, `${NAME_SPACE}--row`, {
      [`${NAME_SPACE}--row-link`]: isRowLink,
      [`${NAME_SPACE}--row-hasprecedence`]: this.state.hasPrecedence,
    });

    return (
      <tr
        {...{
          className: rowClassName,
          onClick,
          onKeyDown,
          tabIndex,
          role,
          onPointerOver,
          onPointerOut,
        }}
        data-automationid={calculatedQaHook}
      >
        {hasCheckbox && (
          <CheckBoxCell
            {...{
              rowId: rowData._id,
              isChecked,
              isDisabled,
              onCheckOneToggle,
              checkOneRowAriaLabel,
              dividerClasses,
              qaHook: calculatedQaHook,
            }}
          />
        )}

        {columns.map(({ props: { body: createBodyNode } }, columnIndex) => {
          const {
            props: {
              children,
              onCellClick,
              hasWrapping,
              className: cellClassName,
              qaHook: cellQaHook,
            },
          } = createBodyNode(rowData, columnIndex);
          const cellLocation = getCellLocation({
            columns,
            columnIndex,
            hasCheckbox,
            hasOverflowMenu,
          });

          return (
            <GenericCell
              {...{
                key: `row-cell-${columnIndex}`,
                handleCellInteraction: this.handleCellInteraction,
                className: cellClassName,
                children,
                cellLocation,
                columnIndex,
                isRowLink,
                dividerClasses,
                ensureCellVisibility,
                onCellClick,
                hasWrapping,
                qaHook: cellQaHook,
              }}
            />
          );
        })}

        {hasOverflowMenu && (
          <OverflowMenuCell
            {...{
              createOverflowMenu: this.createOverflowMenu,
              overflowMenuTitle,
              dividerClasses,
              qaHook: calculatedQaHook,
            }}
          />
        )}
      </tr>
    );
  };
}

TableBodyRow.propTypes = {
  checkOneRowAriaLabel: PropTypes.node,
  columns: PropTypes.node,
  createDividerClasses: PropTypes.func,
  createOverflowMenu: PropTypes.func,
  ensureCellVisibility: PropTypes.func,
  hasCheckbox: PropTypes.bool,
  hasOverflowMenu: PropTypes.bool,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onCheckOneToggle: PropTypes.func,
  onRowClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  overflowMenuTitle: PropTypes.string,
  qaHook: PropTypes.string,
  rowData: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  shouldRowClick: PropTypes.func,
};

export default TableBodyRow;
