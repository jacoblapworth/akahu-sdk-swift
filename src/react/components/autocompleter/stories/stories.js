// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import XUIAutocompleter from '../XUIAutocompleter';
import XUIAutocompleterEmptyState from '../XUIAutocompleterEmptyState';
import XUIAutocompleterSecondarySearch from '../XUIAutocompleterSecondarySearch';
import XUIButton from '../../button/XUIButton';
import XUIButtonCaret from '../../button/XUIButtonCaret';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import peopleDataSet from '../private/people';
import DropDownFooter from '../../dropdown/DropDownFooter';
import XUIIcon from '../../icon/XUIIcon';
import plusIcon from '@xero/xui-icon/icons/plus';
import XUIPill from '../../pill/XUIPill';
import XUIAvatar from '../../avatar/XUIAvatar';
import { decorateSubStr, boldMatch } from '../helpers/highlighting';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName, dropdownSizes } from './variations';

const filterPeople = (data, value, peopleToExclude) => {
	return data.filter(node => {
		const val = value.toLowerCase();

		//You could use String.includes here, however you would need to add the polyfill for IE11 support.
		return !peopleToExclude.find(person => person.id === node.id) && (node.name.toLowerCase().indexOf(val) > -1
		|| node.email.toLowerCase().indexOf(val) > -1
		|| node.subtext.toLowerCase().indexOf(val) > -1);
	});
};

//Example to show how the children can be styled however and you also define your own search criteria.
class DetailedListExample extends Component {
	constructor() {
		super();

		const example = this;

		example.state = {
			value: null,
			people: filterPeople(peopleDataSet, '', [peopleDataSet[0]]),
			selectedPeople: [peopleDataSet[0]]
		};

		example.onSearchChangeHandler = example.onSearchChangeHandler.bind(example);
		example.deletePerson = example.deletePerson.bind(example);
		example.deleteLastPerson = example.deleteLastPerson.bind(example);
	}

	onSearchChangeHandler(value) {
		const example = this;
		example.completer.openDropDown();
		example.setState(prevState => ({
			value,
			people: filterPeople(peopleDataSet, value, prevState.selectedPeople)
		}));
	}

	deletePerson(id) {
		this.setState(prevState => {
			const selectedPeople = [...prevState.selectedPeople.filter(person => person.id !== id)];
			return {
				selectedPeople: selectedPeople,
				people: filterPeople(peopleDataSet, prevState.value, selectedPeople)
			}
		});
	}

	deleteLastPerson() {
		const example = this;
		const { selectedPeople } = example.state;
		const lastSelectedPerson = selectedPeople[selectedPeople.length - 1];

		example.deletePerson(lastSelectedPerson.id);
	}

	selectPerson(person) {
		this.setState(prevState => {
			const selectedPeople = [...prevState.selectedPeople, person];
			return {
				value: null,
				selectedPeople: selectedPeople,
				people: filterPeople(peopleDataSet, '', selectedPeople)
			}
		});
	}

	onClose(){
		this.setState({value: null})
	}

	getItems(){
		const example = this;
		const {
			value,
			people
		} = example.state;

		if(!Array.isArray(people) || people.length <= 0){
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

	componentDidMount() {
		const {
			openDrawer,
			selectedPeople
		} = this.props;

		if (openDrawer) {
			this.completer.openDropDown();
		}

		if (selectedPeople != null && typeof selectedPeople === 'number') {
			this.setState({
				selectedPeople: [peopleDataSet[0]]
			});
		} else {
			this.setState({
				selectedPeople: []
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		const {
			openDrawer,
			selectedPeople
		} = nextProps;

		if (openDrawer) {
			this.completer.openDropDown();
		} else {
			this.completer.closeDropDown();
		}

		if (selectedPeople != null && typeof selectedPeople === 'number') {
			this.setState({
				selectedPeople: [peopleDataSet[selectedPeople]]
			});
		} else {
			this.setState({
				selectedPeople: []
			});
		}
	}

	render(){
		const example = this;
		const { value, selectedPeople } = example.state;
		const {
			isLoading,
			placeholder,
			dropdownSize,
			isDisabled,
			noDrawerFooter
		} = example.props;

		const footer = (
			<DropDownFooter
				pickItems={(
					<Pickitem id="footerAction">
							<XUIIcon
								isInline
								path={plusIcon}
								className="xui-margin-right-xsmall"
							/>
							Add New Person
					</Pickitem>
				)}
			/>
		);

		const dropdownFixedWidth = dropdownSize != null ? false: true;

		return (
				<XUIAutocompleter
					ref={ac => example.completer = ac}
					onSearch={example.onSearchChangeHandler}
					placeholder={placeholder}
					searchValue={value}
					dropdownFixedWidth={dropdownFixedWidth}
					footer={noDrawerFooter ? null : footer}
					onClose={() => this.onClose()}
					onBackspacePill={this.deleteLastPerson}
					loading={isLoading}
					dropdownSize={dropdownSize}
					isDisabled={isDisabled}
					inputLabelText="Sample Autocompleter"
					isInputLabelHidden
					pills={
						selectedPeople.map(person =>
							<XUIPill
								value={person.name}
								className="xui-autocompleter--pill"
								onDeleteClick={()=>this.deletePerson(person.id)}
								key={person.id}
							/>
						)
					}
				>
					{example.getItems()}
				</XUIAutocompleter>
		)
	}
}

DetailedListExample.propTypes = {
	openDrawer: PropTypes.bool,
	selectedPeople: PropTypes.number
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const userSelectedPerson = select('Select a person', peopleDataSet.map(person => person.name), 'Frida');
	const selectedPerson = peopleDataSet.findIndex(i => i.name === userSelectedPerson);

	const fullSize = boolean('Match dropdown width', true);
	const userSelectedSize = fullSize ? '' : select('Dropdown size', dropdownSizes, 'small');

	const containerWidth = `${number('Container width', 500)}px`;

	return (
		<div style={{width: containerWidth}}>
			<DetailedListExample
				openDrawer={boolean('Drawer open', false)}
				placeholder={text('Placeholder', '')}
				selectedPeople={selectedPerson}
				isDisabled={boolean('Disabled', false)}
				dropdownSize={userSelectedSize || undefined}
				/>
		</div>
	);
});

const isSelected = (item, selectedIds) => item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);

function createItems(items, selectedId) {
	if (Array.isArray(items)) {
		return items.map(i => createItems(i, selectedId));
	}
	return React.createElement(Pickitem, {
		...items.props,
		value: items.props.id,
		key: items.props.id,
		isSelected: isSelected(items, selectedId)
	}, items.text);
}

const SecondarySearchData = [
	{ props: { id: 'ss1' }, text: "Cost" },
	{ props: { id: 'ss2' }, text: "More Costs" },
	{ props: { id: 'ss3' }, text: "No Costs" },
	{ props: { id: 'ss4' }, text: "Nothing about Cost" },
	{ props: { id: 'ss5' }, text: "Something Unrelated" },
	{ props: { id: 'ss6' }, text: "Random Item" },
	{ props: { id: 'ss7' }, text: "Coats" },
	{ props: { id: 'ss8' }, text: "Big Coat" },
];

class SecondarySearchExample extends React.Component {
	state = {
		data: SecondarySearchData,
		selectedItem: null,
		value: ''
	};

	onOptionSelect = (value) => {
		this.setState({
			selectedItem: value
		});
	}

	onSearch = (value) => {
			const matchingData = SecondarySearchData.filter(item => item.text.toLowerCase().includes(value.toLowerCase()));

			this.setState({
				data: matchingData,
				value: value
			})
	}

	onClose(){
		this.setState({
			value: '',
			data: SecondarySearchData
		})
	}

	render() {
		const { value, data } = this.state;

		const trigger = (
			<XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
				Toggle Me <XUIButtonCaret />
			</XUIButton>
		);

		const items = data.length > 0 ? createItems(data, this.state.selectedItem): (<XUIAutocompleterEmptyState />);

		const footer = (
			<DropDownFooter
				pickItems={(
					<Pickitem id="footerAction">
						<span>
							<XUIIcon
								isInline
								path={plusIcon}
								className="xui-margin-right-xsmall"
							/>
							Add New Person
						</span>
					</Pickitem>
				)}
			/>
		);

		return (
			<div>
				<XUIAutocompleterSecondarySearch
					trigger={trigger}
					onOptionSelect={this.onOptionSelect}
					onSearch={this.onSearch}
					searchValue={value}
					dropdownSize='medium'
					inputLabelText='secondary search label'
					isInputLabelHidden
					qaHook='secondary-search'
					footer={footer}
					onClose={() => this.onClose()}
				>
					<Picklist>
						{items}
					</Picklist>
				</XUIAutocompleterSecondarySearch>
			</div>
		)
	}
}


const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

storiesWithVariations.add('Secondary', () => {
	return <SecondarySearchExample />;
});

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;

		return (
			<div style={{width: '500px'}}>
				<DetailedListExample {...variationMinusStoryDetails}/>
			</div>
		)
	});
});
