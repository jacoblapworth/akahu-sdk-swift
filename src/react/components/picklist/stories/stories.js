// Libs
import React from 'react';

// Components we need to test with
import XUIPicklist from '../Picklist';
import XUIPickitem from '../Pickitem';
import XUIPicklistHeader from '../PicklistHeader';
import XUIPicklistDivider from '../PicklistDivider';
import StatefulPicklist from '../StatefulPicklist';
import NestedPicklistContainer from '../NestedPicklistContainer';
import NestedPicklistTrigger from '../NestedPicklistTrigger';
import NestedPicklist from '../NestedPicklist';
import { sizeShift } from '../../helpers/sizes';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import XUIPanel from '../../structural/XUIPanel';
import arrow from '@xero/xui-icon/icons/arrow';
import search from '@xero/xui-icon/icons/search';
import contact from '@xero/xui-icon/icons/contact';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/xuiResponsiveCenter';

import { storiesWithVariationsKindName, variations } from './variations';

const itemLabels = [
  'Hello, I am an item',
  'Short item',
  'This item will be a bit longer and just fine!',
];

const logEvent = event => {
  console.log(event.type);
};
const logAllEvents = {
  onClick: logEvent,
  onFocus: logEvent,
  onBlur: logEvent,
  onKeyDown: logEvent,
  onMouseOver: logEvent,
};

const buildItemsFromSettings = (settings, listIndex, componentType) => {
  const listItems = [];
  settings.forEach((item, itemIndex) => {
    const unique = `${listIndex}-${itemIndex}`;
    const role = componentType === 'StatefulPicklist' ? 'treeitem' : undefined;
    let builtItem;
    if (item.isHeader) {
      builtItem = <XUIPicklistHeader key={unique}>{item.children}</XUIPicklistHeader>;
    } else if (item.isDivider) {
      builtItem = <XUIPicklistDivider key={unique} />;
    } else {
      builtItem = (
        <XUIPickitem key={unique} id={unique} ariaRole={role} {...item}>
          {item.value || itemLabels[itemIndex % itemLabels.length]}
        </XUIPickitem>
      );
    }
    listItems.push(builtItem);
  });
  return listItems;
};

const buildLists = (lists, componentType) => {
  const builtLists = [];
  lists.forEach((list, index) => {
    const listObj = { ...list };
    const listItems = buildItemsFromSettings(listObj.items, index, componentType);
    delete listObj.items;
    const secProps = {
      role: componentType !== 'StatefulPicklist' ? 'listbox' : 'tree',
    };
    if (componentType === 'NestedPicklist') {
      builtLists.push(
        <NestedPicklist key={index} secondaryProps={secProps} {...listObj}>
          {listItems}
        </NestedPicklist>,
      );
    } else {
      builtLists.push(
        <XUIPicklist key={index} secondaryProps={secProps} {...listObj}>
          {listItems}
        </XUIPicklist>,
      );
    }
  });
  return builtLists;
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
  const picklistSize = select('List size', ['medium', 'small', 'xsmall'], 'medium');
  const avatarSize = sizeShift(picklistSize, -1);
  const isMultiselect = boolean('isMultiselect', false);
  const showLeftElement = boolean('showLeftElement', false);
  const showRightElement = boolean('showRightElement', false);
  const showDivider = boolean('showDivider', false);
  const showHeader = boolean('showHeader', false);
  const showLongStrings = boolean('showLongStrings', false);
  const showPinned = boolean('showPinned', false);
  const shouldTruncate = boolean('shouldTruncate', false);
  const limitWidth = boolean('limit width?', false);

  const longStrings = {
    primaryElement: "James Magness is a guy who works at Xero, y'all",
    secondaryElement: 'One of many places we can stick yet more text',
    pinnedElement: showPinned && 'Administrator of exciting things',
  };
  const shortStrings = {
    primaryElement: 'James Magness',
    secondaryElement: '(hoopy frood)',
    pinnedElement: showPinned && '42',
  };

  return (
    <XUIPanel style={{ width: limitWidth && '400px' }}>
      <XUIPicklist
        defaultLayout={boolean('defaultLayout', true)}
        isHorizontal={boolean('isHorizontal', false)}
        secondaryProps={{ role: 'listbox' }}
        size={picklistSize}
        isMultiselect={isMultiselect}
        shouldTruncate={shouldTruncate}
      >
        <XUIPickitem
          key="1"
          id="1"
          isSelected={boolean('first item isSelected', false)}
          isDisabled={boolean('first item isDisabled', false)}
          isInvalid={boolean('first item isInvalid', false)}
          rightElement={showRightElement && <XUIIcon icon={arrow} />}
          leftElement={showLeftElement && <XUIAvatar value="Tim Redmond" size={avatarSize} />}
          pinnedElement={showPinned && '42'}
          {...logAllEvents}
        >
          Tim Redmond
        </XUIPickitem>
        <XUIPickitem
          key="2"
          id="2"
          rightElement={showRightElement && <XUIIcon icon={search} />}
          leftElement={showLeftElement && <XUIAvatar value="James Magness" size={avatarSize} />}
          {...(showLongStrings ? longStrings : shortStrings)}
          {...logAllEvents}
        />
        {showDivider && <XUIPicklistDivider className="custom-class" />}
        {showHeader && <XUIPicklistHeader id="testme">Design</XUIPicklistHeader>}
        <XUIPickitem
          key="3"
          id="3"
          rightElement={showRightElement && <XUIIcon icon={contact} />}
          leftElement={showLeftElement && <XUIAvatar value="Finn Clark" size={avatarSize} />}
          {...logAllEvents}
        >
          Finn Clark
        </XUIPickitem>
      </XUIPicklist>
    </XUIPanel>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  const {
    storyTitle,
    lists,
    componentType,
    isOpen,
    panelSize,
    ...variationMinusStoryDetails
  } = variation;

  storiesWithVariations.add(storyTitle, () => {
    let listComponents = buildLists(lists, componentType);

    if (componentType === 'StatefulPicklist') {
      listComponents = (
        <StatefulPicklist {...variationMinusStoryDetails}>{listComponents}</StatefulPicklist>
      );
    } else if (componentType === 'NestedPicklist') {
      listComponents = (
        <XUIPicklist {...variationMinusStoryDetails}>
          <NestedPicklistContainer id="nested" isOpen={isOpen}>
            <NestedPicklistTrigger id="nestedTrigger">Nested list</NestedPicklistTrigger>
            {listComponents[0]}
          </NestedPicklistContainer>
          <NestedPicklistContainer id="split" isOpen={isOpen}>
            <XUIPickitem
              id="splitTrigger"
              isSplit
              isMultiselect={listComponents[1].props.isMultiselect}
            >
              Split nested list
            </XUIPickitem>
            <NestedPicklistTrigger id="nestedSplit" />
            {listComponents[1]}
          </NestedPicklistContainer>
        </XUIPicklist>
      );
    }
    const horizontalPanelStyles = { maxWidth: 'max-content', width: 'auto' };
    return (
      <div
        className="xui-panel"
        style={
          !panelSize && lists[0].isHorizontal
            ? horizontalPanelStyles
            : { maxWidth: panelSize || '500px' }
        }
      >
        {listComponents}
      </div>
    );
  });
});
