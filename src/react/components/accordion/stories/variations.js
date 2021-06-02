import React from 'react';

import XUIAccordionItem from '../XUIAccordionItem';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIButton from '../../button/XUIButton';
import XUIContentBlock from '../../contentblock/XUIContentBlock';
import XUIContentBlockItem from '../../contentblock/XUIContentBlockItem';
import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIAccordion';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const items = [
  {
    id: 1,
    name: 'John Smith',
    contacts: [
      {
        contact: 'Peggy Olsen',
        project: 'Heinz',
        minutes: '00:20',
        percentage: '66',
      },
      {
        contact: 'Pete Campbell',
        project: 'American Aviation',
        minutes: '15:30',
        percentage: '75',
      },
    ],
  },
  {
    id: 2,
    name: 'Barry Allen',
    contacts: [
      {
        contact: 'Don Draper',
        project: 'Mad men',
        minutes: '1500:00',
        percentage: '100',
      },
    ],
  },
  {
    id: 3,
    name: 'Ernest Hemingway',
    contacts: [],
  },
];
const withChildContent = {
  storyKind: storiesWithVariationsKindName,
  storyTitle: 'with child content',
  viewports: desktopPlus320,
  children: items.map(({ id, name, contacts }) => {
    const totalContacts = contacts.length;
    return (
      <XUIAccordionItem
        action={<XUIButton size="small">See more</XUIButton>}
        key={id}
        leftContent={<XUIAvatar className="xui-margin-right" size="small" value={name} />}
        primaryHeading={name}
        secondaryHeading={`${totalContacts} project${totalContacts === 1 ? '' : 's'}`}
      >
        {Boolean(totalContacts) && (
          <XUIContentBlock>
            {contacts.map(({ contact, project, minutes, percentage }, key) => (
              <XUIContentBlockItem
                href="#"
                key={key}
                leftContent={<XUIAvatar size="small" value={contact} variant="business" />}
                pinnedValue={minutes}
                primaryHeading={`${contact} - ${project}`}
                secondaryHeading={`${minutes} chargeable (${percentage}%)`}
              />
            ))}
          </XUIContentBlock>
        )}
      </XUIAccordionItem>
    );
  }),
};
const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'basic accordion',
    children: [
      { id: 1, name: 'John Smith' },
      { id: 2, name: 'Barry Allen' },
      { id: 3, name: 'Ernest Hemingway' },
    ].map(({ id, name }) => <XUIAccordionItem key={id} primaryHeading={name} />),
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'basic accordion with item open',
    children: [
      { id: 1, name: 'John Smith' },
      { id: 2, name: 'Barry Allen' },
      { id: 3, name: 'Ernest Hemingway' },
    ].map(({ id, name }) => <XUIAccordionItem isOpen={id === 2} key={id} primaryHeading={name} />),
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'accordion tab composition',
    children: [
      { id: 1, name: 'John Smith', projects: '0 projects', minutes: '0:00' },
      { id: 2, name: 'Barry Allen', projects: '0 projects', minutes: '0:00' },
      { id: 3, name: 'Ernest Hemingway', projects: '0 projects', minutes: '0:00' },
    ].map(({ id, name, projects, minutes }) => (
      <XUIAccordionItem
        action={<XUIButton size="small">See more</XUIButton>}
        key={id}
        leftContent={<XUIAvatar className="xui-margin-right" size="small" value={name} />}
        pinnedValue={minutes}
        primaryHeading={name}
        secondaryHeading={projects}
      />
    )),
  },
  withChildContent,
  {
    ...withChildContent,
    storyTitle: `${withChildContent.storyTitle} expanded`,
    clickSelector: '.xui-accordionwrapper:first-child > [role="button"]',
  },
];

export { storiesWithKnobsKindName, storiesWithVariationsKindName, variations };
