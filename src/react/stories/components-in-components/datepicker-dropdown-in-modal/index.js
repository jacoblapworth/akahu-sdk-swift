// Libs
import React from 'react';

// Components we need to test with
import XUIModal, { XUIModalBody } from '../../../modal';
import DropDown, { DropDownToggled } from '../../../dropdown';
import XUIDatePicker from '../../../datepicker';
import XUIButton, { XUIButtonCaret } from '../../../button';

import NOOP from '../../../components/helpers/noop';
import { storyNames, compositionKind } from '../tests';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

const displayMonth = new Date('Oct 02 2017 00:00:00 GMT+1300');

const test = storiesOf(compositionKind, module);
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// test.addDecorator(addReadme);
// test.addParameters({
// 	readme: {
// 		sidebar: readme
// 	}
// });

test.add(storyNames.dateDDInModal, () => {
  const trigger = (
    <XUIButton>
      Datepicker Button
      <XUIButtonCaret />
    </XUIButton>
  );
  const dropdown = (
    <DropDown>
      <XUIDatePicker onSelectDate={NOOP} displayedMonth={displayMonth} />
    </DropDown>
  );

  return (
    <XUIModal isOpen>
      <XUIModalBody>
        This is some Datepicker Modal content.
        <DropDownToggled
          isLegacyDisplay={false}
          trigger={trigger}
          dropdown={dropdown}
          isHidden={false}
          restrictToViewPort={false}
        />
      </XUIModalBody>
    </XUIModal>
  );
});
