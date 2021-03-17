// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';

// Components we need to test with
import XUIModal, { XUIModalBody } from '../../../modal';
import XUIDropdown, { XUIDropdownToggled } from '../../../dropdown';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUIButton from '../../../button';

import { storyNames, compositionKind } from '../tests';

const test = storiesOf(compositionKind, module);

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
  <XUIPickitem id={text} isSelected={false} key={id}>
    {text}
  </XUIPickitem>
));

test.add(storyNames.dropDownInModal, () => {
  const trigger = <XUIButton hasCaret>Trigger Button</XUIButton>;
  const dropdown = (
    <XUIDropdown>
      <XUIPicklist>{toggledItems}</XUIPicklist>
    </XUIDropdown>
  );

  return (
    <XUIModal closeButtonLabel="Close" isOpen>
      <XUIModalBody>
        This is some Modal content.
        <XUIDropdownToggled dropdown={dropdown} trigger={trigger} />
      </XUIModalBody>
    </XUIModal>
  );
});
