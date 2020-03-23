import React from 'react';

import {
  XUIEditableTableCellReadOnly,
  XUIEditableTableCellSecondarySearch,
  XUIEditableTableCellSelectBox,
  XUIEditableTableCellTextInput,
} from '../../../editabletable';
import XUIButton from '../../button/XUIButton';
import SelectBoxOption from '../../select-box/SelectBoxOption';
import Picklist, { Pickitem } from '../../../picklist';

const sampleReadOnly = (id, width, text) => (
  <XUIEditableTableCellReadOnly cellProps={{ width }} id={id} key={id}>
    {text}
  </XUIEditableTableCellReadOnly>
);

const sampleTextInput = (id, width, text) => (
  <XUIEditableTableCellTextInput cellProps={{ width }} defaultValue={text} id={id} key={id} />
);

const sampleSecondary = (id, width, text) => (
  <XUIEditableTableCellSecondarySearch
    cellProps={{ width }}
    id={id}
    key={id}
    onSearch={() => console.log('heya')}
    trigger={<XUIButton>{text}</XUIButton>}
  >
    <Picklist>
      <Pickitem id="pi1" primaryElement="Item content" />
      <Pickitem id="pi2" primaryElement="Item two" />
    </Picklist>
  </XUIEditableTableCellSecondarySearch>
);

const sampleSelect = (id, width, text) => (
  <XUIEditableTableCellSelectBox
    buttonContent={text}
    cellProps={{ width }}
    id={id}
    key={id}
    label={text}
  >
    <SelectBoxOption id={`${id}_a`} key="a" value="Apple">
      Apple
    </SelectBoxOption>
    <SelectBoxOption id={`${id}_b`} key="b" value="Banana">
      Banana
    </SelectBoxOption>
    <SelectBoxOption id={`${id}_c`} key="c" value="Cucumber">
      Cucumber
    </SelectBoxOption>
  </XUIEditableTableCellSelectBox>
);

const samples = [sampleReadOnly, sampleTextInput, sampleSecondary, sampleSelect];
const texts = [
  'Sample text',
  '.',
  'User organisation settings',
  // 'https://docs.google.com/document/d/1IrcerSo_0gmzzlcugsH4tBqsrlDaNXUuub_YubQ9M3Y/edit',
  'Your name here',
  'Antidisestablishmentarianism',
  'X e r o',
];
const widths = ['auto', '10px', '50px', '100px', '250px'];

export { samples, texts, widths };
