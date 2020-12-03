import React from 'react';

export default React.createContext({
  emptyStateComponent: null,
  openAccordionItemId: null,
  qaHook: null,
  setOpenAccordionItem: () => {},
  toggleLabel: null,
});
