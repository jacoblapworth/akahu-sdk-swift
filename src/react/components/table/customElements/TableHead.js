/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import sortPathData from '@xero/xui-icon/icons/sort-single';
import XUICheckbox from '../../checkbox/XUICheckbox';
import XUIIcon from '../../icon/XUIIcon';
import {
  getCellLocation,
  createCellLocationClasses,
  queryIsValidInteraction,
} from '../helpers/utilities';
import { NAME_SPACE, NBSP } from '../helpers/constants';
import preventDefault from '../../helpers/preventDefault';
import TableData from './TableData';
import { ns } from '../../helpers/xuiClassNamespace';

const HEAD_CELL_CLASSES = `${NAME_SPACE}--cell ${ns}-heading-separator`;

// TODO: Refactor the various "cell" types (generic, overflow and checkbox) into
// individual files for clarity.

const CheckBoxCell = ({ checkAllRowsAriaLabel, checkedIds, onCheckAllToggle, totalData }) => {
  const className = cn(
    `${NAME_SPACE}--cell-action`,
    HEAD_CELL_CLASSES,
    createCellLocationClasses('first'),
  );
  const totalCheckIds = checkedIds.length;
  const isDisabled = !totalData;
  const isChecked = Boolean(totalData && totalCheckIds === totalData);
  const isIndeterminate = Boolean(totalCheckIds && !isChecked);

  return (
    <TableData className={className} isHead tabIndex={-1}>
      {NBSP}
      {onCheckAllToggle && (
        <XUICheckbox
          className={`${NAME_SPACE}--checkbox-head`}
          isChecked={isChecked}
          isDisabled={isDisabled}
          isGrouped
          isIndeterminate={isIndeterminate}
          isLabelHidden
          onChange={onCheckAllToggle}
          tabIndex={0}
        >
          {checkAllRowsAriaLabel}
        </XUICheckbox>
      )}
    </TableData>
  );
};

CheckBoxCell.propTypes = {
  totalData: PropTypes.number,
  checkedIds: PropTypes.array,
  onCheckAllToggle: PropTypes.func,
  checkAllRowsAriaLabel: PropTypes.string,
};

const OverflowMenuCell = () => {
  const className = cn(
    `${NAME_SPACE}--cell-action`,
    HEAD_CELL_CLASSES,
    createCellLocationClasses('last'),
  );

  return (
    <TableData className={className} isHead onClick={preventDefault} onKeyPress={preventDefault}>
      {NBSP}
    </TableData>
  );
};

const SortButton = ({
  activeSortKey,
  children,
  className: suppliedClasses,
  isSortAsc,
  onSortChange,
  sortKey,
  ...props
}) => {
  const handleInteraction = event => {
    const isValidInteraction = queryIsValidInteraction(event);

    if (isValidInteraction) {
      onSortChange(sortKey);
      event.preventDefault();
    }
  };

  const isSortActive = activeSortKey && activeSortKey === sortKey;
  const className = cn(
    suppliedClasses,
    `${NAME_SPACE}--sortbutton`,
    isSortActive && `${NAME_SPACE}--sortbutton-active`,
  );

  return (
    <TableData
      {...{
        ...props,
        className,
        role: 'button',
        onClick: handleInteraction,
        onKeyDown: handleInteraction,
        isHead: true,
        tabIndex: 0,
        scope: 'col',
      }}
    >
      <div>
        <span>{children}</span>
        <XUIIcon
          className={`${NAME_SPACE}--sortbutton-icon`}
          icon={sortPathData}
          rotation={isSortAsc ? 180 : null}
        />
      </div>
    </TableData>
  );
};

SortButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  sortKey: PropTypes.string,
  activeSortKey: PropTypes.string,
  isSortAsc: PropTypes.bool,
  onSortChange: PropTypes.func,
  onFocus: PropTypes.func,
};

const GenericCell = ({
  activeSortKey,
  cellLocation,
  children,
  className: suppliedClasses,
  ensureCellVisibility,
  isSortAsc,
  onSortChange,
  sortKey,
}) => {
  const isHead = true;
  const onFocus = ensureCellVisibility;
  const className = cn(HEAD_CELL_CLASSES, createCellLocationClasses(cellLocation), suppliedClasses);

  return sortKey ? (
    <SortButton
      {...{
        children,
        className,
        sortKey,
        activeSortKey,
        isSortAsc,
        onSortChange,
        onFocus,
      }}
    />
  ) : (
    <TableData
      {...{
        isHead,
        className,
        onFocus,
        scope: 'col',
      }}
    >
      <span>{children}</span>
    </TableData>
  );
};

GenericCell.propTypes = {
  className: PropTypes.node,
  children: PropTypes.node,
  sortKey: PropTypes.string,
  activeSortKey: PropTypes.string,
  isSortAsc: PropTypes.bool,
  onSortChange: PropTypes.func,
  cellLocation: PropTypes.string,
  ensureCellVisibility: PropTypes.func,
};

const TableHead = ({
  activeSortKey,
  checkAllRowsAriaLabel,
  checkedIds,
  columns,
  data,
  ensureCellVisibility,
  hasCheckbox,
  hasOverflowMenu,
  isSortAsc,
  onCheckAllToggle,
  onSortChange,
}) => (
  <thead className={`${NAME_SPACE}--head`}>
    <tr className={`${NAME_SPACE}--row ${ns}-text-align-left`}>
      {hasCheckbox && (
        <CheckBoxCell
          {...{
            totalData: data.length,
            checkedIds,
            onCheckAllToggle,
            checkAllRowsAriaLabel,
          }}
        />
      )}

      {columns.map(
        (
          {
            props: {
              head: {
                props: { children, sortKey, className },
              },
            },
          },
          columnIndex,
        ) => (
          <GenericCell
            {...{
              key: `column-cell-${columnIndex}`,
              activeSortKey,
              isSortAsc,
              onSortChange,
              ensureCellVisibility,
              sortKey,
              className,
              children,
              cellLocation: getCellLocation({
                columns,
                columnIndex,
                hasCheckbox,
                hasOverflowMenu,
              }),
            }}
          />
        ),
      )}

      {hasOverflowMenu && <OverflowMenuCell />}
    </tr>
  </thead>
);

export default TableHead;

TableHead.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columns: PropTypes.node.isRequired,
  ensureCellVisibility: PropTypes.func,

  // Checkbox.
  hasCheckbox: PropTypes.bool,
  checkedIds: PropTypes.array,
  onCheckAllToggle: PropTypes.func,
  checkAllRowsAriaLabel: PropTypes.node,

  // Overflow Menu.
  hasOverflowMenu: PropTypes.bool,

  // Sorting
  activeSortKey: PropTypes.string,
  isSortAsc: PropTypes.bool,
  onSortChange: PropTypes.func,
};
