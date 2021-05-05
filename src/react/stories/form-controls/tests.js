import { desktopPlus320 } from '../helpers/viewports';

const compositionKind = 'Form controls';

const storyNames = {
  formOnAPage: 'Form on a page',
  formLayout: 'Form layout',
  touchTargets: 'Invisible touch targets',
  formOnAPageUseCustomFontSize: 'Form on a page (reset font-size)',
};

const variations = [];

Object.keys(storyNames).forEach(name => {
  variations.push({
    storyKind: compositionKind,
    storyTitle: storyNames[name],
    useCustomFontSize: name === 'formOnAPageUseCustomFontSize',
    viewports: name === 'formOnAPage' || name === 'formLayout' ? desktopPlus320 : undefined,
    selector:
      name === 'formOnAPage' || name === 'formOnAPageUseCustomFontSize'
        ? '.xui-row-grid'
        : undefined,
  });
});

export { variations, storyNames, compositionKind };
