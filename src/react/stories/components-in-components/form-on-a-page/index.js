// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

// Components we need to test with
import DropDown, { DropDownToggled } from '../../../dropdown';
import Picklist, { Pickitem } from '../../../picklist';
import XUIButton, { XUIButtonCaret } from '../../../button';
import XUICheckbox, { XUICheckboxGroup } from '../../../checkbox';
import XUIRadio, { XUIRadioGroup } from '../../../radio';
import XUISwitch from '../../../switch';
import SelectBox, { SelectBoxOption } from '../../../select-box';
import { XUIRow, XUIColumn } from '../../../structural';

// Private modules
import Form from '../helpers/form';
import InputLabel from '../helpers/inputlabel';

import { storyNames, compositionKind } from '../tests';

import XUITextInput from '../../../textinput';

const NOOP = () => {};

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
  'Rapberry',
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

test.add(storyNames.formOnAPage, () => {
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
    <div className="xui-panel xui-page-width-standard xui-margin-vertical-xlarge xui-padding-horizontal">
      <Form className="xui-padding-vertical" stacked>
        <XUIRow variant="grid">
          {/* Major section */}
          <XUIColumn gridColumns="half">
            <XUITextInput label="An input" />
          </XUIColumn>
          <XUIColumn gridColumns="half">
            <XUITextInput hintMessage="I'm second" isFieldLayout label="Another input" />
          </XUIColumn>

          {/* Major section */}
          <XUIColumn gridColumns="half">
            <InputLabel>A set of checkboxes</InputLabel>
            <XUICheckbox isDefaultChecked={false}>Unchecked</XUICheckbox>
            <XUICheckbox isDefaultChecked>Checked</XUICheckbox>
            <XUICheckbox isIndeterminate>Indeterminate</XUICheckbox>
          </XUIColumn>
          <XUIColumn gridColumns="half">
            <InputLabel>A set of radios</InputLabel>
            <XUIRadio isDefaultChecked={false}>Unchecked</XUIRadio>
            <XUIRadio isDefaultChecked>Checked</XUIRadio>
            <XUIRadio isDefaultChecked={false} isDisabled>
              Unchecked
            </XUIRadio>
            <XUIRadio isDefaultChecked isDisabled>
              Checked
            </XUIRadio>
          </XUIColumn>

          {/* Major section */}
          <XUIColumn gridColumns="half">
            <XUICheckboxGroup label="Grouped checkboxes">
              <XUICheckbox>Tūī</XUICheckbox>
              <XUICheckbox>Pīwakawaka</XUICheckbox>
              <XUICheckbox>Ruru</XUICheckbox>
              <XUICheckbox isDisabled>Moa</XUICheckbox>
            </XUICheckboxGroup>
          </XUIColumn>
          <XUIColumn gridColumns="half">
            <XUIRadioGroup label="Grouped radios">
              <XUIRadio name="radioGroup">Wellington</XUIRadio>
              <XUIRadio name="radioGroup">Canberra</XUIRadio>
              <XUIRadio name="radioGroup">Washington D.C</XUIRadio>
              <XUIRadio isDisabled name="radioGroup">
                Carthage
              </XUIRadio>
            </XUIRadioGroup>
          </XUIColumn>

          {/* Major section */}
          <XUIColumn className="xui-padding-vertical" gridColumns="full">
            <div>
              <InputLabel>A set of checkboxes</InputLabel>
            </div>
            <XUICheckbox isDefaultChecked={false}>Unchecked</XUICheckbox>
            <XUICheckbox isDefaultChecked>Checked</XUICheckbox>
            <XUICheckbox isIndeterminate>Indeterminate</XUICheckbox>
          </XUIColumn>

          {/* Major section */}
          <XUIColumn className="xui-padding-vertical" gridColumns="full">
            <div>
              <InputLabel>A set of radios</InputLabel>
            </div>
            <XUIRadio isDefaultChecked={false}>Unchecked</XUIRadio>
            <XUIRadio isDefaultChecked>Checked</XUIRadio>
            <XUIRadio isDefaultChecked={false} isDisabled>
              Unchecked
            </XUIRadio>
            <XUIRadio isDefaultChecked isDisabled>
              Checked
            </XUIRadio>
          </XUIColumn>

          {/* Major section */}
          <XUIColumn className="xui-padding-vertical" gridColumns="full">
            <XUISwitch isReversed onChange={NOOP}>
              A switch
            </XUISwitch>
          </XUIColumn>

          {/* Major section */}
          <XUIColumn gridColumns="full">
            <XUITextInput
              isMultiline
              label="A textarea"
              maxRows={5}
              minRows={2}
              textareaId="textarea-auto-resize"
            />
          </XUIColumn>

          {/* Major section */}
          <XUIColumn className="xui-padding-vertical" gridColumns="full">
            <XUIColumn gridColumns="half">
              <InputLabel>A dropdown button</InputLabel>
              <DropDownToggled dropdown={dropdown} trigger={trigger} />
            </XUIColumn>
            <XUIColumn gridColumns="half">
              <SelectBox
                buttonContent="Hello world"
                caretTitle="Toggle list"
                isFieldLayout
                isTextTruncated={false}
                label="A simple select box"
                name="selectOne"
              >
                <SelectBoxOption id="1" key={1} value="1">
                  It&apos;s a wonderful day
                </SelectBoxOption>
                <SelectBoxOption id="2" key={2} value="2">
                  Today Yo!
                </SelectBoxOption>
              </SelectBox>
            </XUIColumn>
          </XUIColumn>
        </XUIRow>
      </Form>
    </div>
  );
});
