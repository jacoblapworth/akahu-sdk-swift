import React from 'react';
import sortIcon from '@xero/xui-icon/icons/sort-single';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';

import queryIsValidInteraction from '../../helpers/isQueryValidInteraction';
import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';

const XUIEditableTableHeadingCell = ({
  children,
  className,
  inlineAlignment,
  isSortActive,
  isSortAsc,
  onClick,
  onKeyDown,
  onSortChange,
  qaHook,
  scope,
  ...spreadProps
}) => {
  const tableClassName = React.useContext(XUIEditableTableClassContext);
  const sortButtonContentRef = React.useRef();
  const isSortable = Boolean(onSortChange);

  const handleInteraction = event => {
    const isValidInteraction = queryIsValidInteraction(event);

    if (isValidInteraction) {
      onSortChange?.();
      event.preventDefault();
    }
  };

  const composedOnClick = event => {
    isSortable && handleInteraction(event);
    onClick?.(event);
  };

  const composedOnKeyDown = event => {
    isSortable && handleInteraction(event);
    onKeyDown?.(event);
  };

  const baseName = `${tableClassName}headingcell`;

  const sortButtonContentClassName = `${tableClassName}--sortbuttoncontent`;
  const sortIconWrapperClassName = `${tableClassName}--sorticonwrapper`;
  const isRightAligned =
    (sortButtonContentRef.current &&
      window?.getComputedStyle(sortButtonContentRef.current).textAlign === 'right') ||
    inlineAlignment === 'end';

  const cellClassName = cn(
    baseName,
    className,
    `${baseName}-${inlineAlignment === 'end' ? 'right' : 'left'}aligned`,
    isSortable && `${tableClassName}--sortbutton`,
  );

  return (
    <th
      className={cellClassName}
      data-automationid={qaHook}
      onClick={composedOnClick}
      onKeyDown={composedOnKeyDown}
      role={isSortable ? 'button' : undefined}
      scope={scope}
      tabIndex={isSortable ? 0 : undefined}
      {...spreadProps}
    >
      {isSortable ? (
        <div
          className={cn(
            sortButtonContentClassName,
            isSortActive && `${sortButtonContentClassName}-active`,
            isRightAligned && `${sortButtonContentClassName}-rightaligned`,
          )}
          ref={sortButtonContentRef}
        >
          {children}
          <div
            className={cn(
              sortIconWrapperClassName,
              !isSortActive && `${sortIconWrapperClassName}-hidden`,
            )}
          >
            <XUIIcon
              className={`${tableClassName}--sorticon`}
              icon={sortIcon}
              rotation={isSortAsc ? 180 : undefined}
            />
          </div>
        </div>
      ) : (
        children
      )}
    </th>
  );
};

XUIEditableTableHeadingCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Aligns the content of the cell on the inline (horizontal) axis. */
  inlineAlignment: PropTypes.oneOf(['end', 'start']),
  /**
   * Indicates that the table is currently being sorted by this column.
   * No more than one `XUIEditableTableHeadingCell` should have this set to `true`.
   */
  isSortActive: PropTypes.bool,
  /**
   * Indicates whether the rows are arranged in ascending or descending order.
   * This indication only appears if the `isSortActive` is set to `true`.
   */
  isSortAsc: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  /**
   * Callback to handle a sort interaction.
   * If this prop is provided, this component will have sort controls.
   */
  onSortChange: PropTypes.func,
  qaHook: PropTypes.string,
  /**
   * The `scope` attribute added to the <th> element
   * to tell screenreaders exactly what cells the header is a header for
   * <br />
   * Default value is `col`, could be `colGroup` / `row` / `rowGroup`
   */
  scope: PropTypes.oneOf(['col', 'colGroup', 'row', 'rowGroup']),
};

export default XUIEditableTableHeadingCell;

XUIEditableTableHeadingCell.defaultProps = {
  inlineAlignment: 'start',
  scope: 'col',
};
