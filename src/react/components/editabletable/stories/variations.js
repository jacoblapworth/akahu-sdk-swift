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
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'narrow table with narrow display in wide container',
    columns: 2,
    hasHeader: true,
    rowOptions: { isRemovable: true },
    rows: 2,
    renderSmallerWrapper: true,
    isContentWidth: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'narrow table with default display in wide container',
    columns: 2,
    hasHeader: true,
    rowOptions: { isRemovable: true },
    rows: 2,
    renderSmallerWrapper: true,
    isContentWidth: false,
  },
];

export { storiesWithVariationsKindName, variations };
