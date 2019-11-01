module.exports = {
  '@xero/xui/react/accordion': [
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
  '@xero/xui/react/autocompleter': [
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
  '@xero/xui/react/barchart': [
    {
      isDefault: true,
      props: getBarChartProps(),
    },
    {
      name: 'XUIBarChart',
      props: getBarChartProps(),
    },
  ],
  '@xero/xui/react/button': [
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
      ],
    },
  ],
  '@xero/xui/react/dropdown': [
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
  '@xero/xui/react/isolationheader': [
    {
      name: 'XUIIsolationHeaderActions',
      newName: 'IsolationHeaderActions_MOVE_TO_PROP_ON_ISOLATION_HEADER',
      props: [],
    },
    {
      name: 'XUIIsolationHeaderNavigation',
      newName: 'IsolationHeaderNavigation_MOVE_TO_PROP_ON_ISOLATION_HEADER',
      props: [],
    },
    {
      name: 'XUIIsolationHeaderSecondaryTitle',
      newName: 'IsolationHeaderSecondaryTitle_MOVE_TO_PROP_ON_ISOLATION_HEADER',
      props: [],
    },
    {
      name: 'XUIIsolationHeaderTitle',
      newName: 'IsolationHeaderTitle_MOVE_TO_PROP_ON_ISOLATION_HEADER',
      props: [],
    },
  ],
  '@xero/xui/react/modal': [
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
  '@xero/xui/react/picklist': [
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
  '@xero/xui/react/loader': [
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
  '@xero/xui/react/pill': [
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
      ],
    },
  ],
  '@xero/xui/react/select-box': [
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
  ],
  '@xero/xui/react/table': [
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
  '@xero/xui/react/structural': [
    {
      name: 'XUIBreadcrumb',
      newName: 'XUIBreadcrumbTrail',
      newImportPath: '@xero/xui/react/pageheader',
      props: [],
    },
    {
      name: 'XUIPageHeader',
      newImportPath: '@xero/xui/react/pageheader',
      props: [],
    },
    {
      name: 'XUIActions',
      newImportPath: '@xero/xui/react/actions',
      props: [],
    },
    {
      name: 'XUIContentBlock',
      newImportPath: '@xero/xui/react/contentblock',
      props: [],
    },
    {
      name: 'XUIContentBlockItem',
      newImportPath: '@xero/xui/react/contentblock',
      props: [],
    },
    {
      name: 'XUIOverviewBlock',
      newImportPath: '@xero/xui/react/overviewblock',
      props: [],
    },
    {
      name: 'XUIOverviewSection',
      newImportPath: '@xero/xui/react/overviewblock',
      props: [],
    },
    {
      name: 'XUIPanel',
      newImportPath: '@xero/xui/react/panel',
      props: [],
    },
    {
      name: 'XUIPanelHeading',
      newImportPath: '@xero/xui/react/panel',
      props: [],
    },
    {
      name: 'XUIPanelFooter',
      newImportPath: '@xero/xui/react/panel',
      props: [],
    },
    {
      name: 'XUIPanelSection',
      newImportPath: '@xero/xui/react/panel',
      props: [],
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
