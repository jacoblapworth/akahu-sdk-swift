import * as React from 'react';

interface XUIEditableTableContext {
  columnWidths?: string[];
  dragAndDrop: {
    dragHandleDescribedBy?: string;
    rowPlaceholder?: React.ReactElement<HTMLElement> | null;
  };
  rowOptions: {
    dragButtonAriaLabel?: string;
    isRemovable?: boolean;
    isSortable?: boolean;
    removeButtonAriaLabel?: string;
  };
  scrollContainerRef?: React.MutableRefObject<HTMLTableElement>;
  tableRef?: React.MutableRefObject<HTMLTableElement>;
}

export default React.createContext<XUIEditableTableContext>({
  dragAndDrop: {},
  rowOptions: {},
});
