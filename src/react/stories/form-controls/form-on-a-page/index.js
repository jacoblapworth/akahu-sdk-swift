// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';

// Components we need to test with
import XUIDropdown, { XUIDropdownToggled } from '../../../dropdown';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUIButton from '../../../button';
import XUICheckbox, { XUICheckboxGroup } from '../../../checkbox';
import XUIControlGroup from '../../../components/controlgroup/XUIControlGroup';
import XUIRadio, { XUIRadioGroup } from '../../../radio';
import XUISwitch from '../../../switch';
import XUISelectBox, { XUISelectBoxOption } from '../../../selectbox';
import { XUIRow, XUIColumn } from '../../../structural';
import FullPageStoryWrapper from '../../helpers/FullPageStoryWrapper';

// Private modules
import Form from '../helpers/form';
import InputLabel from '../helpers/inputlabel';

import { storyNames, compositionKind } from '../tests';

import XUITextInput from '../../../textinput';

const NOOP = () => {};

const formOnAPageStories = storiesOf(`${compositionKind}/${storyNames.formOnAPage}`, module);
const formOnAPageCustomFontStories = storiesOf(
  `${compositionKind}/${storyNames.formOnAPageUseCustomFontSize}`,
  module,
);

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
  <XUIPickitem id={text} isSelected={false} key={id}>
    {text}
  </XUIPickitem>
));

const testFormOnAPage = () => {
  const trigger = <XUIButton hasCaret>Trigger Button</XUIButton>;
  const dropdown = (
    <XUIDropdown>
      <XUIPicklist>{toggledItems}</XUIPicklist>
    </XUIDropdown>
  );

  return (
    <FullPageStoryWrapper>
      <div className="capture xui-panel xui-page-width-standard xui-margin-vertical-xlarge xui-padding-horizontal">
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
              <XUIControlGroup isLockedVertical label="A set of checkboxes">
                <XUICheckbox isDefaultChecked={false}>Unchecked</XUICheckbox>
                <XUICheckbox isDefaultChecked>Checked</XUICheckbox>
                <XUICheckbox isIndeterminate>Indeterminate</XUICheckbox>
              </XUIControlGroup>
            </XUIColumn>
            <XUIColumn gridColumns="half">
              <XUIControlGroup isLockedVertical label="A set of radios">
                <XUIRadio isDefaultChecked={false}>Unchecked</XUIRadio>
                <XUIRadio isDefaultChecked>Checked</XUIRadio>
                <XUIRadio isDefaultChecked={false} isDisabled>
                  Unchecked
                </XUIRadio>
                <XUIRadio isDefaultChecked isDisabled>
                  Checked
                </XUIRadio>
              </XUIControlGroup>
            </XUIColumn>
            {/* Major section */}
            <XUIColumn gridColumns="half">
              <XUICheckboxGroup isLockedVertical label="Grouped checkboxes">
                <XUICheckbox>Tūī</XUICheckbox>
                <XUICheckbox>Pīwakawaka</XUICheckbox>
                <XUICheckbox>Ruru</XUICheckbox>
                <XUICheckbox isDisabled>Moa</XUICheckbox>
              </XUICheckboxGroup>
            </XUIColumn>
            <XUIColumn gridColumns="half">
              <XUIRadioGroup isLockedVertical label="Grouped radios">
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
              <XUITextInput isMultiline label="A textarea" maxRows={5} minRows={2} />
            </XUIColumn>

            {/* Major section */}
            <XUIColumn className="xui-padding-vertical" gridColumns="full">
              <XUIColumn gridColumns="half">
                <InputLabel>A dropdown button</InputLabel>
                <XUIDropdownToggled dropdown={dropdown} trigger={trigger} />
              </XUIColumn>
              <XUIColumn gridColumns="half">
                <XUISelectBox
                  buttonContent="Hello world"
                  caretTitle="Toggle list"
                  isFieldLayout
                  isTextTruncated={false}
                  label="A simple select box"
                  name="selectOne"
                >
                  <XUISelectBoxOption id="1" key={1} value="1">
                    It&apos;s a wonderful day
                  </XUISelectBoxOption>
                  <XUISelectBoxOption id="2" key={2} value="2">
                    Today Yo!
                  </XUISelectBoxOption>
                </XUISelectBox>
              </XUIColumn>
            </XUIColumn>
          </XUIRow>
        </Form>
      </div>
    </FullPageStoryWrapper>
  );
};

// These are separate stories as otherwise a second instance of the same element won't render properly for vis-regs.
// Can be changed once there is a difference between them.
formOnAPageStories.add(storyNames.formOnAPage, testFormOnAPage);
formOnAPageCustomFontStories.add(storyNames.formOnAPageUseCustomFontSize, testFormOnAPage);
