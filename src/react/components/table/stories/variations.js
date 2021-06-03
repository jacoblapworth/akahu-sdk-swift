import { desktopPlus320 } from '../../../stories/helpers/viewports';
import NOOP from '../../helpers/noop';

const storiesWithKnobsKindName = 'Components/XUITable';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;
const data = {
  0: {},
  1: {},
  2: {},
};
const tableProps = {
  data,
  isResponsive: true,
};
const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'basic',
    examples: [
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          isResponsive: false,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'no header',
    examples: [
      {
        columns: 3,
        removeHeader: true,
        tableProps: {
          ...tableProps,
        },
      },
      {
        columns: 3,
        removeHeader: true,
        tableProps: {
          ...tableProps,
          data: {},
        },
      },
      {
        columns: 3,
        removeHeader: true,
        tableProps: {
          ...tableProps,
          data: {},
          isLoading: true,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'responsive',
    examples: [
      {
        columns: 10,
        tableProps: {
          ...tableProps,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'checkbox',
    examples: [
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          hasCheckbox: true,
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          hasCheckbox: true,
          checkedIds: { 1: true },
          disabledIds: { 2: true },
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          hasCheckbox: true,
          checkedIds: {
            0: true,
            1: true,
            2: true,
          },
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'overflow menu',
    examples: [
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          hasOverflowMenu: true,
          createOverflowMenu: NOOP,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'pinned actions',
    viewports: desktopPlus320,
    examples: [
      {
        columns: 10,
        tableProps: {
          ...tableProps,
          hasPinnedFirstColumn: true,
          hasCheckbox: true,
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
        },
      },
      {
        columns: 10,
        tableProps: {
          ...tableProps,
          hasPinnedLastColumn: true,
          hasOverflowMenu: true,
          createOverflowMenu: NOOP,
        },
      },
      {
        columns: 10,
        tableProps: {
          ...tableProps,
          hasPinnedFirstColumn: true,
          hasPinnedLastColumn: true,
          hasCheckbox: true,
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
          hasOverflowMenu: true,
          createOverflowMenu: NOOP,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'truncation',
    viewports: desktopPlus320,
    examples: [
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {
            ...data,
            1: { content: 'The quick brown fox jumps over the lazy dog' },
          },
          isTruncated: true,
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {
            ...data,
            1: { content: 'The quick brown fox jumps over the lazy dog' },
          },
          isTruncated: true,
          hasCheckbox: true,
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
          hasOverflowMenu: true,
          createOverflowMenu: NOOP,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'custom classes',
    examples: [
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          className: 'xui-table-visualTesting-tableWrapper',
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {
            ...data,
            1: { className: 'xui-table-visualTesting-cell' },
          },
        },
      },
      {
        columns: 3,
        hasHeaderClassName: true,
        tableProps,
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {
            ...data,
            0: { rowClassName: 'xui-table-visualTesting-row' },
            2: { rowClassName: 'xui-table-visualTesting-row' },
          },
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'wrapping',
    viewports: desktopPlus320,
    examples: [
      {
        columns: 3,
        styleOverrides: { maxWidth: '330px' },
        tableProps: {
          ...tableProps,
          data: {
            ...data,
            1: {
              hasWrapping: true,
              content: 'The quick brown fox jumps over the lazy dog',
            },
          },
        },
      },
      {
        columns: 3,
        styleOverrides: { maxWidth: '330px' },
        tableProps: {
          ...tableProps,
          data: {
            ...data,
            1: {
              hasWrapping: true,
              content: 'The quick brown fox jumps over the lazy dog',
            },
          },
          isTruncated: true,
        },
      },
      {
        columns: 3,
        styleOverrides: { maxWidth: '330px' },
        tableProps: {
          ...tableProps,
          data: {
            ...data,
            1: {
              hasWrapping: true,
              content: 'The quick brown fox jumps over the lazy dog',
            },
          },
          isTruncated: true,
        },
      },
      {
        columns: 10,
        styleOverrides: { maxWidth: '330px' },
        tableProps: {
          ...tableProps,
          data: {
            ...data,
            1: {
              hasWrapping: true,
              content: 'The quick brown fox jumps over the lazy dog',
            },
          },
          hasPinnedFirstColumn: true,
          hasPinnedLastColumn: true,
          hasCheckbox: true,
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
          hasOverflowMenu: true,
          createOverflowMenu: NOOP,
        },
      },
      {
        columns: 3,
        styleOverrides: { maxWidth: '330px' },
        tableProps: {
          ...tableProps,
          data: {
            ...data,
            1: {
              hasWrapping: true,
              content: 'The quick brown fox jumps over the lazy dog',
            },
          },
          onRowClick: NOOP,
          shouldRowClick: () => true,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'sorting',
    examples: [
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {
            0: { content: 'Apple' },
            1: { content: 'Carrot' },
            2: { content: 'Banana' },
          },
          activeSortKey: 'content',
          isSortAsc: true,
          onSortChange: NOOP,
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {
            0: { content: 'Apple' },
            1: { content: 'Carrot' },
            2: { content: 'Banana' },
          },
          activeSortKey: 'content',
          isSortAsc: false,
          onSortChange: NOOP,
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {
            0: { tags: [1] },
            1: { tags: [1, 2, 3] },
            2: { tags: [1, 2] },
          },
          activeSortKey: 'content',
          isSortAsc: false,
          onSortChange: NOOP,
          customSort: (data, isAsc) => {
            const comparison = isAsc
              ? (a, b) => a.tags.length > b.tags.length
              : (a, b) => a.tags.length < b.tags.length;

            return data.sort((a, b) => (comparison(a, b) ? 1 : -1));
          },
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'header / footer',
    examples: [
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          header: true,
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          footer: true,
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          header: true,
          footer: true,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'loading',
    examples: [
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          isLoading: true,
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {},
          isLoading: true,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'widths',
    viewports: desktopPlus320,
    examples: [
      {
        columns: 10,
        styleOverrides: { maxWidth: '750px' },
        tableProps,
      },
      {
        columns: 8,
        styleOverrides: { maxWidth: '500px' },
        tableProps,
      },
      {
        columns: 6,
        styleOverrides: { maxWidth: '250px' },
        tableProps,
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'empty',
    examples: [
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {},
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {},
          emptyMessage: 'Custom Message',
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {},
          emptyStateComponent: true,
        },
      },
      {
        columns: 3,
        tableProps: {
          ...tableProps,
          data: {},
          hasPinnedFirstColumn: true,
          hasCheckbox: true,
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
        },
      },
    ],
  },

  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'custom header and footer with pinned columns',
    examples: [
      {
        columns: 10,
        tableProps: {
          ...tableProps,
          hasPinnedFirstColumn: true,
          hasPinnedLastColumn: true,
          hasCheckbox: true,
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
          hasOverflowMenu: true,
          createOverflowMenu: NOOP,
          hasCustomHeader: true,
          hasCustomFooter: true,
        },
      },
    ],
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };
