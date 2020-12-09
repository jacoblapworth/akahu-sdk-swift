import * as React from 'react';

export interface XUIEditableTableContextShape {
  columnWidths?: string[];
  dragAndDrop: {
    dragHandleDescribedBy?: string;
    rowPlaceholder?: React.ReactElement<HTMLElement> | null;
  };
  hasPinnedFirstColumn?: boolean;
  hasPinnedLastColumn?: boolean;
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

export default React.createContext<XUIEditableTableContextShape>({
  dragAndDrop: {},
  rowOptions: {},
});
