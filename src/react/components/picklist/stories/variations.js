const storiesWithVariationsKindName = 'Instances/XUIPicklist';
import React from 'react';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import view from '@xero/xui-icon/icons/view';
import arrow from '@xero/xui-icon/icons/arrow';
import search from '@xero/xui-icon/icons/search';
import contact from '@xero/xui-icon/icons/contact';

const iconsList = [view, arrow, search, contact];

// Empty objects in the items array will build items with the default settings.
const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Selected and Disabled States',
    lists: [
      {
        items: [
          { isSelected: true },
          { isDisabled: true },
          {
            isSelected: true,
            isDisabled: true,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Truncating items',
    panelSize: '350px',
    lists: [
      {
        shouldTruncate: true,
        items: [
          {
            value:
              'The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
            isSelected: true,
            href: 'http://xui.xero.com',
          },
          {
            onClick: () => {
              console.log('clicked!');
            },
          },
          {},
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Horizontal',
    lists: [
      {
        items: [
          {},
          { isSelected: true, href: 'http://xui.xero.com' },
          {
            onClick: () => {
              console.log('clicked!');
            },
          },
        ],
        isHorizontal: true,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with Multiselect',
    lists: [
      {
        isMultiselect: true,
        items: [{ isSelected: true }, {}, { isDisabled: true }],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Stateful Picklist',
    lists: [
      {
        items: [{}, { isDisabled: true }, { isSelected: true }, {}],
      },
    ],
    componentType: 'StatefulPicklist',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Nested (closed)',
    lists: [
      {
        items: [{}, { isSelected: true }],
      },
      {
        isMultiselect: true,
        items: [{ isSelected: true }, {}, { isDisabled: true }],
      },
    ],
    componentType: 'NestedPicklist',
    // size: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Nested (open)',
    isOpen: true,
    lists: [
      {
        items: [{}, { isSelected: true }],
      },
      {
        isMultiselect: true,
        items: [{ isSelected: true }, {}, { isDisabled: true }],
      },
    ],
    componentType: 'NestedPicklist',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Nested small (open)',
    isOpen: true,
    lists: [
      {
        items: [{}, { isSelected: true }],
      },
      {
        isMultiselect: true,
        items: [{ isSelected: true }, {}, { isDisabled: true }],
      },
    ],
    componentType: 'NestedPicklist',
    size: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Nested xsmall (open)',
    isOpen: true,
    lists: [
      {
        items: [{}, { isSelected: true }],
      },
      {
        items: [{ isSelected: true }, {}, { isDisabled: true }],
      },
    ],
    componentType: 'NestedPicklist',
    size: 'xsmall',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with wrapping in narrow list',
    isOpen: true,
    componentType: 'StatefulPicklist',
    panelSize: '200px',
    lists: [
      {
        isMultiselect: true,
        items: [{}, {}, {}, {}],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with truncation in narrow list',
    isOpen: true,
    componentType: 'StatefulPicklist',
    panelSize: '200px',
    lists: [
      {
        isMultiselect: true,
        shouldTruncate: true,
        items: [{}, {}, {}, {}],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with headings',
    lists: [
      {
        items: [
          { isHeader: true, children: 'Recent' },
          { value: '302 — Entertainment' },
          { value: '440 — Overseas Travel' },
          { value: '301 — Office Supplies' },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with secondary copy',
    lists: [
      {
        items: [
          { value: 'Status', secondaryElement: 'Draft, Sent' },
          { value: 'Date range', secondaryElement: '1 Apr 2016 — 31 Mar 2017' },
          { value: 'Created by', secondaryElement: 'Tim Redmond +2 others' },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with pinned values',
    lists: [
      {
        items: [
          { value: 'Draft', pinnedElement: '18' },
          { value: 'Sent', pinnedElement: '3' },
          { value: 'Paid', pinnedElement: '42' },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with avatars',
    lists: [
      {
        items: [
          { value: 'James Magness', leftElement: <XUIAvatar value="James Magness" size="small" /> },
          { value: 'Tim Redmond', leftElement: <XUIAvatar value="Tim Redmond" size="small" /> },
          { value: 'Maxine Ellah', leftElement: <XUIAvatar value="Maxine Ellah" size="small" /> },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with an icon',
    lists: [
      {
        items: [{ value: 'Create new', leftElement: <XUIIcon icon={view} /> }],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'invalid with right media',
    lists: [
      {
        items: [
          {
            value: 'Status',
            rightElement: <XUIIcon icon={iconsList[0]} />,
            isSelected: true,
            isInvalid: true,
          },
          { isDivider: true },
          { isHeader: true, children: 'Recent' },
          {
            value: 'Date range',
            rightElement: <XUIIcon icon={iconsList[1]} />,
            isInvalid: true,
          },
          {
            value: 'Created by',
            rightElement: <XUIIcon icon={iconsList[2]} />,
            isInvalid: true,
            isDisabled: true,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'small with all the things',
    lists: [
      {
        size: 'small',
        items: [
          {
            value: 'James Magness',
            leftElement: <XUIAvatar value="James Magness" size="xsmall" />,
            rightElement: <XUIIcon icon={iconsList[0]} />,
            secondaryElement: 'Team lead',
            pinnedElement: '18',
          },
          {
            value: 'Tim Redmond',
            leftElement: <XUIAvatar value="Tim Redmond" size="xsmall" />,
            rightElement: <XUIIcon icon={iconsList[1]} />,
            secondaryElement: 'Developer',
            pinnedElement: '3',
          },
          { isDivider: true },
          { isHeader: true, children: 'Recent' },
          {
            value: 'Maxine Ellah',
            leftElement: <XUIAvatar value="Maxine Ellah" size="xsmall" />,
            rightElement: <XUIIcon icon={iconsList[2]} />,
            secondaryElement: 'Developer',
            pinnedElement: '42',
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'small multiselect',
    lists: [
      {
        size: 'small',
        isMultiselect: true,
        items: [
          {
            value: 'James Magness',
            secondaryElement: 'Team lead',
            pinnedElement: '18',
          },
          {
            value: 'Tim Redmond',
            pinnedElement: '3',
            secondaryElement:
              'The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
          },
          {
            value:
              'Maxine Ellah The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
            secondaryElement: 'Developer',
            pinnedElement: '42',
            isSelected: true,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'xsmall wrapping with all the things',
    panelSize: '300px',
    lists: [
      {
        size: 'xsmall',
        items: [
          {
            value: 'James Magness',
            leftElement: <XUIAvatar value="James Magness" size="2xsmall" />,
            rightElement: <XUIIcon icon={iconsList[0]} />,
            secondaryElement:
              'The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
            pinnedElement: '18',
          },
          { isDivider: true },
          { isHeader: true, children: 'Recent' },
          {
            value:
              'Tim Redmond The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
            leftElement: <XUIAvatar value="Tim Redmond" size="2xsmall" />,
            rightElement: <XUIIcon icon={iconsList[1]} />,
            secondaryElement: 'Developer',
            pinnedElement: '3',
          },
          {
            value: 'Maxine Ellah',
            leftElement: <XUIAvatar value="Maxine Ellah" size="2xsmall" />,
            rightElement: <XUIIcon icon={iconsList[2]} />,
            secondaryElement: 'Developer',
            pinnedElement: '42',
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'xsmall truncating with all the things',
    panelSize: '300px',
    lists: [
      {
        shouldTruncate: true,
        size: 'xsmall',
        items: [
          {
            value: 'James Magness',
            leftElement: <XUIAvatar value="James Magness" size="2xsmall" />,
            rightElement: <XUIIcon icon={iconsList[0]} />,
            secondaryElement:
              'The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
            pinnedElement: '18',
          },
          { isDivider: true },
          { isHeader: true, children: 'Recent' },
          {
            value:
              'Tim Redmond The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
            leftElement: <XUIAvatar value="Tim Redmond" size="2xsmall" />,
            rightElement: <XUIIcon icon={iconsList[1]} />,
            secondaryElement: 'Developer',
            pinnedElement: '3',
          },
          {
            value: 'Maxine Ellah',
            leftElement: <XUIAvatar value="Maxine Ellah" size="2xsmall" />,
            rightElement: <XUIIcon icon={iconsList[2]} />,
            secondaryElement: 'Developer',
            pinnedElement: '42',
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'horizontal with avatars',
    lists: [
      {
        isHorizontal: true,
        items: [
          {
            value: 'James Magness',
            leftElement: <XUIAvatar value="James Magness" size="small" />,
            isSelected: true,
          },
          { value: 'Tim Redmond', leftElement: <XUIAvatar value="Tim Redmond" size="small" /> },
          { value: 'Maxine Ellah', leftElement: <XUIAvatar value="Maxine Ellah" size="small" /> },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'small horizontal with right media',
    lists: [
      {
        isHorizontal: true,
        size: 'small',
        items: [
          {
            value: 'Status',
            rightElement: <XUIIcon icon={iconsList[3]} />,
            isSelected: true,
          },
          {
            value: 'Date range',
            rightElement: <XUIIcon icon={iconsList[1]} />,
            isInvalid: true,
          },
          {
            value: 'Created by',
            rightElement: <XUIIcon icon={iconsList[2]} />,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'xsmall horizontal with wrapping et al',
    panelSize: '275px',
    lists: [
      {
        isHorizontal: true,
        size: 'xsmall',
        items: [
          {
            value: 'James Magness',
            pinnedElement: '18',
            leftElement: <XUIIcon icon={iconsList[0]} />,
            isSelected: true,
          },
          {
            value: 'Tim Redmond',
            pinnedElement: '3',
            leftElement: <XUIIcon icon={iconsList[2]} />,
          },
          {
            value: 'Maxine Ellah',
            pinnedElement: '42',
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'small horizontal with truncation',
    panelSize: '275px',
    lists: [
      {
        shouldTruncate: true,
        isHorizontal: true,
        size: 'small',
        items: [
          {
            value: 'James Magness',
            leftElement: <XUIIcon icon={iconsList[0]} />,
            isSelected: true,
          },
          {
            value: 'Tim Redmond',
            leftElement: <XUIIcon icon={iconsList[2]} />,
          },
          {
            value: 'Maxine Ellah',
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'multiselect with truncation',
    panelSize: '400px',
    lists: [
      {
        size: 'small',
        isMultiselect: true,
        shouldTruncate: true,
        items: [
          {
            value: 'James Magness',
            rightElement: <XUIIcon icon={iconsList[0]} />,
            secondaryElement:
              'The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
            pinnedElement: 'Administrator',
          },
          { isDivider: true },
          { isHeader: true, children: 'Recent' },
          {
            value:
              'Tim Redmond The default behaviour of pickitem text is to wrap. To prevent wrapping, apply the following utility class.',
            rightElement: <XUIIcon icon={iconsList[1]} />,
            secondaryElement: 'Developer',
            pinnedElement: '3',
          },
          {
            value: 'Maxine Ellah',
            rightElement: <XUIIcon icon={iconsList[2]} />,
            secondaryElement: 'Developer',
            pinnedElement: '42',
          },
        ],
      },
    ],
  },
];

module.exports = {
  storiesWithVariationsKindName,
  variations,
};
