// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

// Components we need to test with
import XUIModal, { XUIModalBody } from '../../../modal';
import DropDown, { DropDownToggled } from '../../../dropdown';
import Picklist, { Pickitem } from '../../../picklist';
import XUIButton, { XUIButtonCaret } from '../../../button';

import { storyNames, compositionKind } from '../tests';

const test = storiesOf(compositionKind, module);
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// test.addDecorator(addReadme);
// test.addParameters({
// 	readme: {
// 		sidebar: readme
// 	}
// });

const toggledItems = [
  'Apricot',
  'Banana',
  'Cherry',
  'Dragon Fruit',
  'Eggplant',
  'Fennel',
  'Grapefruit',
  'Honeydew',
  'Iceberg Lettuce',
  'Jackfruit',
  'Kiwifruit',
  'Lime',
  'Mango',
  'Nectarine',
  'Orange',
  'Pineapple',
  'Quince',
  'Raspberry',
  'Starfruit',
  'Tomato',
  'Uglifruit',
  'Valencia Orange',
  'Watermelon',
  'Xi gua',
  'Yellow quash',
  'Zucchini',
].map((text, id) => (
  <Pickitem id={text} isSelected={false} key={id}>
    {text}
  </Pickitem>
));

test.add(storyNames.dropDownInModal, () => {
  const trigger = (
    <XUIButton>
      Trigger Button
      <XUIButtonCaret />
    </XUIButton>
  );
  const dropdown = (
    <DropDown>
      <Picklist>{toggledItems}</Picklist>
    </DropDown>
  );

  return (
    <XUIModal closeButtonLabel="Close" isOpen>
      <XUIModalBody>
        This is some Modal content.
        <DropDownToggled dropdown={dropdown} trigger={trigger} />
      </XUIModalBody>
    </XUIModal>
  );
});
