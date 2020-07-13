import * as React from 'react';

interface XUIEditableTableContext {
  columnWidths?: string[];
  dragAndDrop: {
    dragHandleDescribedBy?: string;
    rowPlaceholder?: React.ReactElement<HTMLElement> | null;
  };
  rowOptions: {
    dragButtonAriaLabel?: string;
    isDraggable?: boolean;
    isRemovable?: boolean;
    removeButtonAriaLabel?: string;
  };
  scrollContainerRef?: React.MutableRefObject<HTMLElement>;
  tableRef?: React.MutableRefObject<HTMLTableElement>;
  tableWrapperRef?: React.MutableRefObject<HTMLElement>;
}

export default React.createContext<XUIEditableTableContext>({
  dragAndDrop: {},
  rowOptions: {},
});
