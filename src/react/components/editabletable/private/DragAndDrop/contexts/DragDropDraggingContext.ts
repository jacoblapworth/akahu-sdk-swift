import * as React from 'react';

interface DragDropDraggingContext {
  draggedRowHeight?: number;
  draggedRowIndex?: number;
}

const DragDropDraggingContext = React.createContext<DragDropDraggingContext>({});

export default DragDropDraggingContext;
