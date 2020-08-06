const storiesWithVariationsKindName = 'Instances/XUIEditableTable';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Default',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'responsive',
    columnCount: 10,
    columnWidths: ['59px', '59px', '59px', '59px', '59px', '59px', '59px', '59px', '59px', '59px'],
    hasHeader: true,
    rowOptions: { isRemovable: true, removeButtonAriaLabel: 'Remove row' },
    rows: 5,
    renderSmallerWrapper: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'narrow table with narrow display in wide container',
    columnCount: 2,
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
    columnCount: 2,
    hasHeader: true,
    rowOptions: { isRemovable: true, removeButtonAriaLabel: 'Remove row' },
    rows: 2,
    renderSmallerWrapper: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'add new row (button)',
    columns: 10,
    columnWidths: ['59px', '59px', '59px', '59px', '59px', '59px', '59px', '59px', '59px', '59px'],
    hasHeader: true,
    rows: 3,
    rowOptions: { isRemovable: true, removeButtonAriaLabel: 'Remove row' },
    renderSmallerWrapper: true,
    showAddRowButton: true,
  },
];

export { storiesWithVariationsKindName, variations };
