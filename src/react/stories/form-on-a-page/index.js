// Libs
import React from 'react';

// Components we need to test with
import DropDown, { DropDownToggled } from '../../dropdown';
import Picklist, { Pickitem } from '../../picklist';
import XUIButton, { XUIButtonCaret } from '../../button';
import XUICheckbox, { XUICheckboxGroup } from '../../checkbox';
import XUIRadio, { XUIRadioGroup } from '../../radio';
import XUISwitch from '../../switch';
import SelectBox, { SelectBoxOption } from '../../select-box';
import { XUIRow, XUIColumn } from '../../structural';

// Private modules
import Form from '../helpers/form';
import InputLabel from '../helpers/inputlabel';

const NOOP = () => {};

import { storyNames, compositionKind } from '../tests';

// Story book things
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';
import XUITextInput from '../../textinput';

const test = storiesOf(compositionKind, module);
test.addDecorator(withReadme(readme));

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
	'Zucchini'].map((text, id) => (
		<Pickitem
			key={id}
			id={text}
			isSelected={false}>
			{text}
		</Pickitem>
	)
);

test.add(storyNames.formOnAPage, () => {

	const trigger = (
		<XUIButton>
			Trigger Button
			<XUIButtonCaret />
		</XUIButton>
	);
	const dropdown = (
		<DropDown>
			<Picklist>
				{toggledItems}
			</Picklist>
		</DropDown>
	);

	return (
		<div className="xui-panel xui-page-width-standard xui-margin-vertical-xlarge xui-padding-horizontal">
			<Form stacked className="xui-padding-vertical">

				<XUIRow variant="grid">

					{/* Major section */}
					<XUIColumn gridColumns="half">
						<XUITextInput
							labelText="An input"
						/>
					</XUIColumn>
					<XUIColumn gridColumns="half">
						<XUITextInput
							isFieldLayout
							hintMessage="I'm second"
							labelText="Another input"
						/>
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
						<XUIRadio isDisabled isDefaultChecked={false}>Unchecked</XUIRadio>
						<XUIRadio isDisabled isDefaultChecked>Checked</XUIRadio>
					</XUIColumn>

					{/* Major section */}
					<XUIColumn gridColumns="half">

						<XUICheckboxGroup groupLabel="Grouped checkboxes">
							<XUICheckbox>Tūī</XUICheckbox>
							<XUICheckbox>Pīwakawaka</XUICheckbox>
							<XUICheckbox>Ruru</XUICheckbox>
							<XUICheckbox isDisabled>Moa</XUICheckbox>
						</XUICheckboxGroup>

					</XUIColumn>
					<XUIColumn gridColumns="half">

						<XUIRadioGroup groupLabel="Grouped radios">
							<XUIRadio name="radioGroup">Wellington</XUIRadio>
							<XUIRadio name="radioGroup">Canberra</XUIRadio>
							<XUIRadio name="radioGroup">Washington D.C</XUIRadio>
							<XUIRadio name="radioGroup" isDisabled >Carthage</XUIRadio>
						</XUIRadioGroup>

					</XUIColumn>

					{/* Major section */}
					<XUIColumn gridColumns="full" className="xui-padding-vertical">
						<XUISwitch onChange={NOOP} isReversed >A switch</XUISwitch>
					</XUIColumn>

					{/* Major section */}
					<XUIColumn gridColumns="full">
						<XUITextInput
							labelText="A textarea"
							isMultiline
							minRows={2}
							maxRows={5}
							textareaId="textarea-auto-resize"
						/>
					</XUIColumn>

					{/* Major section */}
					<XUIColumn gridColumns="full" className="xui-padding-vertical">
						<XUIColumn gridColumns="half">
							<InputLabel>A dropdown button</InputLabel>
							<DropDownToggled
								trigger={trigger}
								dropdown={dropdown}
							/>
						</XUIColumn>
						<XUIColumn gridColumns="half">
							<InputLabel>A simple select box</InputLabel>
							<SelectBox
								name="selectOne"
								buttonContent="Hello world"
								isTextTruncated={false}
							>
								<SelectBoxOption
									id="1"
									key={1}
								>
									It&apos;s a wonderful day
								</SelectBoxOption>
								<SelectBoxOption
									id="2"
									key={2}
								>
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
