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
  qaHook,
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
        qaHook,
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
  activeSortKey: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  isSortAsc: PropTypes.bool,
  onFocus: PropTypes.func,
  onSortChange: PropTypes.func,
  qaHook: PropTypes.string,
  sortKey: PropTypes.string,
};

export default SortButton;
