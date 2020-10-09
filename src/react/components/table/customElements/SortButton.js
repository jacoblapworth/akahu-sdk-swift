import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import sortPathData from '@xero/xui-icon/icons/sort-single';
import { queryIsValidInteraction } from '../helpers/utilities';
import { NAME_SPACE } from '../helpers/constants';
import TableData from './TableData';
import XUIIcon from '../../icon/XUIIcon';

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

export default SortButton;
