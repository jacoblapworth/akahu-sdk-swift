import { commonViewports, desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIContentBlock';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with standard and secondary heading`,
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
    storyTitle: `with avatar, checkbox and tag`,
    viewports: desktopPlus320,
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
    storyTitle: `with pinned value and action`,
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
    storyTitle: `without layout`,
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
    storyTitle: `with hover`,
    items: [
      {
        primaryHeading: 'Item 2 Primary',
        secondaryHeading: 'Item 2 Secondary',
        overflow: true,
        pinnedValue: true,
        isRowLink: true,
        href: '#',
      },
    ],
    hoverSelector: '.xui-contentblockitem-rowlink',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with two children`,
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
    storyTitle: `with no description but has tags`,
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
    storyTitle: `with tag position inline`,
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
    storyTitle: `with tag position right`,
    viewports: desktopPlus320,
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

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };
