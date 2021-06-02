const storiesWithKnobsKindName = 'Components/XUIPopover';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const positionsToTest = ['bottom', 'right', 'top', 'left'];

const standardVariations = positionsToTest.map(preferredPosition => ({
  storyKind: storiesWithVariationsKindName,
  storyTitle: `Popover positioned to the ${preferredPosition}`,
  selectors: '.xui-container',
  preferredPosition,
}));

const alignedVariations = positionsToTest.map((preferredPosition, i) => ({
  storyKind: storiesWithVariationsKindName,
  storyTitle: `Aligned Popover positioned to the ${preferredPosition}`,
  selectors: '.xui-container',
  preferredPosition,
  triggerStyle: {
    position: 'absolute',
    [positionsToTest[(i + 1) % 4]]: '10px',
  },
}));

const squashedVariations = positionsToTest.map((preferredPosition, i) => ({
  storyKind: storiesWithVariationsKindName,
  storyTitle: `Squashed Popover positioned to the ${preferredPosition}`,
  selectors: '.xui-container',
  preferredPosition,
  triggerStyle: {
    position: 'absolute',
    [preferredPosition]: '10px',
  },
}));

const variations = [...standardVariations, ...alignedVariations, ...squashedVariations];

export { storiesWithKnobsKindName, storiesWithVariationsKindName, variations };
