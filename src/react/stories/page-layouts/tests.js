import { desktopPlus320 } from '../helpers/viewports';

const storyKind = 'Page Layouts';

const storyNames = {
  leftSidebarSmall: 'Left sidebar-small',
  leftSidebar: 'Left sidebar',
  rightSidebarSmall: 'Right sidebar-small',
  rightSidebar: 'Right sidebar',
};

const variations = [];

Object.keys(storyNames).forEach(name => {
  variations.push({
    storyKind,
    storyTitle: storyNames[name],
    viewports: name === 'leftSidebar' || name === 'rightSidebar' ? desktopPlus320 : undefined,
  });
});

module.exports = {
  variations,
  storyNames,
  storyKind,
};
