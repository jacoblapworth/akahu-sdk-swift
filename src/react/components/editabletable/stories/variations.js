const storiesWithVariationsKindName = 'Instances/XUIEditableTable';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Default',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'responsive',
    columns: 10,
    hasHeader: true,
    rowOptions: { isRemovable: true },
    rows: 5,
    renderSmallerWrapper: true,
  },
];

export { storiesWithVariationsKindName, variations };
