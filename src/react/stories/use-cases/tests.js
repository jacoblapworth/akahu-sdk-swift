const compositionKind = 'Use cases';

const storyNames = {
  dateDDInModal: 'Datepicker dropdown in a modal',
  dropDownInModal: 'Dropdown in a modal',
  multiDropdowns: 'Multiple dropdowns in a modal',
  layeringElements: 'Layering elements',
};

const nonBackstopStoryNames = {
  inifiniteStatefulPicklist: 'Infinite JS errors in stateful picklist render',
  modalInModal: 'Modal in a modal with dropdown',
  fiveNestedModals: 'Multiple nested modals',
  touchInteractions: 'Touch interaction tests',
  focusTest: 'Focus test',
};

const variations = [];

Object.keys(storyNames).forEach(name => {
  variations.push({
    storyKind: `${compositionKind}/${storyNames[name]}`,
    storyTitle: storyNames[name],
  });
});

export { variations, storyNames, compositionKind, nonBackstopStoryNames };
