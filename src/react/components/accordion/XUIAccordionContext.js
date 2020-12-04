import React from 'react';

export default React.createContext({
  openAccordionItemId: null,
  setOpenAccordionItem: () => {},
  emptyStateComponent: null,
  toggleLabel: null,
});
