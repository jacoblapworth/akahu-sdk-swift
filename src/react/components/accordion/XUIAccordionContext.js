import React from 'react';

export default React.createContext({
  openAccordionItemId: null,
  setOpenAccordionItem: () => {},
  qaHook: null,
  emptyStateComponent: null,
  toggleLabel: null,
});
