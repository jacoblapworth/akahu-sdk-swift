const remove = () => () => undefined;

module.exports = {
  accordion: [
    {
      isDefault: true,
      props: [
        {
          name: 'toggleLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Toggle');
            }

            return node && node.value;
          },
        },
        {
          name: 'emptyMessage',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Nothing available to show');
            }

            return node && node.value;
          },
        },
      ],
    },
  ],
  autocompleter: [
    {
      isDefault: true,
      props: [
        {
          name: 'loadingLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Loading');
            }

            return node && node.value;
          },
        },
        {
          name: 'inputSize',
          valueTransform: remove(),
        },
      ],
    },
    {
      name: 'XUIAutocompleterEmptyState',
      props: [
        {
          name: 'children',
          valueTransform: (node, j, path) => {
            if (node !== undefined) {
              return node.value;
            }

            if (path.value.children.length === 0) {
              return j.literal('No results found');
            }

            return;
          },
        },
      ],
    },
  ],
  barchart: [
    {
      isDefault: true,
      props: getBarChartProps(),
    },
    {
      name: 'XUIBarChart',
      props: getBarChartProps(),
    },
  ],
  button: [
    {
      isDefault: true,
      props: [
        {
          name: 'loadingLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Loading');
            }

            return node && node.value;
          },
        },
        {
          name: 'variant',
          valueTransform: node => {
            if (node.value.value.includes('icon')) {
              return j.literal('MAKE_ME_AN_ICONBUTTON');
            }
            return node && node.value;
          },
        },
      ],
    },
  ],
  datepicker: [
    {
      isDefault: true,
      props: [
        {
          name: 'isCompact',
          valueTransform: remove(),
        },
      ],
    },
  ],
  dropdown: [
    {
      name: 'DropDownHeader',
      props: [
        {
          name: 'primaryButtonContent',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Apply');
            }

            return node && node.value;
          },
        },
        {
          name: 'secondaryButtonContent',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Cancel');
            }

            return node && node.value;
          },
        },
        {
          name: 'backButtonLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Back');
            }

            return node && node.value;
          },
        },
      ],
    },
  ],
  isolationheader: [
    {
      name: 'XUIIsolationHeaderActions',
      newName: 'IsolationHeaderActions_MOVE_TO_PROP_ON_ISOLATION_HEADER',
    },
    {
      name: 'XUIIsolationHeaderNavigation',
      newName: 'IsolationHeaderNavigation_MOVE_TO_PROP_ON_ISOLATION_HEADER',
    },
    {
      name: 'XUIIsolationHeaderSecondaryTitle',
      newName: 'IsolationHeaderSecondaryTitle_MOVE_TO_PROP_ON_ISOLATION_HEADER',
    },
    {
      name: 'XUIIsolationHeaderTitle',
      newName: 'IsolationHeaderTitle_MOVE_TO_PROP_ON_ISOLATION_HEADER',
    },
  ],
  modal: [
    {
      isDefault: true,
      props: [
        {
          name: 'closeButtonLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Close');
            }

            return node && node.value;
          },
        },
      ],
    },
  ],
  picklist: [
    {
      isDefault: true,
      props: [
        {
          name: 'size',
          valueTransform: remove(),
        },
      ],
    },
    {
      name: 'Pickitem',
      props: [
        {
          name: 'size',
          valueTransform: remove(),
        },
      ],
    },
    {
      name: 'NestedPicklist',
      props: [
        {
          name: 'size',
          valueTransform: remove(),
        },
      ],
    },
    {
      name: 'NestedPicklistContainer',
      props: [
        {
          name: 'size',
          valueTransform: remove(),
        },
      ],
    },
    {
      name: 'NestedPicklistTrigger',
      props: [
        {
          name: 'ariaLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Toggle submenu');
            }

            return node && node.value;
          },
        },
      ],
    },
  ],
  loader: [
    {
      isDefault: true,
      props: [
        {
          name: 'ariaLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Loading');
            }

            return node && node.value;
          },
        },
      ],
    },
  ],
  pill: [
    {
      isDefault: true,
      props: [
        {
          name: 'deleteButtonLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Delete');
            }

            return node && node.value;
          },
        },
        {
          name: 'size',
          valueTransform: (node, j) => {
            if (node.value.value === 'xsmall') {
              return j.literal('small');
            }
            return node && node.value;
          },
        },
      ],
    },
  ],
  'select-box': [
    {
      isDefault: true,
      props: [
        {
          name: 'caretTitle',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Toggle list');
            }

            return node && node.value;
          },
        },
      ],
    },
    {
      name: 'SelectBoxOption',
      props: [
        {
          name: 'size',
          valueTransform: remove(),
        },
      ],
    },
  ],
  table: [
    {
      isDefault: true,
      props: [
        {
          name: 'loaderLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Loading more data');
            }

            return node && node.value;
          },
        },
        {
          name: 'emptyMessage',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Nothing to show here');
            }

            return node && node.value;
          },
        },
        {
          name: 'checkOneRowLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Select row');
            }

            return node && node.value;
          },
        },
        {
          name: 'checkAllRowsLabel',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('Select all rows');
            }

            return node && node.value;
          },
        },
        {
          name: 'overflowMenuTitle',
          valueTransform: (node, j) => {
            if (node === undefined) {
              return j.literal('More row options');
            }

            return node && node.value;
          },
        },
      ],
    },
  ],
  structural: [
    {
      name: 'XUIBreadcrumb',
      newName: 'XUIBreadcrumbTrail',
      newImportPath: 'pageheader',
    },
    {
      name: 'XUIPageHeader',
      newImportPath: 'pageheader',
    },
    {
      name: 'XUIActions',
      newImportPath: 'actions',
    },
    {
      name: 'XUIContentBlock',
      newImportPath: 'contentblock',
    },
    {
      name: 'XUIContentBlockItem',
      newImportPath: 'contentblock',
    },
    {
      name: 'XUIOverviewBlock',
      newImportPath: 'overviewblock',
    },
    {
      name: 'XUIOverviewSection',
      newImportPath: 'overviewblock',
    },
    {
      name: 'XUIPanel',
      newImportPath: 'panel',
    },
    {
      name: 'XUIPanelHeading',
      newImportPath: 'panel',
    },
    {
      name: 'XUIPanelFooter',
      newImportPath: 'panel',
    },
    {
      name: 'XUIPanelSection',
      newImportPath: 'panel',
    },
  ],
};

function getBarChartProps() {
  return [
    {
      name: 'keyTitle',
      valueTransform: (node, j) => {
        if (node === undefined) {
          return j.literal('Graph key');
        }

        return node && node.value;
      },
    },
    {
      name: 'emptyMessage',
      valueTransform: (node, j) => {
        if (node === undefined) {
          return j.literal('There is no data to display');
        }

        return node && node.value;
      },
    },
    {
      name: 'paginationNextTitle',
      valueTransform: (node, j) => {
        if (node === undefined) {
          return j.literal('Next page');
        }

        return node && node.value;
      },
    },
    {
      name: 'paginationPreviousTitle',
      valueTransform: (node, j) => {
        if (node === undefined) {
          return j.literal('Previous page');
        }

        return node && node.value;
      },
    },
    {
      name: 'loadingLabel',
      valueTransform: (node, j) => {
        if (node === undefined) {
          return j.literal('Loading');
        }

        return node && node.value;
      },
    },
  ];
}
