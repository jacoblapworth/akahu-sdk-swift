import React from 'react';

export default React.createContext({
  openAccordionItem: null,
  updateOpenAccordionItem: () => {},
  emptyStateComponent: null,
  toggleLabel: null,
});
