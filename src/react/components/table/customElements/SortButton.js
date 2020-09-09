import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import sortPathData from '@xero/xui-icon/icons/sort-single';
import { queryIsValidInteraction } from '../helpers/utilities';
import { NAME_SPACE } from '../helpers/constants';
import TableData from './TableData';
import XUIIcon from '../../icon/XUIIcon';

class SortButton extends PureComponent {
  handleInteraction = event => {
    const { onSortChange, sortKey } = this.props;
    const isValidInteraction = queryIsValidInteraction(event);

    if (isValidInteraction) {
      onSortChange(sortKey);
      event.preventDefault();
    }
  };

  render() {
    const {
      className: suppliedClasses,
      children,
      sortKey,
      activeSortKey,
      isSortAsc,
      // Do not pass "onSortChange" into a DOM node or React gets sad.
      // eslint-disable-next-line no-unused-vars
      onSortChange,
      icon = sortPathData,
      ...props
    } = this.props;
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
          onClick: this.handleInteraction,
          onKeyDown: this.handleInteraction,
          isHead: true,
          tabIndex: 0,
          scope: 'col',
        }}
      >
        <div>
          <span>{children}</span>
          <XUIIcon
            className={`${NAME_SPACE}--sortbutton-icon`}
            icon={icon}
            rotation={isSortAsc ? null : 180}
          />
        </div>
      </TableData>
    );
  }
}

SortButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  sortKey: PropTypes.string,
  activeSortKey: PropTypes.string,
  isSortAsc: PropTypes.bool,
  onSortChange: PropTypes.func,
  onFocus: PropTypes.func,
  icon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
};

export default SortButton;
