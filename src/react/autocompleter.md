`Autocompleter` is a component that composes many other components together. It's an input where users can type to filter a list of items to select.

Refer to the following sections of the XUI Documentation for more information about the components that make up an `Autocompleter`.

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-forms.html#forms-4">Input</a></span>
	</div>
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-avatars.html#avatars-1">Avatar</a></span>
	</div>
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-dropdowns.html#dropdowns">Dropdown</a></span>
	</div>
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-pills-and-tags.html#pills-and-tags-2">Pills and Tags</a></span>
	</div>
</div>

## Examples

### Standard

`Autocompleter` can be passed an array of pills to display to the left of the input. Each pill should have the `xui-autocompleter--pill` class applied to receive the correct padding. `Autocompleter` also provides a configurable empty state for when no search results are returned.

```
const { boldMatch, decorateSubStr } = require('./autocompleter');
const XUIAutocompleterEmptyState = require('./components/autocompleter/XUIAutocompleterEmptyState').default;
const { Component } = require('react');
const peopleDataSet  = require('./components/autocompleter/private/people').default;
const Pickitem = require('./components/picklist/Pickitem').default;

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
	}

	onSearchChangeHandler(value) {
		const example = this;
		const { selectedPeople } = example.state;
		example.completer.openDropDown();
		example.setState({
			value: value,
			people: filterPeople(peopleDataSet, value, selectedPeople)
		});
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

	filterDataByValue(value){
		const people = people.filter(person => {
			return person.name.toLowerCase().includes(value.toLowerCase())
				|| person.email.toLowerCase().includes(value.toLowerCase())
				|| person.subtext.toLowerCase().includes(value.toLowerCase())
		});

		this.setState({
			loading: false,
			data: people
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
			return <EmptyState id="no_people">No People Found</EmptyState>;
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

		return (
				<XUIAutocompleter
					ref={ac => example.completer = ac}
					onSearch={example.onSearchChangeHandler}
					placeholder="Search"
					searchValue={value}
					dropdownFixedWidth
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

By default the pills and search bar will wrap inside the `Autocompleter` input container. To disable this, set `disableWrapPills` to true.

```
const { boldMatch, decorateSubStr } = require('./autocompleter');
const XUIAutocompleterEmptyState = require('./components/autocompleter/XUIAutocompleterEmptyState').default;
const { Component } = require('react');
const peopleDataSet  = require('./components/autocompleter/private/people').default;
const Pickitem = require('./components/picklist/Pickitem').default;

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
	}

	onSearchChangeHandler(value) {
		const example = this;
		const { selectedPeople } = example.state;
		example.completer.openDropDown();
		example.setState({
			value: value,
			people: filterPeople(peopleDataSet, value, selectedPeople)
		});
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

	filterDataByValue(value){
		const people = people.filter(person => {
			return person.name.toLowerCase().includes(value.toLowerCase())
				|| person.email.toLowerCase().includes(value.toLowerCase())
				|| person.subtext.toLowerCase().includes(value.toLowerCase())
		});

		this.setState({
			loading: false,
			data: people
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
			return <EmptyState id="no_people">No People Found</EmptyState>;
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

		return (
				<XUIAutocompleter
					ref={ac => example.completer = ac}
					onSearch={example.onSearchChangeHandler}
					placeholder="Search"
					searchValue={value}
					dropdownFixedWidth
					disableWrapPills
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
