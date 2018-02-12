const createAriaTabId = (id, index) => `${id}-tab-${index}`;
const createAriaPanelId = id => `${id}-panel`;

const utilities = { createAriaTabId, createAriaPanelId };

export { utilities as default, createAriaTabId, createAriaPanelId };
