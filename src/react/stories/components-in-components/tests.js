import { desktopPlus320 } from '../helpers/viewports';

const compositionKind = 'Components in Components';

const storyNames = {
  dateDDInModal: 'Datepicker dropdown in a modal',
  dropDownInModal: 'Dropdown in a modal',
  multiDropdowns: 'Multiple dropdowns in a modal',
  formOnAPage: 'Form on a page',
  formLayout: 'Form layout',
  touchTargets: 'Invisible touch targets',
};

const nonBackstopStoryNames = {
  inifiniteStatefulPicklist: 'Infinite JS errors in StatefulPicklist render',
  modalInModal: 'Modal in a modal with dropdown',
  fiveNestedModals: 'Multiple nested modals',
  touchInteractions: 'Touch interaction tests',
  layeringElements: 'Layering elements',
};

const variations = [];

Object.keys(storyNames).forEach(name => {
  variations.push({
    storyKind: compositionKind,
    storyTitle: storyNames[name],
    viewports: name === 'formOnAPage' || name === 'formLayout' ? desktopPlus320 : undefined,
  });
});

export { variations, storyNames, compositionKind, nonBackstopStoryNames };
