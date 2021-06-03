import { desktopPlus320 } from '../../../stories/helpers/viewports';
import chipper from './chipper';

const storiesWithKnobsKindName = 'Components/XUIBarChart';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const standardBarsData = [
  { id: 0, x: 'Apple', y: 1 },
  { id: 1, x: 'Potato', y: 2 },
  { id: 2, x: 'Carrot', y: 3 },
];

const negativeBarsData = [
  { id: 0, x: 'Profit', y: 15975 },
  { id: 1, x: 'Invoiced', y: 20000 },
  { id: 2, x: 'Costs', y: -4025 },
];

const stackedBarsData = [
  { id: 0, x: 'Apple', y: [1] },
  { id: 1, x: 'Potato', y: [1, 2] },
  { id: 2, x: 'Carrot', y: [1, 2, 3] },
];

const stackedBarColor = ['#50DCAA', null, '#B446C8'];

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Standard Active Bars',
    examples: [
      {
        chartId: 'standardActiveBars',
        chartTitle: 'Standard Active Bars',
        chartDescription: 'Active states on a standard layout',
        barsData: standardBarsData,
        activeBars: {
          0: true,
          2: false,
        },
      },
      {
        chartId: 'stackedActiveBars',
        chartTitle: 'Stacked Active Bars',
        chartDescription: 'Active states on a stacked layout',
        isBarStacked: true,
        barsData: stackedBarsData,
        barColorActive: 'hsla(320, 100%, 50%, 0.5)',
        activeBars: {
          0: true,
          2: [1],
        },
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Standard Colored Bars',
    examples: [
      {
        chartId: 'standardColoredBars',
        chartTitle: 'Standard Colored Bars',
        chartDescription: 'Colored bars on a standard layout',
        barsData: standardBarsData,
        barColor: '#FA8200',
      },
      {
        chartId: 'stackedColoredBars',
        chartTitle: 'Stacked Colored Bars',
        chartDescription: 'Colored stacks on a stacked layout',
        isBarStacked: true,
        barsData: stackedBarsData,
        barColor: stackedBarColor,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Bars Overflow',
    examples: [
      {
        chartId: 'scrollOverflow',
        chartTitle: 'Scroll Overflow',
        chartDescription: 'Native horizontal scrolling when content overflows',
        barsData: standardBarsData,
        xAxisVisibleItems: 2,
      },
      {
        chartId: 'paginationOverflow',
        chartTitle: 'Pagination Overflow',
        chartDescription: 'Custom pagination scrolling when content overflows',
        barsData: standardBarsData,
        xAxisVisibleItems: 2,
        hasPagination: true,
      },
      {
        chartId: 'paginationCustomMessage',
        chartTitle: 'Pagination Custom Message',
        chartDescription: 'Custom pagination message enhancement',
        barsData: standardBarsData,
        xAxisVisibleItems: 2,
        hasPagination: true,
        createPaginationMessage: (current, total) => `Page ${current} of ${total}`,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Customise Y-Axis',
    examples: [
      {
        chartId: 'customYaxisLabel',
        chartTitle: 'Custom Y-Axis Label',
        chartDescription: 'Custom y-axis label for each vertical tick',
        barsData: standardBarsData,
        createYAxisLabelFormat: y => `${Math.round(y * 100)}k`,
      },
      {
        chartId: 'customYaxisNegative',
        chartTitle: 'Negative Y-Axis Values',
        chartDescription: 'Dealing with negative numbers in the y-axis',
        barsData: negativeBarsData,
      },
      {
        chartId: 'customYaxisMaximumAcceptedValue',
        chartTitle: 'Custom Y-Axis Maximum "Accepted" Value',
        chartDescription:
          'Increase the maximum y-axis value to a custom value that exceeds the largest bar total',
        barsData: standardBarsData,
        yAxisDefaultTopValue: 20,
      },
      {
        chartId: 'customYaxisMaximumDeclinedValue',
        chartTitle: 'Custom Y-Axis Maximum "Declined" Value',
        chartDescription:
          'Propose a maximum y-axis value that is declined due to being lower than the largest bar total',
        barsData: standardBarsData,
        yAxisDefaultTopValue: 2,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Undefined / Disparit Stress Test',
    examples: [
      {
        chartId: 'undefinedBarData',
        chartTitle: 'Undefined Bar Data',
        chartDescription:
          'Appearance of the chart when no bars in the data set have a value greater than zero',
        barsData: [
          { id: 0, x: 'Apple' },
          { id: 1, x: 'Potato', y: 0 },
          { id: 2, x: 'Carrot', y: undefined },
        ],
      },
      {
        chartId: 'disparitBarData',
        chartTitle: 'Disparit Bar Data',
        chartDescription:
          'Avoid the situation where a data set is so disparit that a bar with a low value can actually disappear',
        barsData: [
          { id: 0, x: 'Apple', y: 0 },
          { id: 1, x: 'Potato', y: 10 },
          { id: 2, x: 'Carrot', y: 1000000 },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Loading State',
    examples: [
      {
        chartId: 'loadingState',
        chartTitle: 'Loading State',
        chartDescription: 'The charts loading state that removes the generic charting scaffold',
        barsData: standardBarsData,
        isLoading: true,
        loadingAriaLabel: 'Loading Aria Label',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Empty States',
    examples: [
      {
        chartId: 'standardEmptyState',
        chartTitle: 'Standard Empty State',
        chartDescription:
          'The default empty state that appears automatically when no bar data is supplied',
        barsData: [],
      },
      {
        chartId: 'customEmptyMessage',
        chartTitle: 'Custom Empty Message',
        chartDescription: 'Add a customised message to the default empty state',
        barsData: [],
        emptyMessage: 'Custom Empty Message',
      },
      {
        chartId: 'customEmptyComponent',
        chartTitle: 'CustomEmptyComponent',
        chartDescription: 'Supply a customised empty state component',
        barsData: [],
        emptyStateComponent: '🙃',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Avatar X-Axis Label',
    examples: [
      {
        chartId: 'tinyAvatarLabel',
        chartTitle: 'Tiny Avatar Label',
        chartDescription: 'Show just the avatar icon',
        chartHeight: 200,
        barsData: [{ id: 0, x: 'Apple', y: 1 }],
        xAxisType: 'avatar',
        testStyles: { flexGrow: 'initial', width: '110px' },
      },
      {
        chartId: 'smallAvatarLabel',
        chartTitle: 'Small Avatar Label',
        chartDescription: 'Show the small font stacked avatar and label variant',
        chartHeight: 200,
        barsData: [{ id: 0, x: 'Apple', y: 1 }],
        xAxisType: 'avatar',
        testStyles: { flexGrow: 'initial', width: '130px' },
      },
      {
        chartId: 'mediumAvatarLabel',
        chartTitle: 'MediumAvatarLabel',
        chartDescription: 'Show the large font stacked avatar and label variant',
        chartHeight: 200,
        barsData: [{ id: 0, x: 'Apple', y: 1 }],
        xAxisType: 'avatar',
        testStyles: { flexGrow: 'initial', width: '160px' },
      },
      {
        chartId: 'largeAvatarLabel',
        chartTitle: 'Label Avatar Label',
        chartDescription: 'Show the large font inline avatar and label variant',
        chartHeight: 200,
        barsData: [{ id: 0, x: 'Apple', y: 1 }],
        xAxisType: 'avatar',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Avatar Image X-Axis Label',
    delay: 3000,
    examples: [
      {
        chartId: 'tinyAvatarLabel',
        chartTitle: 'Tiny Avatar Label',
        chartDescription: 'Show just the avatar icon',
        chartHeight: 200,
        barsData: [
          {
            id: 0,
            x: 'Apple',
            y: 1,
            avatarUrl: chipper,
          },
        ],
        xAxisType: 'avatar',
        testStyles: { flexGrow: 'initial', width: '110px' },
      },
      {
        chartId: 'smallAvatarLabel',
        chartTitle: 'Small Avatar Label',
        chartDescription: 'Show the small font stacked avatar and label variant',
        chartHeight: 200,
        barsData: [
          {
            id: 0,
            x: 'Apple',
            y: 1,
            avatarUrl: chipper,
          },
        ],
        xAxisType: 'avatar',
        testStyles: { flexGrow: 'initial', width: '130px' },
      },
      {
        chartId: 'mediumAvatarLabel',
        chartTitle: 'MediumAvatarLabel',
        chartDescription: 'Show the large font stacked avatar and label variant',
        chartHeight: 200,
        barsData: [
          {
            id: 0,
            x: 'Apple',
            y: 1,
            avatarUrl: chipper,
          },
        ],
        xAxisType: 'avatar',
        testStyles: { flexGrow: 'initial', width: '160px' },
      },
      {
        chartId: 'largeAvatarLabel',
        chartTitle: 'Label Avatar Label',
        chartDescription: 'Show the large font inline avatar and label variant',
        chartHeight: 200,
        barsData: [
          {
            id: 0,
            x: 'Apple',
            y: 1,
            avatarUrl: chipper,
          },
        ],
        xAxisType: 'avatar',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Abbreviation X-Axis Label',
    examples: [
      {
        chartId: 'tinyAbbreviationLabel',
        chartTitle: 'Tiny Abbreviation Label',
        chartDescription: 'Show the tiny text string in a small font',
        chartHeight: 200,
        barsData: [{ id: 0, x: 'A | App | Apple | Organic Apple', y: 1 }],
        xAxisType: 'abbreviation',
        testStyles: { flexGrow: 'initial', width: '110px' },
      },
      {
        chartId: 'smallAbbreviationLabel',
        chartTitle: 'Small Abbreviation Label',
        chartDescription: 'Show the small text string in a small font',
        chartHeight: 200,
        barsData: [{ id: 0, x: 'A | App | Apple | Organic Apple', y: 1 }],
        xAxisType: 'abbreviation',
        testStyles: { flexGrow: 'initial', width: '130px' },
      },
      {
        chartId: 'mediumAbbreviationLabel',
        chartTitle: 'Medium Abbreviation Label',
        chartDescription: 'Show the medium text string in a large font',
        chartHeight: 200,
        barsData: [{ id: 0, x: 'A | App | Apple | Organic Apple', y: 1 }],
        xAxisType: 'abbreviation',
        testStyles: { flexGrow: 'initial', width: '160px' },
      },
      {
        chartId: 'largeAbbreviationLabel',
        chartTitle: 'Label Abbreviation Label',
        chartDescription: 'Show the large text string in a large font',
        chartHeight: 200,
        barsData: [{ id: 0, x: 'A | App | Apple | Organic Apple', y: 1 }],
        xAxisType: 'abbreviation',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Header elements',
    examples: [
      {
        chartId: 'hiddenHeader',
        chartTitle: 'Hidden Header',
        isChartTitleHidden: true,
        chartDescription: 'Hide the header when no key, pagination and visual title is required',
        chartHeight: 200,
        barsData: standardBarsData,
        testStyles: { width: '50%' },
      },
      {
        chartId: 'headerKey',
        chartTitle: 'Header Key',
        chartDescription: 'Show the title and key in a flexible layout',
        chartHeight: 200,
        barsData: standardBarsData,
        keyLabel: 'Fruit',
        testStyles: { width: '50%' },
      },
      {
        chartId: 'headerKeyWithPagination',
        chartTitle: 'Header Key With Standard Pagination',
        chartDescription:
          'Show the key and standard pagination associated together in a flexible layout',
        chartHeight: 200,
        barsData: standardBarsData,
        keyLabel: 'Fruit',
        xAxisVisibleItems: 2,
        hasPagination: true,
        testStyles: { width: '50%' },
      },
      {
        chartId: 'headerKeyWithCustomPagination',
        chartTitle: 'Header Key With Custom Pagination Message',
        chartDescription:
          'Place the custom pagination version on its own line when at a narrow element size',
        chartHeight: 200,
        barsData: standardBarsData,
        keyLabel: 'Fruit',
        xAxisVisibleItems: 2,
        hasPagination: true,
        createPaginationMessage: (current, total) => `Page ${current} of ${total}`,
        testStyles: { width: '50%' },
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Standard Negative Bars',
    examples: [
      {
        chartId: 'standardNegativeBars',
        chartTitle: 'Standard Negative Bars',
        chartDescription: 'Negative states on a standard layout',
        barsData: [
          { ...standardBarsData[0], y: -1 },
          { ...standardBarsData[1], y: 1 },
          { ...standardBarsData[2], y: -2 },
        ],
      },
      {
        chartId: 'stackedNegativeBars',
        chartTitle: 'Stacked Negative Bars',
        chartDescription: 'Negative states on a stacked layout',
        isBarStacked: true,
        barsData: [
          { ...standardBarsData[0], y: [-1] },
          { ...standardBarsData[1], y: [1, -2] },
          { ...standardBarsData[2], y: [-1, 2, -3] },
        ],
        barColor: stackedBarColor,
      },
      {
        chartId: 'stackedOnlyNegativeBars',
        chartTitle: 'Stacked Only Negative Bars',
        chartDescription: 'Negative states on a stacked layout',
        isBarStacked: true,
        barsData: [
          { ...standardBarsData[0], y: [-1, 0, 0] },
          { ...standardBarsData[1], y: [0, 0, -2] },
          { ...standardBarsData[2], y: [0, 2, 0] },
        ],
        barColor: stackedBarColor,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Responsive with Stacked Active Bars',
    viewports: desktopPlus320,
    customDecorator: true,
    examples: [
      {
        chartId: 'stackedActiveBars',
        chartTitle: 'Stacked Active Bars',
        chartDescription: 'Active states on a stacked layout',
        isBarStacked: true,
        barsData: stackedBarsData,
        barColorActive: 'hsla(320, 100%, 50%, 0.5)',
        activeBars: {
          0: true,
          2: [1],
        },
      },
    ],
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };
