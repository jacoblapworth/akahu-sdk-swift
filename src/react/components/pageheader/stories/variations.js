import { commonViewports, desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIPageHeader';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with title`,
    title: 'Testing title',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with title and tabs`,
    viewports: desktopPlus320,
    title: 'Testing tabs',
    tabs: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with title and tabs of mixed type`,
    type: 'pageheader',
    title: 'Testing mixed type tabs',
    tabs: true,
    includeAnchor: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with title and tabs (swap to tabDropDown in small breakpoint)`,
    viewports: desktopPlus320,
    title: 'Testing tabDropDown Swap',
    tabs: true,
    longContent: true,
    tabsSwapPoint: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with title and tabs hover`,
    viewports: desktopPlus320,
    title: 'Testing tabs',
    tabs: true,
    hoverSelector: '.xui-pickitem:first-child',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with title and breadcrumb`,
    viewports: desktopPlus320,
    title: 'Testing a longer title',
    longContent: true,
    breadcrumb: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with compactable one-item breadcrumb`,
    viewports: desktopPlus320,
    title: 'Test a single swap breadcrumb',
    longContent: true,
    breadcrumb: [{ label: 'Invite new member', href: '#3' }],
    breadcrumbSwapPoint: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with compactable two-item breadcrumb`,
    viewports: desktopPlus320,
    title: 'Test a double swap breadcrumb',
    longContent: true,
    breadcrumb: [
      { label: 'Edit organisation', href: '#2' },
      { label: 'Invite new member', href: '#3' },
    ],
    breadcrumbSwapPoint: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with compactable three-item breadcrumb`,
    viewports: desktopPlus320,
    title: 'Test a swapping breadcrumb',
    longContent: true,
    breadcrumb: true,
    breadcrumbSwapPoint: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `compact breadcrumb dropdown`,
    viewports: [commonViewports[3]],
    title: 'Test a swapping breadcrumb',
    longContent: true,
    breadcrumb: true,
    breadcrumbSwapPoint: 'large',
    clickSelector: '.xui-breadcrumb .xui-button.xui-breadcrumb--link',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with all the things`,
    viewports: desktopPlus320,
    secondary: true,
    tags: true,
    breadcrumb: true,
    tabs: true,
    actions: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with all the things (compact)`,
    viewports: desktopPlus320,
    secondary: true,
    tags: true,
    breadcrumb: true,
    breadcrumbSwapPoint: 'small',
    tabs: true,
    tabsSwapPoint: 'small',
    actions: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with all the things (long)`,
    viewports: desktopPlus320,
    longContent: true,
    secondary: true,
    tags: true,
    breadcrumb: true,
    tabs: true,
    actions: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with all the things (long compact)`,
    viewports: desktopPlus320,
    longContent: true,
    secondary: true,
    tags: true,
    breadcrumb: true,
    breadcrumbSwapPoint: 'small',
    tabs: true,
    tabsSwapPoint: 'small',
    actions: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with title and tabs selected hover`,
    viewports: desktopPlus320,
    title: 'Testing tabs',
    tabs: true,
    hoverSelector: '.xui-pickitem-is-selected',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with breadcrumb and actions`,
    viewports: desktopPlus320,
    title: 'Testing title',
    breadcrumb: true,
    actions: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with title and actions`,
    viewports: desktopPlus320,
    title: 'Testing title and actions',
    secondary: 'Longer content that could go here',
    actions: true,
  },
];

module.exports = {
  storiesWithVariationsKindName,
  variations,
};
