import NOOP from '../../helpers/noop';
import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIBanner';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with a positive sentiment',
    sentiment: 'positive',
    messageText: 'Positive Banner Message',
    onCloseClick: NOOP,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with a neutral sentiment',
    sentiment: 'neutral',
    messageText: 'Neutral Banner Message',
    onCloseClick: NOOP,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with a negative sentiment',
    sentiment: 'negative',
    messageText: 'Negative Banner Message',
    onCloseClick: NOOP,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with an action',
    messageText: 'With One Action',
    onCloseClick: NOOP,
    actionProps: [
      {
        text: 'Action',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with two actions',
    messageText: 'With Two Actions',
    onCloseClick: NOOP,
    actionProps: [
      {
        text: 'Action One',
      },
      {
        text: 'Action Two',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with two actions with long strings',
    viewports: desktopPlus320,
    messageText: 'With Two Actions But Really Really Long Strings',
    onCloseClick: NOOP,
    actionProps: [
      {
        text:
          'Long long test string to see if this will break. Long long test string to see if this will break.' +
          'Long long test string to see if this will break. Long long test string to see if this will break.',
      },
      {
        text:
          'Long long test string to see if this will break. Long long test string to see if this will break.' +
          'Long long test string to see if this will break. Long long test string to see if this will break.',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with long message text',
    messageText:
      'Long long test string to see if this will break. Long long test string to see if this will break.' +
      'Long long test string to see if this will break. Long long test string to see if this will break.' +
      'Long long test string to see if this will break. Long long test string to see if this will break.',
    onCloseClick: NOOP,
    actionProps: [
      {
        text: 'Action One',
      },
      {
        text: 'Action Two',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with message and detail',
    viewports: desktopPlus320,
    messageText: 'This is the main banner message',
    onCloseClick: NOOP,
    detailItems: [
      'This is the detail message that appears below',
      'This is the detail message that appears below ',
      'This is the detail message that appears below  ',
    ],
    actionProps: [
      {
        text: 'Action One',
      },
      {
        text: 'Action Two',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'detail without message',
    onCloseClick: NOOP,
    detailItems: [
      "Don't go chasing waterfalls. Please stick to the rivers and the lakes that you're used to. I know that you're gonna have it your way or nothing at all, but I think you're moving too fast.",
      'Four score and seven years ago, our forefathers set forth on this continent a new nation',
    ],
    actionProps: [
      {
        text: 'Action One',
      },
      {
        text: 'Action Two',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'string length stress test',
    viewports: desktopPlus320,
    messageText:
      'Long long test string to see if this will break. Long long test string to see if this will break.' +
      'Long long test string to see if this will break. Long long test string to see if this will break.' +
      'Long long test string to see if this will break. Long long test string to see if this will break.',
    onCloseClick: NOOP,
    detailItems: [
      "Don't go chasing waterfalls. Please stick to the rivers and the lakes that you're used to. I know that you're gonna have it your way or nothing at all, but I think you're moving too fast.",
      'Four score and seven years ago, our forefathers set forth on this continent a new nation',
    ],
    actionProps: [
      {
        text:
          'Long long test string to see if this will break. Long long test string to see if this will break.' +
          'Long long test string to see if this will break. Long long test string to see if this will break.',
      },
      {
        text:
          'Long long test string to see if this will break. Long long test string to see if this will break.' +
          'Long long test string to see if this will break. Long long test string to see if this will break.',
      },
    ],
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };
