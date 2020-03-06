import { commonViewports, desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIPagination';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default',
    viewports: [...desktopPlus320, commonViewports[2]],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'only paging',
    showCount: false,
    showPerPageCountSelect: false,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'test paging select',
    showCount: false,
    showPerPageCountSelect: false,
    clickSelector: '.xui-pagination--paging .xui-select--button',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'test item select',
    clickSelector: '.xui-pagination--items--select .xui-select--button',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'count is less than min perPageCount option',
    count: 10,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'only one page',
    count: 99,
    defaultPerPageCount: 100,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'only two pages',
    count: 20,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as controlled',
    isControlled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'change count content',
    createCountContent: (from, to, count) => ({
      simple: `Total contacts: ${count}`,
      enhanced: `Showing contacts ${from}-${to} of ${count}`,
    }),
    perPageContent: 'Contacts per page',
  },
];

export { storiesWithVariationsKindName, variations };
