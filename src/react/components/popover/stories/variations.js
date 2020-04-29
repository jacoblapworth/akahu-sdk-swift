const storyKind = 'Instances/XUIPopover';
const variationStoryKind = `${storyKind}/Visual regression tests`;

const positionsToTest = ['bottom', 'right', 'top', 'left'];

const standardVariations = positionsToTest.map(preferredPosition => ({
  storyKind: variationStoryKind,
  storyTitle: `Popover positioned to the ${preferredPosition}`,
  selectors: '.xui-container',
  preferredPosition,
}));

const alignedVariations = positionsToTest.map((preferredPosition, i) => ({
  storyKind: variationStoryKind,
  storyTitle: `Aligned Popover positioned to the ${preferredPosition}`,
  selectors: '.xui-container',
  preferredPosition,
  triggerStyle: {
    position: 'absolute',
    [positionsToTest[(i + 1) % 4]]: '10px',
  },
}));

const squashedVariations = positionsToTest.map((preferredPosition, i) => ({
  storyKind: variationStoryKind,
  storyTitle: `Squashed Popover positioned to the ${preferredPosition}`,
  selectors: '.xui-container',
  preferredPosition,
  triggerStyle: {
    position: 'absolute',
    [preferredPosition]: '10px',
  },
}));

const variations = [...standardVariations, ...alignedVariations, ...squashedVariations];

export { storyKind, variationStoryKind, variations };
