import React from 'react';

export default React.createContext({
  cellRef: {
    current: null,
  },
  useCellStyling: false,
  validationMessageId: null,
  cellAttributes: null,
});
