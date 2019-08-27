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
    <Pickitem key={id} id={text} isSelected={false}>
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
    <XUITextInput fieldClassName="xui-margin-small" label="Input label" isLabelHidden />
    <XUIModal isOpen>
      <XUIModalBody>
        This is some Modal content.
        <XUITextInput label="Input label" isLabelHidden />
        <DropDownToggled
          trigger={buildTrigger('Short Trigger')}
          dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
          isHidden={false}
        />
        This is some Modal content.
        <XUITextInput label="Input label" isLabelHidden />
        <DropDownToggled
          trigger={buildTrigger('Medium Dropdown Trigger')}
          dropdown={buildDropdownPicklist(lists.MedListMedItems)}
        />
        <XUITextInput label="Input label" isLabelHidden />
      </XUIModalBody>
    </XUIModal>
    <XUITextInput fieldClassName="xui-margin-vertical-small" label="Input label" isLabelHidden />
  </div>
));
