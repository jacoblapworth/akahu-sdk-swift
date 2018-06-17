// Libs
import React from 'react';

// Components we need to test with
import DropDown, { DropDownToggled } from '../../dropdown';
import Picklist, { Pickitem } from '../../picklist';
import XUIButton, { XUIButtonCaret } from '../../button';
import XUIInput from '../../input';
import XUICheckbox, { XUICheckboxGroup } from '../../checkbox';
import XUIRadio, { XUIRadioGroup } from '../../radio';
import XUISwitch from '../../switch';
import XUITextArea from '../../textarea';
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
						<InputLabel>An input</InputLabel>
						<XUIInput />
					</XUIColumn>
					<XUIColumn gridColumns="half">
						<InputLabel>Another input</InputLabel>
						<XUIInput
							isFieldLayout
							hintMessage="I'm second"/>
					</XUIColumn>

					{/* Major section */}
					<XUIColumn gridColumns="half">
						<InputLabel>A set of checkboxes</InputLabel>
						<XUICheckbox isChecked={false}>Unchecked</XUICheckbox>
						<XUICheckbox isChecked>Checked</XUICheckbox>
						<XUICheckbox isIndeterminate>Indeterminate</XUICheckbox>
					</XUIColumn>
					<XUIColumn gridColumns="half">
						<InputLabel>A set of radios</InputLabel>
						<XUIRadio isChecked={false}>Unchecked</XUIRadio>
						<XUIRadio isChecked>Checked</XUIRadio>
						<XUIRadio isDisabled isChecked={false}>Unchecked</XUIRadio>
						<XUIRadio isDisabled isChecked>Checked</XUIRadio>
					</XUIColumn>

					{/* Major section */}
					<XUIColumn gridColumns="half">

						<InputLabel>Grouped checkboxes</InputLabel>
						<XUICheckboxGroup>
							<XUICheckbox>Tūī</XUICheckbox>
							<XUICheckbox>Pīwakawaka</XUICheckbox>
							<XUICheckbox>Ruru</XUICheckbox>
							<XUICheckbox isDisabled>Moa</XUICheckbox>
						</XUICheckboxGroup>

					</XUIColumn>
					<XUIColumn gridColumns="half">

						<InputLabel>Grouped radios</InputLabel>
						<XUIRadioGroup groupLabel="cities">
							<XUIRadio name="radioGroup">Wellington</XUIRadio>
							<XUIRadio name="radioGroup">Canberra</XUIRadio>
							<XUIRadio name="radioGroup">Washington D.C</XUIRadio>
							<XUIRadio name="radioGroup" isDisabled >Carthage</XUIRadio>
						</XUIRadioGroup>

					</XUIColumn>

					{/* Major section */}
					<XUIColumn gridColumns="full" className="xui-padding-vertical">
						<InputLabel>A switch</InputLabel>
						<XUISwitch onChange={NOOP} />
					</XUIColumn>

					{/* Major section */}
					<XUIColumn gridColumns="full">
						<InputLabel>A textarea</InputLabel>
						<XUITextArea
							minRows={2}
							maxRows={5}
							defaultLayout={false}
							textareaId="textarea-auto-resize">
						</XUITextArea>
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
