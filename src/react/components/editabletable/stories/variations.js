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
    columnWidths: ['59px', '59px', '59px', '59px', '59px', '59px', '59px', '59px', '59px', '59px'],
    hasHeader: true,
    rowOptions: { isRemovable: true, removeButtonAriaLabel: 'Remove row' },
    rows: 5,
    renderSmallerWrapper: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'narrow table with narrow display in wide container',
    columns: 2,
    columnWidths: ['88px', '88px'],
    hasHeader: true,
    maxWidth: '217px',
    rowOptions: { isRemovable: true, removeButtonAriaLabel: 'Remove row' },
    rows: 2,
    renderSmallerWrapper: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'narrow table with default display in wide container',
    columns: 2,
    hasHeader: true,
    rowOptions: { isRemovable: true, removeButtonAriaLabel: 'Remove row' },
    rows: 2,
    renderSmallerWrapper: true,
  },
];

export { storiesWithVariationsKindName, variations };
