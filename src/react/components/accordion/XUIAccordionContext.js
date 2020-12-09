import React from 'react';

export default React.createContext({
  emptyStateComponent: null,
  openAccordionItemId: null,
  setOpenAccordionItem: () => {},
  toggleLabel: null,
});
