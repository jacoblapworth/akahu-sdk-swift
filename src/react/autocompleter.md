<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-dropdowns-autocompleter.html">Autocompleter in the XUI Documentation</a>
</div>
`XUIAutocompleter` is a component that composes many other components together. It's an input where users can type to filter a list of items to select.

Refer to the following sections of the XUI Documentation for more information about the components that make up a `XUIAutocompleter`.

##### Related Components

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="#input">Input</a></span>
	</div>
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="#avatar">Avatar</a></span>
	</div>
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="#dropdown">Dropdown</a></span>
	</div>
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="#pill">Pill</a></span>
	</div>
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="#tag">Tag</a></span>
	</div>
</div>

## Examples

### Standard

`XUIAutocompleter` can be passed an array of pills to display to the left of the input. Each pill should have the `xui-autocompleter--pill` class applied to receive the correct padding. `XUIAutocompleter` also provides a configurable empty state for when no search results are returned.

You should add a callback to `onBackspacePill` which removes the last selected element. This will be called if the backspace key is pressed while the input is empty.

```
const { boldMatch, decorateSubStr } = require('./autocompleter');
const XUIAutocompleterEmptyState = require('./components/autocompleter/XUIAutocompleterEmptyState').default;
const { Component } = require('react');
const peopleDataSet  = require('./components/autocompleter/private/people').default;
const Pickitem = require('./components/picklist/Pickitem').default;
const DropDownFooter = require('./components/dropdown/DropDownFooter').default;
const XUIIcon = require('./components/icon/XUIIcon').default;
const plusIcon = require ( '@xero/xui-icon/icons/plus' ).default;

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
			value: '',
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
			value: value,
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
				value: '',
				selectedPeople: selectedPeople,
				people: filterPeople(peopleDataSet, '', selectedPeople)
			}
		});
	}

	onClose(){
		this.setState({value: ''})
	}

	getItems(){
		const example = this;
		const {
			value,
			people,
			selectedPeople
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

	render(){
		const example = this;
		const { value, selectedPeople } = example.state;

		const footer = (
			<DropDownFooter>
				<Picklist>
					<Pickitem id="footerAction">
						<span>
							<XUIIcon
								inline
								path={plusIcon}
								className="xui-margin-right-xsmall"
							/>
							Add New Person
							</span>
					</Pickitem>
				</Picklist>
			</DropDownFooter>
		);

		return (
				<XUIAutocompleter
					ref={ac => example.completer = ac}
					onSearch={example.onSearchChangeHandler}
					placeholder="Search"
					searchValue={value}
					dropdownFixedWidth
					footer={footer}
					onClose={() => this.onClose()}
					onBackspacePill={this.deleteLastPerson}
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

<DetailedListExample />
```

### Disable Wrapping Pills

By default the pills and search bar will wrap inside the `XUIAutocompleter` input container. To disable this, set `disableWrapPills` to true.

```
const { boldMatch, decorateSubStr } = require('./autocompleter');
const XUIAutocompleterEmptyState = require('./components/autocompleter/XUIAutocompleterEmptyState').default;
const { Component } = require('react');
const peopleDataSet  = require('./components/autocompleter/private/people').default;
const Pickitem = require('./components/picklist/Pickitem').default;
const DropDownFooter = require('./components/dropdown/DropDownFooter').default;
const XUIIcon = require('./components/icon/XUIIcon').default;
const plusIcon = require ( '@xero/xui-icon/icons/plus' ).default;

const filterPeople = (data, value, peopleToExclude) => {
	return data.filter(node => {
		const val = value.toLowerCase();

		//You could use String.includes here, however you would need to add the polyfill for IE11 support.
		return !peopleToExclude.find(person => person.id === node.id) && (node.name.toLowerCase().indexOf(val) > -1
		|| node.email.toLowerCase().indexOf(val) > -1
		|| node.subtext.toLowerCase().indexOf(val) > -1);
	});
};

class DetailedListExample extends Component {
	constructor() {
		super();

		const example = this;

		example.state = {
			value: '',
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
			value: value,
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

	onClose(){
		this.setState({value: ''})
	}

	selectPerson(person) {
		this.setState(prevState => {
			const selectedPeople = [...prevState.selectedPeople, person];
			return {
				value: '',
				selectedPeople: selectedPeople,
				people: filterPeople(peopleDataSet, '', selectedPeople)
			}
		});
	}

	getItems(){
		const example = this;
		const {
			value,
			people,
			selectedPeople
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

	render(){
		const example = this;
		const { value, selectedPeople } = example.state;

		const footer = (
			<DropDownFooter>
				<Picklist>
					<Pickitem id="footerAction">
						<span>
							<XUIIcon
								inline
								path={plusIcon}
								className="xui-margin-right-xsmall"
							/>
							Add New Person
							</span>
					</Pickitem>
				</Picklist>
			</DropDownFooter>
		);

		return (
				<XUIAutocompleter
					ref={ac => example.completer = ac}
					onSearch={example.onSearchChangeHandler}
					placeholder="Search"
					searchValue={value}
					dropdownFixedWidth
					disableWrapPills
					footer={footer}
					onClose={() => this.onClose()}
					onBackspacePill={this.deleteLastPerson}
					pills={
						selectedPeople.map(person =>
							<XUIPill
								value={person.name}
								className="xui-autocompleter--pill"
								onDeleteClick={()=>this.deletePerson(person.id)}
								onClick={() => example.completer.focusInput()}
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

<DetailedListExample />
```
