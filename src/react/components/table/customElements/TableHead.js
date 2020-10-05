/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { getCellLocation } from '../helpers/utilities';
import { NAME_SPACE } from '../helpers/constants';
import { ns } from '../../helpers/xuiClassNamespace';
import TableHeadCheckBoxCell from './TableHeadCheckBoxCell';
import TableHeadOverflowMenuCell from './TableHeadOverflowMenuCell';
import TableHeadGenericCell from './TableHeadGenericCell';

const HEAD_CELL_CLASSES = `${NAME_SPACE}--cell ${ns}-heading-separator`;

// TODO: Refactor the various "cell" types (generic, overflow and checkbox) into
// individual files for clarity.

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
        <TableHeadCheckBoxCell
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
          <TableHeadGenericCell
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

      {hasOverflowMenu && <TableHeadOverflowMenuCell />}
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
