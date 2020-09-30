import * as React from 'react';

interface DroppableContext {
  isDraggingOver?: boolean;
}

const DroppableContext = React.createContext<DroppableContext>({});

export default DroppableContext;
