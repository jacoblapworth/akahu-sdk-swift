// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import DropDown, { DropDownToggled } from '../../dropdown';
import Picklist, { Pickitem } from '../../picklist';
import XUIButton, { XUIButtonCaret } from '../../button';
import XUITextInput from '../../textinput';
import XUICheckbox, { XUICheckboxGroup } from '../../checkbox';
import XUIRadio, { XUIRadioGroup } from '../../radio';
import XUISwitch from '../../switch';
import XUIToggle, { XUIToggleOption } from '../../toggle';
import XUIAutocompleter, { XUIAutocompleterEmptyState } from '../../autocompleter';
import people from '../../components/autocompleter/private/people';
import XUIAvatar from '../../avatar';
import { decorateSubStr, boldMatch } from '../../components/autocompleter/helpers/highlighting';
import XUIPill from '../../pill';
import XUITag from '../../tag';
import XUIIcon from '../../icon';
import arrow from '@xero/xui-icon/icons/arrow';

// Private modules
import Form from '../helpers/form';
import InputLabel from '../helpers/inputlabel';
import InputGroup from '../helpers/inputgroup';
import LayoutSelect from './select-box';
import PanelSection from './panel-section';

const NOOP = () => {};

import { storyNames, compositionKind } from '../tests';

// Story book things
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

const test = storiesOf(compositionKind, module);
test.addDecorator(withReadme(readme));

const inputMap = {
	ah: 'account-holder',
	ird: 'ird-number',
	bank: 'bank-account',
	bankChoice: 'select-one-bank',
	nameFirst: 'name-first',
	nameMiddle: 'name-middle',
	nameLast: 'name-last',
	foodType: 'food-type',
	foodName: 'food-name',
	autoResize: 'auto-resize',
	whatCity: 'what-city',
	whatColour: 'what-colour',
	whatColour2: 'what-colour2',
	people: 'chosen-people',
	whatBird: 'what-bird',
	thingOn: 'thing-on'
};

const filterPeople = (data, value, peopleToExclude) => {
	return data.filter(node => {
		const val = value.toLowerCase();

		//You could use String.includes here, however you would need to add the polyfill for IE11 support.
		return !peopleToExclude.find(person => person.id === node.id) && (node.name.toLowerCase().indexOf(val) > -1
		|| node.email.toLowerCase().indexOf(val) > -1
		|| node.subtext.toLowerCase().indexOf(val) > -1);
	});
};

test.add(storyNames.formLayout, () => {

	class Page extends React.PureComponent {

		constructor() {
			super();

			this.state = {
				selectedPeople: [],
				value: '',
				people: [],
				foodType: '',
			};

			this.logForm = this.logForm.bind(this);

			// Autocompleter
			this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
			this.closeAutoCompleter = this.closeAutoCompleter.bind(this);
			this.selectPerson = this.selectPerson.bind(this);
			this.deletePerson = this.deletePerson.bind(this);
			this.getItems = this.getItems.bind(this);
		}

		logForm() {
			const {selectedPeople: people, foodType} = this.state
			const data = Object.assign({}, this._form.getInputs(), {people, foodType});
			console.log(data); // eslint-disable-line
		}

		onSearchChangeHandler(value) {
			this._autocompleter.openDropDown();
			this.setState(prevState => ({
				value: value,
				people: filterPeople(people, value, prevState.selectedPeople)
			}));
		}

		selectPerson(person) {
			this.setState(prevState => {
				const selectedPeople = [...prevState.selectedPeople, person];
				return {
					value: '',
					selectedPeople,
					people: filterPeople(people, '', selectedPeople)
				}
			});
		}

		deletePerson(id) {
			this.setState(prevState => {
				const selectedPeople = [...prevState.selectedPeople].filter(person => person.id !== id);
				return {
					selectedPeople,
					people: filterPeople(people, prevState.value, selectedPeople)
				}
			});
		}

		closeAutoCompleter() {
			this.setState({value: ''});
		}

		getItems(){
			const {
				value,
				people
			} = this.state;

			if (!Array.isArray(people) || people.length <= 0){
				return <XUIAutocompleterEmptyState id="no_people">No People Found</XUIAutocompleterEmptyState>;
			}

			const items = people.map(item => (
				<Pickitem
					key={item.id}
					id={item.id}
					onSelect={() => this.selectPerson(item)}
				>
					<div className="xui-u-flex">
						<XUIAvatar value={item.name} imageUrl={item.avatar} />
						<div className="xui-u-grow xui-padding-left">
							<div className="xui-heading-item xui-text-truncated">
								{decorateSubStr(item.name, value || '', boldMatch)}
							</div>
							<div className="xui-text-secondary xui-text-truncated">
								{decorateSubStr(item.email, value || '', boldMatch)}, {decorateSubStr(item.subtext, value || '', boldMatch)}
							</div>
						</div>
					</div>
				</Pickitem>
			));

			return (
				<Picklist>{items}</Picklist>
			);
		}

		render () {

			const {
				value,
				selectedPeople,
				foodType,
			} = this.state;

			const {
				banks
			} = this.props;

			return (
				<div className="xui-panel xui-page-width-standard xui-margin-vertical-xlarge">

					<Form noLayout ref={c => this._form = c}>
						<header className="xui-panel--header xui-padding-horizontal-small xui-u-flex xui-u-flex-align-center">
							<div className="xui-panel--heading xui-margin-left-small">All major inputs in various formats</div>
						</header>

						<PanelSection formLayout headerContent="Inputs" className="xui-padding-vertical">
							<XUITextInput
								labelText="Account Holder"
								isFieldLayout
								name={inputMap.ah}
								id={inputMap.ah}
							/>

							<XUITextInput
								labelText="IRD Number"
								isFieldLayout
								hintMessage="Found on the top of your IR3 statement"
								inputProps={{
									name: inputMap.ird,
									id: inputMap.ird
								}}
							/>

							<XUITextInput
								labelText="Bank account number"
								defaultValue="A very invalid message"
								validationMessage="Well, it's not right is it"
								isInvalid
								isFieldLayout
								inputProps={{
									name: inputMap.bank,
									id: inputMap.bank
								}}
							/>

							<InputLabel>
								Your name
							</InputLabel>
							<InputGroup isFieldLayout>
								<XUITextInput
									labelText="First name"
									isLabelHidden
									inputProps={{name:inputMap.nameFirst, id: inputMap.nameFirst}}
								/>
								<XUITextInput
									labelText="Middle name"
									isLabelHidden
									inputProps={{name:inputMap.nameMiddle, id: inputMap.nameMiddle}}
								/>
								<XUITextInput
									labelText="Last name"
									isLabelHidden
									inputProps={{name:inputMap.nameLast, id: inputMap.nameLast}}
								/>
							</InputGroup>

							<InputLabel>
								Choose a Food
							</InputLabel>
							<div className="xui-textinputgroup xui-field-layout xui-u-flex">
								<DropDownToggled
									className="xui-textinputwrapper"
									onOpen={() => {}}
									trigger={(
										<XUIButton>
											{foodType || 'Food Type'}
											<XUIButtonCaret />
										</XUIButton>
									)}
									dropdown={(
										<DropDown onSelect={value => this.setState({...this.state, foodType: value})}>
											<Picklist>
												{['Vegetable', 'Fruit', 'Meat'].map((title, key) => (
													<Pickitem
														key={key}
														id={`${inputMap.foodType}-${title}`}
														value={title}
														isSelected={title === foodType}>
														{title}
													</Pickitem>
												))}
											</Picklist>
										</DropDown>
									)}
								/>
								<XUITextInput
									containerClassName="xui-u-flex-1"
									labelText="Input label"
									isLabelHidden
									inputProps={{
										name: inputMap.foodName,
										id: inputMap.foodName
									}}
								/>
							</div>

							<XUITextInput
								isMultiline
								minRows={2}
								maxRows={5}
								inputProps={{
									name: inputMap.autoResize,
									id: inputMap.autoResize
								}}
								isFieldLayout
								labelText="This textarea auto-resizes"
							/>

						</PanelSection>

						<PanelSection formLayout headerContent="Selects" className="xui-padding-vertical">

							<LayoutSelect
								label='Please select a bank' // Use this instead of <InputLabel /> (inconsistent)
								title="Choose a bank"
								name={inputMap.bankChoice}
								htmlFor={inputMap.bankChoice}
								id={inputMap.bankChoice}
								className="xui-field-layout" // doesn't do anything unless on outer div
								onSelect={NOOP}>
								{banks}
							</LayoutSelect>

							<InputLabel htmlFor={inputMap.people}>
								Add people
							</InputLabel>
							<XUIAutocompleter
								inputLabelText="input label"
								isInputLabelHidden
								className="xui-field-layout"
								ref={ac => this._autocompleter = ac}
								onSearch={this.onSearchChangeHandler}
								placeholder="Search"
								searchValue={value}
								dropdownFixedWidth
								onClose={this.closeAutoCompleter}
								name={inputMap.people}
								id={inputMap.people}
								pills={
									selectedPeople.map(person =>
										<XUIPill
											value={person.name}
											className="xui-autocompleter--pill"
											onDeleteClick={() => this.deletePerson(person.id)}
											key={person.id}
										/>
									)
								}
							>
								{this.getItems()}
							</XUIAutocompleter>

						</PanelSection>

						<PanelSection formLayout headerContent="Radios and Checkboxes" className="xui-padding-vertical">

							<XUIRadioGroup
								isFieldLayout
								labelText="Choose a city"
							>
								{
									[
										'Wellington',
										'Canberra',
										'Washington D.C',
										'Carthage'
									].map(
										label => (
											<XUIRadio
												id={`${inputMap.whatCity}-${label}`} // Had to add this to the component, it didn't exist before
												key={label}
												value={label}
												name={inputMap.whatCity}>
												{label}
											</XUIRadio>
										)
									)
								}
							</XUIRadioGroup>

							<XUICheckboxGroup
								isFieldLayout
								labelText="Favourite Birds"
							>
								{
									[
										'Tūī',
										'Pīwakawaka',
										'Ruru',
										'Moa'
									].map(
										label => (
											<XUICheckbox
												id={`${inputMap.whatBird}-${label}`} // Had to add this to the component, it didn't exist before
												key={label}
												value={label}
												name={`${inputMap.whatBird}-${label}`}>
												{label}
											</XUICheckbox>
										)
									)
								}
							</XUICheckboxGroup>

							<XUIToggle className="xui-field-layout" layout="fullwidth" labelText="Choose one colour">
								{
									[
										'Red',
										'Blue',
										'Green',
										'Yellow'
									].map(
										label => (
											<XUIToggleOption
												id={`${inputMap.whatColour}-${label}`} // Had to add this to the component, it didn't exist before
												key={label}
												name={inputMap.whatColour}
												value={label}
												type='radio'
												onChange={NOOP} // this shit was required
											>
												{label}
											</XUIToggleOption>
										)
									)
								}
							</XUIToggle>

							<XUIToggle className="xui-field-layout" layout="fullwidth" labelText="Choose many colours" secondaryProps={{role: 'group'}}>
								{
									[
										'Red',
										'Blue',
										'Green',
										'Yellow'
									].map(
										label => (
											<XUIToggleOption
												id={`${inputMap.whatColour2}-${label}`} // Had to add this to the component, it didn't exist before
												key={label}
												name={`${inputMap.whatColour2}-${label}`}
												value={label}
												type='checkbox'
												onChange={() => {}} // this shit was required
											>
												{label}
											</XUIToggleOption>
										)
									)
								}
							</XUIToggle>

						</PanelSection>

						<PanelSection formLayout headerContent="Switches" className="xui-padding-vertical">
							<XUISwitch onChange={NOOP} name={inputMap.thingOn} labelId={inputMap.thingOn} isReversed>
								Is the thing on
							</XUISwitch>
						</PanelSection>

						<footer className="xui-panel--footer xui-actions xui-actions-layout xui-padding-large">
							<p className="xui-margin-right">
								The results of the form are published as an object to the <XUITag>console</XUITag> when you click this button <XUIIcon icon={arrow} rotation="270" />
							</p>
							<XUIButton
								variant="primary"
								onClick={this.logForm}>
									Submit
							</XUIButton>
						</footer>

					</Form>
				</div>
			);
		}
	}
	Page.propTypes = {
		banks : PropTypes.array
	}

	return (
		<Page banks={[
			'',
			'ANZ',
			'ASB',
			'Kiwi Bank',
			'Westpac',
		]} />
	);
});
