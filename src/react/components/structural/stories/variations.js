import React from 'react';
import { commonViewports, desktopPlus320 } from '../../../stories/helpers/viewports';
import XUIProgressLinear from '../../progressindicator/XUIProgressLinear';

const { rowVariants } = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/Structure';

const buildPI = (total, progress) => (
  <XUIProgressLinear
    hasToolTip
    id="testId"
    progress={progress}
    toolTipMessage={`${progress} out of ${total}`}
    total={total}
  />
);

const gridColumnsVariations = Object.keys(rowVariants).map(variant => ({
  storyKind: storiesWithVariationsKindName,
  storyTitle: `With a ${variant} variant`,
  viewports: [...desktopPlus320, commonViewports[2]],
  variant,
  columnWidths: ['6', '3', '3', '6', '6', '6', '6', '12'],
  type: 'row',
}));

const pageHeaderVariations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with title`,
    type: 'pageheader',
    title: 'Testing title',
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with title and tabs`,
    viewports: desktopPlus320,
    type: 'pageheader',
    title: 'Testing tabs',
    tabs: true,
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with title and tabs (swap to tabDropDown in small breakpoint)`,
    viewports: desktopPlus320,
    type: 'pageheader',
    title: 'Testing tabDropDown Swap',
    tabs: true,
    customDecorator: true,
    longContent: true,
    swapAtBreakpoint: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with title and tabs hover`,
    viewports: desktopPlus320,
    type: 'pageheader',
    title: 'Testing tabs',
    tabs: true,
    hoverSelector: '.xui-pickitem:first-child',
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with title and breadcrumb`,
    viewports: desktopPlus320,
    type: 'pageheader',
    title: 'Testing a longer title',
    longContent: true,
    breadcrumb: true,
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with all the things`,
    viewports: desktopPlus320,
    type: 'pageheader',
    secondary: true,
    tags: true,
    breadcrumb: true,
    tabs: true,
    actions: true,
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with all the things (long)`,
    viewports: desktopPlus320,
    type: 'pageheader',
    longContent: true,
    secondary: true,
    tags: true,
    breadcrumb: true,
    tabs: true,
    actions: true,
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with title and tabs selected hover`,
    viewports: desktopPlus320,
    type: 'pageheader',
    title: 'Testing tabs',
    tabs: true,
    hoverSelector: '.xui-pickitem-is-selected',
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with breadcrumb and actions`,
    viewports: desktopPlus320,
    type: 'pageheader',
    title: 'Testing title',
    breadcrumb: true,
    actions: true,
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `pageheader with title and actions`,
    viewports: desktopPlus320,
    type: 'pageheader',
    title: 'Testing title and actions',
    secondary: 'Longer content that could go here',
    actions: true,
    customDecorator: true,
  },
];

const overviewBlockVariations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `overview block`,
    type: 'overview',
    sections: [
      { label: 'hello', value: 'there' },
      { label: 'good', value: 'morning' },
      { label: 'good', value: 'bye' },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `overview block minimalist and left-aligned with progress`,
    viewports: desktopPlus320,
    type: 'overview',
    hasBorder: false,
    hasBackground: false,
    textAlignment: 'left',
    sections: [
      { label: 'paid', value: '1,582.99', children: buildPI(10, 4) },
      { label: 'unpaid', value: '0.68', children: buildPI(10, 6) },
      { label: 'draft', value: '103.75', children: buildPI(10, 8) },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `overview block with more sections and colors`,
    type: 'overview',
    sections: [
      { label: 'hello', value: 'there' },
      { label: 'paid', value: '1,582.99', sentiment: 'positive' },
      { label: 'unpaid', value: '0.68', sentiment: 'negative' },
      { label: 'draft', value: '103.75', sentiment: 'muted' },
      { label: 'there', value: 'you go' },
      { label: 'paid', value: '1,582.99', sentiment: 'positive' },
      { label: 'unpaid', value: '0.68', sentiment: 'negative' },
      { label: 'draft', value: '103.75', sentiment: 'muted' },
    ],
    style: { minWidth: '0px' },
    viewports: commonViewports,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `overview block without layout`,
    type: 'overview',
    hasLayout: false,
    sections: [{ label: 'hello', value: 'there' }, { label: 'there', value: 'you go' }],
  },
];

const panelVariations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `panel - simple`,
    type: 'panel',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `panel with all options`,
    viewports: desktopPlus320,
    type: 'panel-sidebar',
  },
];

const contentBlockVariations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `content block with standard and secondary heading`,
    type: `content block`,
    items: [
      {
        primaryHeading: 'Item 1 Primary',
        overflow: true,
      },
      {
        primaryHeading: 'Item 2 Primary',
        secondaryHeading: 'Item 2 Secondary',
        overflow: true,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `content block with avatar, checkbox and tag`,
    viewports: desktopPlus320,
    type: `content block`,
    items: [
      {
        primaryHeading: 'Item 1 Primary (avatar)',
        secondaryHeading: 'Item 1 Secondary',
        leftContent: 'avatar',
        overflow: true,
      },
      {
        primaryHeading: 'Item 2 Primary (checkbox)',
        secondaryHeading: 'Item 2 Secondary',
        leftContent: 'checkbox',
        overflow: true,
      },
      {
        primaryHeading: 'Item 3 Primary (rollover)',
        leftContent: 'rollover',
        overflow: true,
      },
      {
        primaryHeading: 'Item 4 Primary',
        secondaryHeading: 'Item 4 Secondary',
        tag: true,
        overflow: true,
        description: 'Many people were hoping that if the Democrats won control of Congress',
      },
      {
        primaryHeading: 'Item 5 Primary (rollover)',
        leftContent: 'rollover',
        overflow: true,
        description: 'Rollover with short description.',
      },
      {
        primaryHeading: 'Item 6 Primary (rollover)',
        leftContent: 'rollover',
        overflow: true,
        description:
          'Rollover with long description. Many people were hoping that if the Democrats won control of Congress. Many people were hoping that if the Democrats won control of Congress. Many people were hoping that if the Democrats won control of Congress. Many people were hoping that if the Democrats won control of Congress.',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `content block with pinned value and action`,
    type: `content block`,
    items: [
      {
        primaryHeading: 'Item 1 Primary',
        secondaryHeading: 'Item 1 Secondary',
        pinnedValue: true,
        overflow: true,
      },
      {
        primaryHeading: 'Item 2 Primary',
        secondaryHeading: 'Item 2 Secondary',
        action: true,
        overflow: true,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `content block without layout`,
    type: `content block`,
    items: [
      {
        primaryHeading: 'Item 2 Primary',
        secondaryHeading: 'Item 2 Secondary',
        hasLayout: false,
        overflow: true,
        pinnedValue: true,
        action: true,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `content block with two children`,
    type: `content block`,
    items: [
      {
        primaryHeading: 'Item 1 Primary',
        secondaryHeading: 'Item 1 Secondary',
        hasLayout: true,
        leftContent: 'avatar',
        tags: true,
        description:
          'Many people were hoping that if the Democrats won control of Congress they would reverse the online gambling ban, but experts doubt they will even try or that if they do that the will be successful.',
        overflow: true,
        pinnedValue: true,
        action: true,
      },
      {
        primaryHeading: 'Item 2 Primary',
        secondaryHeading: '12 Tantilise Street, Meadowbank, Auckland 1063, New Zealand',
        hasLayout: true,
        leftContent: 'avatar',
        overflow: true,
        pinnedValue: true,
        action: true,
      },
    ],
    viewports: commonViewports,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `content block with no description but has tags`,
    type: `content block`,
    items: [
      {
        primaryHeading: 'Item 1 Primary',
        secondaryHeading: 'Item 1 Secondary',
        hasLayout: true,
        leftContent: 'avatar',
        tags: true,
        overflow: true,
        pinnedValue: true,
        action: true,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `content block with tag position inline`,
    type: `content block`,
    items: [
      {
        primaryHeading: 'Item 1 Primary',
        secondaryHeading: 'Item 1 Secondary',
        hasLayout: true,
        leftContent: 'avatar',
        tags: true,
        tagPosition: 'inline',
        overflow: true,
        pinnedValue: true,
        action: true,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `content block with tag position right`,
    viewports: desktopPlus320,
    type: `content block`,
    items: [
      {
        primaryHeading: 'Item 1 Primary',
        secondaryHeading: 'Item 1 Secondary',
        hasLayout: true,
        leftContent: 'avatar',
        tags: true,
        tagPosition: 'right',
        overflow: true,
        pinnedValue: true,
        action: true,
      },
    ],
  },
];

const variations = [
  ...gridColumnsVariations,
  ...pageHeaderVariations,
  ...overviewBlockVariations,
  ...panelVariations,
  ...contentBlockVariations,
];

module.exports = {
  storiesWithVariationsKindName,
  gridColumnsVariations,
  pageHeaderVariations,
  overviewBlockVariations,
  panelVariations,
  contentBlockVariations,
  variations,
};
