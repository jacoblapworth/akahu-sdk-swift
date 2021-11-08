import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableVariantClassNames } from './private/constants';
import PortalFocus from './private/PortalFocus';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';
import EditableTableCellContext from '../../contexts/EditableTableCellContext';
import DragDropDraggingContext from './private/DragAndDrop/contexts/DragDropDraggingContext';
import XUIEditableTableCell from './XUIEditableTableCell';
import generateIds, { getAriaAttributes } from '../helpers/ariaHelpers';
import useResizeObserver from '../helpers/useResizeObserver';

const baseName = `${tableVariantClassNames.editable}cell`;

const XUIEditableTableCellControl = ({
  children,
  className,
  cellIds,
  isDisabled,
  isFocused,
  isInvalid,
  validationMessage,
  ...spreadProps
}) => {
  const { observedElementRef, contentRect: observedElementContentRect } = useResizeObserver();

  const controlBaseName = `${baseName}-control`;
  const { scrollContainerRef } = React.useContext(XUIEditableTableContext);
  const { draggedRowIndex } = React.useContext(DragDropDraggingContext);

  const showValidationMessage = isInvalid && validationMessage;
  const wrapperIds = generateIds({ labelId: cellIds?.wrapper, id: cellIds?.control });
  const cellAttributes =
    showValidationMessage && getAriaAttributes(wrapperIds, { isInvalid, validationMessage });

  return (
    <XUIEditableTableCell
      className={cn(
        className,
        controlBaseName,
        isDisabled && `${controlBaseName}-is-disabled`,
        isFocused && `${controlBaseName}-is-focused`,
        isInvalid && `${controlBaseName}-is-invalid`,
      )}
      ref={observedElementRef}
      {...spreadProps}
    >
      <EditableTableCellContext.Provider
        value={{
          cellAttributes,
          cellRef: observedElementRef,
          useCellStyling: true,
        }}
      >
        <div className={`${baseName}--border`}>
          {children}
          {showValidationMessage && (
            <div
              className={cn(
                `${baseName}--validation`,
                isInvalid && `${baseName}--validation-is-invalid`,
              )}
              id={wrapperIds.message}
            >
              {validationMessage}
            </div>
          )}
          {isFocused && typeof draggedRowIndex !== 'number' && (
            <PortalFocus
              focusedCellContentRect={observedElementContentRect}
              focusedCellRef={observedElementRef}
              isFocused={isFocused}
              scrollContainerRef={scrollContainerRef}
            />
          )}
        </div>
      </EditableTableCellContext.Provider>
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellControl.propTypes = {
  /** Id of the control cell */
  cellIds: PropTypes.shape({
    control: PropTypes.string,
    wrapper: PropTypes.string,
  }),
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Used to style the cell as disabled.
   */
  isDisabled: PropTypes.bool,
  /**
   * Used to style the cell as focused.
   */
  isFocused: PropTypes.bool,
  /**
   * Used to style the cell as invalid.
   */
  isInvalid: PropTypes.bool,
  /**
   * Validation message to show under the input if `isInvalid` is true.
   */
  validationMessage: PropTypes.node,
};

export default XUIEditableTableCellControl;
