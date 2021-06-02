import { desktopPlus320 } from '../../../stories/helpers/viewports';

const privateConsts = require('../../positioning/private/constants');

const storiesWithKnobsKindName = 'Components/XUITooltip';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const { positionOptions } = privateConsts;

const longTipText =
  "So often we avoid running water, and running water is a lot of fun. Isn't that fantastic? You can just push a little tree out of your brush like that.";

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Default',
    triggerType: 'button',
    tipText: 'tip with default settings',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'flip from top-right',
    viewports: desktopPlus320,
    triggerType: 'button',
    preferredPosition: 'top-right',
    styles: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'flip from left-bottom',
    viewports: desktopPlus320,
    triggerType: 'button',
    preferredPosition: 'left-bottom',
    styles: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'flip from right center',
    viewports: desktopPlus320,
    triggerType: 'button',
    preferredPosition: 'right',
    styles: {
      width: '100%',
      height: '100%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'flip from bottom left',
    viewports: desktopPlus320,
    triggerType: 'button',
    preferredPosition: 'bottom-left',
    styles: {
      width: '100%',
      height: '100%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'flip from side to vertical',
    viewports: desktopPlus320,
    triggerType: 'button',
    preferredPosition: 'right',
    styles: {
      width: '100%',
    },
    wrapperClassName: 'xui-u-fullwidth',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with a longer tip',
    triggerType: 'input',
    tipText: longTipText,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with a longer tip to the side',
    triggerType: 'button',
    preferredPosition: 'right',
    tipText: longTipText,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'inline with text',
    triggerType: 'text',
    styles: {
      padding: '10px',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'on an icon',
    triggerType: 'icon',
    preferredPosition: 'right',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'on an icon left',
    triggerType: 'icon',
    preferredPosition: 'left',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'on an icon top',
    triggerType: 'icon',
    preferredPosition: 'top',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'on an icon bottom',
    triggerType: 'icon',
    preferredPosition: 'bottom',
  },
];

positionOptions.forEach(position => {
  variations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: position,
    triggerType: 'button',
    preferredPosition: position,
    tipText: `tip at ${position}`,
  });
});

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };
