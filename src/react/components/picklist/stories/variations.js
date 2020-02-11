import React from 'react';
import { desktopPlus320 } from '../../../stories/helpers/viewports';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import view from '@xero/xui-icon/icons/view';
import arrow from '@xero/xui-icon/icons/arrow';
import search from '@xero/xui-icon/icons/search';
import contact from '@xero/xui-icon/icons/contact';

const storiesWithVariationsKindName = 'Instances/XUIPicklist';

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
    storyTitle: 'as Wrapping horizontal',
    panelSize: '350px',
    lists: [
      {
        items: [
          { value: 'Automatic payments' },
          { value: 'Unpaid invoices' },
          { value: 'Draft invoices' },
        ],
        isHorizontal: true,
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Truncating horizontal',
    panelSize: '450px',
    lists: [
      {
        shouldTruncate: true,
        isHorizontal: true,
        items: [
          { value: 'Rosemary' },
          { value: 'Ji' },
          { value: 'Benjamin' },
          { value: 'Rob' },
          { value: 'Joanne' },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Wrapping horizontal with secondary element',
    panelSize: '500px',
    lists: [
      {
        isHorizontal: true,
        items: [
          { value: 'Status', secondaryElement: 'Draft, Sent' },
          { value: 'Task & expenses', secondaryElement: '3772' },
          { value: 'Created by', secondaryElement: 'Tim Redmond +2 others' },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Truncating horizontal with secondary element',
    panelSize: '600px',
    lists: [
      {
        shouldTruncate: true,
        isHorizontal: true,
        items: [
          {
            value: 'Status',
            secondaryElement: 'Draft, Sent',
          },
          {
            value: 'Task & expenses',
            secondaryElement: '3772',
          },
          {
            value: 'Created by',
            secondaryElement: 'Tim Redmond +2 others',
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'horizontal with avatars',
    viewports: desktopPlus320,
    lists: [
      {
        isHorizontal: true,
        items: [
          {
            value: 'James Magness',
            leftElement: <XUIAvatar size="small" value="James Magness" />,
            isSelected: true,
          },
          { value: 'Tim Redmond', leftElement: <XUIAvatar size="small" value="Tim Redmond" /> },
          {
            value: 'Grzegorz Pawłowski-Chudziński',
            leftElement: <XUIAvatar size="small" value="Grzegorz Pawłowski-Chudziński" />,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Truncating horizontal with avatars',
    panelSize: '600px',
    lists: [
      {
        isHorizontal: true,
        shouldTruncate: true,
        items: [
          {
            value: 'James Magness',
            leftElement: <XUIAvatar size="small" value="James Magness" />,
            isSelected: true,
          },
          { value: 'Tim Redmond', leftElement: <XUIAvatar size="small" value="Tim Redmond" /> },
          {
            value: 'Grzegorz Pawłowski-Chudziński',
            leftElement: <XUIAvatar size="small" value="Grzegorz Pawłowski-Chudziński" />,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Wrapping horizontal with leftelement and secondarytext',
    panelSize: '600px',
    lists: [
      {
        isHorizontal: true,
        items: [
          {
            value: 'Status',
            secondaryElement: 'Draft, Sent',
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
          {
            value: 'Task & expenses',
            secondaryElement: '3772',
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
          {
            value: 'Created by',
            secondaryElement: 'Tim Redmond +2 others',
            leftElement: <XUIAvatar size="small" value="Tim Redmond" />,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Truncating horizontal with leftelement and secondarytext',
    panelSize: '650px',
    lists: [
      {
        shouldTruncate: true,
        isHorizontal: true,
        items: [
          {
            value: 'Status',
            secondaryElement: 'Draft, Sent',
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
          {
            value: 'Task & expenses',
            secondaryElement: '3772',
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
          {
            value: 'Created by',
            secondaryElement: 'Tim Redmond +2 others',
            leftElement: <XUIAvatar size="small" value="Tim Redmond" />,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Truncating horizontal with leftelement and secondarytext (no panel width)',
    panelSize: '100vw',
    lists: [
      {
        shouldTruncate: true,
        isHorizontal: true,
        items: [
          {
            value: 'Status',
            secondaryElement: 'Draft, Sent',
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
          {
            value: 'Task & expenses',
            secondaryElement: '3772',
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
          {
            value: 'Created by',
            secondaryElement: 'Tim Redmond +2 others',
            leftElement: <XUIAvatar size="small" value="Tim Redmond" />,
          },
        ],
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Tab Dropdown with leftelement and secondarytext',
    panelSize: '100vw',
    viewports: desktopPlus320,
    lists: [
      {
        isHorizontal: true,
        swapAtBreakpoint: 'small',
        shouldTruncate: true,
        items: [
          {
            value: 'Status',
            secondaryElement: 'Draft, Sent',
            isSelected: true,
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
          {
            value: 'Task & expenses',
            secondaryElement: '3772',
            leftElement: <XUIIcon icon={iconsList[3]} />,
          },
          {
            value: 'Created by',
            secondaryElement: 'Tim Redmond +2 others',
            leftElement: <XUIAvatar size="small" value="Tim Redmond" />,
          },
        ],
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
    storyTitle: 'as Nested and uncontrolled (closed)',
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
    storyTitle: 'as Nested and uncontrolled (open)',
    isDefaultOpen: true,
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
    storyTitle: 'as Nested and controlled (closed)',
    isOpen: false,
    lists: [
      {
        items: [{}, { isSelected: true }],
      },
    ],
    componentType: 'NestedPicklist',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Nested and controlled (open)',
    isOpen: true,
    lists: [
      {
        items: [{}, { isSelected: true }],
      },
    ],
    componentType: 'NestedPicklist',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with wrapping in narrow list',
    viewports: desktopPlus320,
    isDefaultOpen: true,
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
    viewports: desktopPlus320,
    isDefaultOpen: true,
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
          { value: 'James Magness', leftElement: <XUIAvatar size="small" value="James Magness" /> },
          { value: 'Tim Redmond', leftElement: <XUIAvatar size="small" value="Tim Redmond" /> },
          { value: 'Vicky Min', leftElement: <XUIAvatar size="small" value="Vicky Min" /> },
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
    storyTitle: 'with all the things',
    lists: [
      {
        items: [
          {
            value: 'James Magness',
            leftElement: <XUIAvatar size="small" value="James Magness" />,
            rightElement: <XUIIcon icon={iconsList[0]} />,
            secondaryElement: 'Team lead',
            pinnedElement: '18',
          },
          {
            value: 'Tim Redmond',
            leftElement: <XUIAvatar size="small" value="Tim Redmond" />,
            rightElement: <XUIIcon icon={iconsList[1]} />,
            secondaryElement: 'Developer',
            pinnedElement: '3',
          },
          { isDivider: true },
          { isHeader: true, children: 'Recent' },
          {
            value: 'Grzegorz Pawłowski-Chudziński',
            leftElement: <XUIAvatar size="small" value="Grzegorz Pawłowski-Chudziński" />,
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
    storyTitle: 'multiselect with truncation',
    viewports: desktopPlus320,
    panelSize: '400px',
    lists: [
      {
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
            value: 'Zac Sanderson-Harris',
            rightElement: <XUIIcon icon={iconsList[2]} />,
            secondaryElement: 'Designer',
            pinnedElement: '42',
          },
        ],
      },
    ],
  },
];

export { storiesWithVariationsKindName, variations };
