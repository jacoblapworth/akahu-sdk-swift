import React from 'react';
import XUIAccordion from '../XUIAccordion';
import XUIAccordionItem from '../XUIAccordionItem';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';
import { variations, storiesWithVariationsKindName } from './variations';
import { createArray } from '../../progressindicator/helpers/utilities';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUIContentBlock from '../../contentblock/XUIContentBlock';
import XUIContentBlockItem from '../../contentblock/XUIContentBlockItem';
import overflowPathData from '@xero/xui-icon/icons/overflow';
import notificationPathData from '@xero/xui-icon/icons/notification';
import copyPathData from '@xero/xui-icon/icons/copy';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
  const itemsTotal = number('Total items', 3, { max: 5 }) || 0;
  const hasPrimaryHeading = boolean('Show primary heading', true);
  const hasSecondaryHeading = boolean('Show secondary heading', false);
  const hasLeftContent = boolean('Show left content', false);
  const hasPinnedValue = boolean('Show pinned value', false);
  const hasAction = boolean('Show action', false);
  const hasOverflow = boolean('Show overflow', false);
  const hasDescription = boolean('Show description', false);
  const hasOnItemClick = boolean('Has item click callback', false);
  const hasEmptyState = boolean('Show empty state', false);
  const onItemClick = ({ id, isOpen }) =>
    alert(`${isOpen ? 'Open' : 'Close'} accordion item #${id}`);
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
      action={
        hasAction && (
          <XUIButton className="xui-margin-left-small" size="small">
            Update
          </XUIButton>
        )
      }
      description={hasDescription && 'Descriptions are good'}
      leftContent={hasLeftContent && <XUIAvatar className="xui-margin-right" value={name} />}
      onClick={hasOnItemClick ? onItemClick : undefined}
      overflow={
        hasOverflow && (
          <XUIIconButton
            ariaLabel="Overflow menu"
            className="xui-margin-left-small"
            icon={overflowPathData}
            title="Overflow menu"
          />
        )
      }
      pinnedValue={
        hasPinnedValue && <span className="xui-margin-horizontal-small">{`${3 * index}:00`}</span>
      }
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
