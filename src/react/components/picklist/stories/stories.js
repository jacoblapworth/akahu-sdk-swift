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
import XUIButton from '../../../button';
import XUIIcon from '../../icon/XUIIcon';
import XUIPanel from '../../panel/XUIPanel';
import arrow from '@xero/xui-icon/icons/arrow';
import search from '@xero/xui-icon/icons/search';
import contact from '@xero/xui-icon/icons/contact';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { storiesWithVariationsKindName, variations } from './variations';
import { userBreakpoints } from '../../helpers/breakpoints';

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
        <XUIPickitem ariaRole={role} id={unique} key={unique} {...item}>
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
  const avatarSize = sizeShift('medium', -1);
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
        isMultiselect={isMultiselect}
        secondaryProps={{ role: 'listbox' }}
        shouldTruncate={shouldTruncate}
        swapAtBreakpoint={select('swapAtBreakpoint', [null, ...Object.keys(userBreakpoints)])}
      >
        <XUIPickitem
          id="1"
          isDisabled={boolean('first item isDisabled', false)}
          isInvalid={boolean('first item isInvalid', false)}
          isSelected={boolean('first item isSelected', false)}
          key="1"
          leftElement={showLeftElement && <XUIAvatar size={avatarSize} value="Tim Redmond" />}
          pinnedElement={showPinned && '42'}
          rightElement={showRightElement && <XUIIcon icon={arrow} />}
          {...logAllEvents}
        >
          Tim Redmond
        </XUIPickitem>
        <XUIPickitem
          id="2"
          key="2"
          leftElement={showLeftElement && <XUIAvatar size={avatarSize} value="James Magness" />}
          rightElement={showRightElement && <XUIIcon icon={search} />}
          {...(showLongStrings ? longStrings : shortStrings)}
          {...logAllEvents}
        />
        {showDivider && <XUIPicklistDivider className="custom-class" />}
        {showHeader && <XUIPicklistHeader id="testme">Design</XUIPicklistHeader>}
        <XUIPickitem
          id="3"
          key="3"
          leftElement={showLeftElement && <XUIAvatar size={avatarSize} value="Finn Clark" />}
          rightElement={showRightElement && <XUIIcon icon={contact} />}
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
    isDefaultOpen,
    isOpen,
    panelSize,
    ...variationMinusStoryDetails
  } = variation;

  function ControlledNestedPicklist(props) {
    const [picklistOpen, setPicklistOpen] = React.useState(isOpen);
    return (
      <div>
        <XUIButton
          onClick={() => {
            setPicklistOpen(!picklistOpen);
          }}
        >
          Toggle picklist
        </XUIButton>
        <XUIPicklist {...variationMinusStoryDetails}>
          <NestedPicklistContainer id="nested" isOpen={picklistOpen}>
            <NestedPicklistTrigger ariaLabel="Toggle submenu" id="nestedTrigger">
              Nested list
            </NestedPicklistTrigger>
            {props.listComponents[0]}
          </NestedPicklistContainer>
        </XUIPicklist>
      </div>
    );
  }

  const UncontrolledNestedPicklist = props => (
    <XUIPicklist {...variationMinusStoryDetails}>
      <NestedPicklistContainer id="nested" isDefaultOpen={isDefaultOpen}>
        <NestedPicklistTrigger ariaLabel="Toggle submenu" id="nestedTrigger">
          Nested list
        </NestedPicklistTrigger>
        {props.listComponents[0]}
      </NestedPicklistContainer>
      <NestedPicklistContainer id="split" isDefaultOpen={isDefaultOpen}>
        <XUIPickitem
          id="splitTrigger"
          isMultiselect={props.listComponents[1].props.isMultiselect}
          isSplit
        >
          Split nested list
        </XUIPickitem>
        <NestedPicklistTrigger ariaLabel="Toggle submenu" id="nestedSplit" />
        {props.listComponents[1]}
      </NestedPicklistContainer>
    </XUIPicklist>
  );

  storiesWithVariations.add(storyTitle, () => {
    let listComponents = buildLists(lists, componentType);

    if (componentType === 'StatefulPicklist') {
      listComponents = (
        <StatefulPicklist {...variationMinusStoryDetails}>{listComponents}</StatefulPicklist>
      );
    } else if (componentType === 'NestedPicklist') {
      listComponents =
        isOpen !== undefined ? (
          <ControlledNestedPicklist listComponents={listComponents} />
        ) : (
          <UncontrolledNestedPicklist listComponents={listComponents} />
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
