// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

// Components we need to test with
import XUIModal, { XUIModalBody } from '../../../modal';
import XUIDropdown, { XUIDropdownToggled } from '../../../dropdown';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUIButton from '../../../button';
import XUITextInput from '../../../textinput';

import * as lists from '../../../components/helpers/list';
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
    <XUIPickitem id={text} isSelected={false} key={id}>
      {text}
    </XUIPickitem>
  ));
  return (
    <XUIDropdown>
      <XUIPicklist>{pickItems}</XUIPicklist>
    </XUIDropdown>
  );
};

const buildTrigger = text => <XUIButton hasCaret>{text}</XUIButton>;

test.add(storyNames.multiDropdowns, () => (
  <div className="xui-u-flex">
    <XUITextInput fieldClassName="xui-margin-small" isLabelHidden label="Input label" />
    <XUIModal closeButtonLabel="Close" isOpen>
      <XUIModalBody>
        This is some Modal content.
        <XUITextInput isLabelHidden label="Input label" />
        <XUIDropdownToggled
          dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
          isHidden={false}
          trigger={buildTrigger('Short Trigger')}
        />
        This is some Modal content.
        <XUITextInput isLabelHidden label="Input label" />
        <XUIDropdownToggled
          dropdown={buildDropdownPicklist(lists.MedListMedItems)}
          trigger={buildTrigger('Medium Dropdown Trigger')}
        />
        <XUITextInput isLabelHidden label="Input label" />
      </XUIModalBody>
    </XUIModal>
    <XUITextInput fieldClassName="xui-margin-vertical-small" isLabelHidden label="Input label" />
  </div>
));
