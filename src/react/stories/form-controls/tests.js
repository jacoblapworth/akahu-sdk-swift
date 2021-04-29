import { desktopPlus320 } from '../helpers/viewports';

const compositionKind = 'Form controls';

const storyNames = {
  formOnAPage: 'Form on a page',
  formLayout: 'Form layout',
  touchTargets: 'Invisible touch targets',
};

const variations = [];

Object.keys(storyNames).forEach(name => {
  variations.push({
    storyKind: compositionKind,
    storyTitle: storyNames[name],
    viewports: name === 'formOnAPage' || name === 'formLayout' ? desktopPlus320 : undefined,
  });
});

export { variations, storyNames, compositionKind };
