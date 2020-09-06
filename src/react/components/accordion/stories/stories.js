import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

// Components we need to test with
import overflowPathData from '@xero/xui-icon/icons/overflow';
import XUIAccordion from '../XUIAccordion';
import XUIAccordionItem from '../XUIAccordionItem';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUIContentBlock from '../../contentblock/XUIContentBlock';
import XUIContentBlockItem from '../../contentblock/XUIContentBlockItem';

import { createArray } from '../../progressindicator/helpers/utilities';

import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const action = boolean('Show action', false) ? <XUIButton size="small">Update</XUIButton> : null;
  const hasPrimaryHeading = boolean('Show primary heading', true);
  const hasSecondaryHeading = boolean('Show secondary heading', false);
  const hasLeftContent = boolean('Show left content', false);
  const hasPinnedValue = boolean('Show pinned value', false);
  const hasDescription = boolean('Show description', false);
  const hasOnItemClick = boolean('Has item click callback', false);
  const hasEmptyState = boolean('Show empty state', false);
  const onItemClick = ({ id, isOpen }) =>
    alert(`${isOpen ? 'Open' : 'Close'} accordion item #${id}`);
  const overflow = boolean('Show overflow', false) ? (
    <XUIIconButton ariaLabel="Overflow menu" icon={overflowPathData} title="Overflow menu" />
  ) : null;
  const items = [
    {
      name: 'Earnest Borer',
      address: '410 Lorine Garden',
    },
    {
      name: 'Brandy Lindgren',
      address: '9973 Runolfsson Circles',
    },
    {
      name: 'Armando Erdman',
      address: '331 Kihn Plaza',
    },
    {
      name: 'Maverick Hoeger',
      address: '805 Tommie Canyon',
    },
    {
      name: 'Kailey Hodkiewicz',
      address: '7368 Kovacek Pines',
    },
  ];
  const children = items.map(({ name, address }, index) => (
    <XUIAccordionItem
      action={action}
      description={hasDescription && 'Descriptions are good'}
      key={index}
      leftContent={
        hasLeftContent && <XUIAvatar className="xui-margin-right" size="small" value={name} />
      }
      onClick={hasOnItemClick ? onItemClick : undefined}
      overflow={overflow}
      pinnedValue={hasPinnedValue && <span>{`${3 * index}:00`}</span>}
      primaryHeading={hasPrimaryHeading && name}
      secondaryHeading={hasSecondaryHeading && address}
    >
      {!hasEmptyState && (
        <XUIContentBlock>
          {createArray(index + 1).map((_, index) => (
            <XUIContentBlockItem
              href="#"
              key={index}
              overflow={
                <XUIIconButton
                  ariaLabel="Overflow menu"
                  icon={overflowPathData}
                  title="Overflow menu"
                />
              }
              pinnedValue={`${3 * index + 1}:00`}
              primaryHeading={items[index].name}
            />
          ))}
        </XUIContentBlock>
      )}
    </XUIAccordionItem>
  ));

  return (
    <div style={{ maxWidth: '930px' }}>
      <XUIAccordion emptyMessage="Nothing available to show" toggleLabel="Toggle">
        {children}
      </XUIAccordion>
    </div>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);
variations.forEach(variation => {
  const { storyTitle, children, ...props } = variation;
  const Comparison = (
    <div style={{ maxWidth: '930px' }}>
      <XUIAccordion emptyMessage="Nothing available to show" toggleLabel="Toggle" {...props}>
        {children}
      </XUIAccordion>
    </div>
  );

  storiesWithVariations.add(storyTitle, () => Comparison);
});
