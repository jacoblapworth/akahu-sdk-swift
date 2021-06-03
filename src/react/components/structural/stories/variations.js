import { commonViewports, desktopPlus320 } from '../../../stories/helpers/viewports';

const { rowVariants } = require('../private/constants');

const storiesWithKnobsKindName = 'Components/Structure';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = Object.keys(rowVariants).map(variant => ({
  storyKind: storiesWithVariationsKindName,
  storyTitle: `With a ${variant} variant`,
  viewports: [...desktopPlus320, commonViewports[2]],
  variant,
  columnWidths: ['6', '3', '3', '6', '6', '6', '6', '12'],
  type: 'row',
}));

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };
