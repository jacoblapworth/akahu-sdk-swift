// Libs
import React from 'react';

// Components we need to test with
import XUIModal, { XUIModalBody } from '../../../modal';
import DropDown, { DropDownToggled } from '../../../dropdown';
import Picklist, { Pickitem } from '../../../picklist';
import XUIButton, { XUIButtonCaret } from '../../../button';
import XUITextInput from '../../../textinput';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

import lists from '../../../components/helpers/list';
import { storyNames, compositionKind } from '../tests';

const test = storiesOf(compositionKind, module);
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// test.addDecorator(addReadme);
// test.addParameters({
// 	readme: {
// 		sidebar: readme
// 	}
// });

const buildDropdownPicklist = items => {
  const pickItems = items.map((text, id) => (
    <Pickitem id={text} isSelected={false} key={id}>
      {text}
    </Pickitem>
  ));
  return (
    <DropDown>
      <Picklist>{pickItems}</Picklist>
    </DropDown>
  );
};

const buildTrigger = text => (
  <XUIButton>
    {text}
    <XUIButtonCaret />
  </XUIButton>
);

test.add(storyNames.multiDropDowns, () => (
  <div className="xui-u-flex">
    <XUITextInput fieldClassName="xui-margin-small" isLabelHidden label="Input label" />
    <XUIModal closeButtonLabel="Close" isOpen>
      <XUIModalBody>
        This is some Modal content.
        <XUITextInput isLabelHidden label="Input label" />
        <DropDownToggled
          dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
          isHidden={false}
          trigger={buildTrigger('Short Trigger')}
        />
        This is some Modal content.
        <XUITextInput isLabelHidden label="Input label" />
        <DropDownToggled
          dropdown={buildDropdownPicklist(lists.MedListMedItems)}
          trigger={buildTrigger('Medium Dropdown Trigger')}
        />
        <XUITextInput isLabelHidden label="Input label" />
      </XUIModalBody>
    </XUIModal>
    <XUITextInput fieldClassName="xui-margin-vertical-small" isLabelHidden label="Input label" />
  </div>
));
