<div class="xui-margin-vertical">
	<a isDocLink href="../section-compounds-collectinginput-autocompleter.html">Autocompleter in the XUI Documentation</a>
</div>
`XUIAutocompleter` is a component that composes many other components together. It's an input where users can type to filter a list of items to select.

Refer to the following sections of the XUI Documentation for more information about the components that make up a `XUIAutocompleter`.

##### Related Components

<div class="xui-margin-vertical">
	<div>
		<a href="#text-input" isDocLink>Text Input</a>
	</div>
	<div>
		<a href="#avatar" isDocLink>Avatar</a>
	</div>
	<div>
		<a href="#dropdown" isDocLink>Dropdown</a>
	</div>
	<div>
		<a href="#pill" isDocLink>Pill</a>
	</div>
	<div>
		<a href="#tag" isDocLink>Tag</a>
	</div>
</div>

## Examples

### Multi-select

`XUIAutocompleter` can be passed an array of pills to display to the left of the input. Each pill should have the `xui-autocompleter--pill` class applied to receive the correct padding. `XUIAutocompleter` also provides a configurable empty state for when no search results are returned.

You should add a callback to `onBackspacePill` which removes the last selected element. This will be called if the backspace key is pressed while the input is empty.

Also note that the `<XUIAutocompleterEmptyState>` component needs to be wrapped in a `<Picklist>` component if you want to be able to access a header or footer with the keyboard.

Currently it's recommended that you do not pass in a `rightElement` prop while using wrapping pills. At certain widths, the right element may wrap down to the next row without the input, which doesn't display nicely.

```jsx
const { boldMatch, decorateSubStr } = require('./autocompleter');
const XUIAutocompleterEmptyState = require('./components/autocompleter/XUIAutocompleterEmptyState').default;
const { Component } = require('react');
const people  = require('./components/autocompleter/private/people').default;
const Pickitem = require('./components/picklist/Pickitem').default;

const filterPeople = (peopleToSearch, value, idsToExclude) => {
	const val = value.toLowerCase();
	return peopleToSearch.filter((person, index) =>
		idsToExclude.indexOf(index) === -1 &&
		(person.name.toLowerCase().indexOf(val) > -1
		|| person.email.toLowerCase().indexOf(val) > -1
		|| person.subtext.toLowerCase().indexOf(val) > -1)
	);
};

//Example to show how the children can be styled however and you also define your own search criteria.
class WrapPillsExample extends Component {
	constructor() {
		super();

		this.state = {
			value: '',
			selectedPeopleIds: [0]
		};

		this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
		this.deletePerson = this.deletePerson.bind(this);
		this.deleteLastPerson = this.deleteLastPerson.bind(this);
		this.selectPerson = this.selectPerson.bind(this);
	}

	onSearchChangeHandler(value) {
		this.completer.openDropDown();
		this.setState(prevState => ({ value }));
	}

	deletePerson(idToRemove) {
		this.setState(prevState => ({
			selectedPeopleIds: [...prevState.selectedPeopleIds.filter(id => id !== idToRemove)],
		}));
	}

	deleteLastPerson() {
		this.setState(prevState => ({
			selectedPeopleIds: [...prevState.selectedPeopleIds.slice(0, -1)],
		}));
	}

	selectPerson(person) {
		this.setState(prevState => ({
			selectedPeopleIds: [...prevState.selectedPeopleIds, person],
			value: '',
		}));
	}

	render(){
		const { value, selectedPeopleIds } = this.state;
		const unselectedPeopleIds = filterPeople(people, value, selectedPeopleIds);

		const dropdownContents = unselectedPeopleIds.length === 0 ?
			(
				<Picklist>
					<XUIAutocompleterEmptyState id="no_people">
						No People Found
					</XUIAutocompleterEmptyState>
				</Picklist>
			) : (
				<Picklist>
					{unselectedPeopleIds.map(person => (
						<Pickitem key={person.id} id={person.id} value={person.id} onSelect={this.selectPerson}>
							<div className="xui-u-flex">
								<XUIAvatar value={person.name} imageUrl={person.avatar} />
								<div className="xui-u-grow xui-padding-left">
									<div className="xui-heading-item xui-text-truncated">
										{decorateSubStr(person.name, value || '', boldMatch)}
									</div>
									<div className="xui-text-secondary xui-text-truncated">
										{decorateSubStr(person.email, value || '', boldMatch)}, {decorateSubStr(person.subtext, value || '', boldMatch)}
									</div>
								</div>
							</div>
						</Pickitem>
					))}
				</Picklist>
			);

		return (
				<XUIAutocompleter
					inputLabelText='autocompleter'
					isInputLabelHidden
					ref={ac => this.completer = ac}
					onSearch={this.onSearchChangeHandler}
					placeholder="XUI Autocompleter accommodates enough space to fit the placeholder"
					searchValue={value}
					onBackspacePill={this.deleteLastPerson}
					pills={
						selectedPeopleIds.map(id =>
							<XUIPill
								value={people[id].name}
								className="xui-autocompleter--pill"
								onDeleteClick={()=>this.deletePerson(id)}
								isMaxContentWidth
								key={id}
							/>
						)
					}
				>
					{dropdownContents}
				</XUIAutocompleter>
		)
	}
}

<WrapPillsExample />
```

### Multi-select without wrapping pills

By default the pills and search bar will wrap inside the `XUIAutocompleter` input container. To disable this, set `disableWrapPills` to true.

```jsx
const { boldMatch, decorateSubStr } = require('./autocompleter');
const XUIAutocompleterEmptyState = require('./components/autocompleter/XUIAutocompleterEmptyState').default;
const { Component } = require('react');
const people  = require('./components/autocompleter/private/people').default;
const Pickitem = require('./components/picklist/Pickitem').default;

const filterPeople = (peopleToSearch, value, idsToExclude) => {
	const val = value.toLowerCase();
	return peopleToSearch.filter((person, index) =>
		idsToExclude.indexOf(index) === -1 &&
		(person.name.toLowerCase().indexOf(val) > -1
		|| person.email.toLowerCase().indexOf(val) > -1
		|| person.subtext.toLowerCase().indexOf(val) > -1)
	);
};

//Example to show how the children can be styled however and you also define your own search criteria.
class DisableWrapPills extends Component {
	constructor() {
		super();

		this.state = {
			value: '',
			selectedPeopleIds: [0]
		};

		this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
		this.deletePerson = this.deletePerson.bind(this);
		this.deleteLastPerson = this.deleteLastPerson.bind(this);
		this.selectPerson = this.selectPerson.bind(this);
	}

	onSearchChangeHandler(value) {
		this.completer.openDropDown();
		this.setState(prevState => ({ value }));
	}

	deletePerson(idToRemove) {
		this.setState(prevState => ({
			selectedPeopleIds: [...prevState.selectedPeopleIds.filter(id => id !== idToRemove)],
		}));
	}

	deleteLastPerson() {
		this.setState(prevState => ({
			selectedPeopleIds: [...prevState.selectedPeopleIds.slice(0, -1)],
		}));
	}

	selectPerson(person) {
		this.setState(prevState => ({
			selectedPeopleIds: [...prevState.selectedPeopleIds, person],
			value: '',
		}));
	}

	render(){
		const { value, selectedPeopleIds } = this.state;
		const unselectedPeopleIds = filterPeople(people, value, selectedPeopleIds);

		const dropdownContents = unselectedPeopleIds.length === 0 ?
			(
				<Picklist>
					<XUIAutocompleterEmptyState id="no_people">
						No People Found
					</XUIAutocompleterEmptyState>
				</Picklist>
			) : (
				<Picklist>
					{unselectedPeopleIds.map(person => (
						<Pickitem key={person.id} id={person.id} value={person.id} onSelect={this.selectPerson}>
							<div className="xui-u-flex">
								<XUIAvatar value={person.name} imageUrl={person.avatar} />
								<div className="xui-u-grow xui-padding-left">
									<div className="xui-heading-item xui-text-truncated">
										{decorateSubStr(person.name, value || '', boldMatch)}
									</div>
									<div className="xui-text-secondary xui-text-truncated">
										{decorateSubStr(person.email, value || '', boldMatch)}, {decorateSubStr(person.subtext, value || '', boldMatch)}
									</div>
								</div>
							</div>
						</Pickitem>
					))}
				</Picklist>
			);

		return (
				<XUIAutocompleter
					inputLabelText='autocompleter'
					isInputLabelHidden
					ref={ac => this.completer = ac}
					onSearch={this.onSearchChangeHandler}
					placeholder="XUI Autocompleter accommodates enough space to fit the placeholder"
					searchValue={value}
					onBackspacePill={this.deleteLastPerson}
					disableWrapPills
					pills={
						selectedPeopleIds.map(id =>
							<XUIPill
								value={people[id].name}
								className="xui-autocompleter--pill"
								onDeleteClick={()=>this.deletePerson(id)}
								isMaxContentWidth
								key={id}
							/>
						)
					}
				>
					{dropdownContents}
				</XUIAutocompleter>
		)
	}
}

<DisableWrapPills />
```

### Single-select

When using `XUIAutocompleter` for selecting a single option, use the `leftElement` and `rightElement` props for adding information and options about the selected item and leave the `pills` prop empty.

```jsx
const { boldMatch, decorateSubStr } = require('./autocompleter');
const XUIIcon = require('./components/icon/XUIIcon').default;
const XUIAutocompleterEmptyState = require('./components/autocompleter/XUIAutocompleterEmptyState').default;
const XUITextInputSideElement = require('./components/textInput/XUITextInputSideElement').default;
const { Component } = require('react');
const people  = require('./components/autocompleter/private/people').default;
const Pickitem = require('./components/picklist/Pickitem').default;
const crossIcon = require('@xero/xui-icon/icons/cross-small').default;

const filterPeople = (peopleToSearch, value) => {
	const val = value.toLowerCase();
	return peopleToSearch.filter(person =>
		person.name.toLowerCase().indexOf(val) > -1
		|| person.email.toLowerCase().indexOf(val) > -1
		|| person.subtext.toLowerCase().indexOf(val) > -1
	);
};

//Example to show how the children can be styled however and you also define your own search criteria.
class SingleSelectExample extends Component {
	constructor() {
		super();

		this.state = {
			value: people[0].name,
			selectedPersonId: 0
		};

		this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
		this.selectPerson = this.selectPerson.bind(this);
	}

	onSearchChangeHandler(value) {
		this.completer.openDropDown();
		this.setState(prevState => {
			const { selectedPersonId } = prevState;
			const textIsCurrentName = selectedPersonId != null && value === people[selectedPersonId].name;
			return {
				value,
				selectedPersonId: textIsCurrentName ? selectedPersonId : null,
			};
		});
	}

	selectPerson(selectedPersonId) {
		this.setState(prevState => ({
			selectedPersonId,
			value: selectedPersonId != null ? people[selectedPersonId].name : '',
		}));
	}

	render(){
		const { value, selectedPersonId } = this.state;
		const searchResults = filterPeople(people, value);

		const dropdownContents = (
			<Picklist>
				{searchResults.map(person => (
					<Pickitem key={person.id} id={person.id} value={person.id} onSelect={this.selectPerson}>
						<div className="xui-u-flex">
							<XUIAvatar value={person.name} imageUrl={person.avatar} />
							<div className="xui-u-grow xui-padding-left">
								<div className="xui-heading-item xui-text-truncated">
									{decorateSubStr(person.name, value || '', boldMatch)}
								</div>
								<div className="xui-text-secondary xui-text-truncated">
									{decorateSubStr(person.email, value || '', boldMatch)}, {decorateSubStr(person.subtext, value || '', boldMatch)}
								</div>
							</div>
						</div>
					</Pickitem>
				))}
			</Picklist>
		);
		const leftElement = selectedPersonId != null && (
			<XUITextInputSideElement type="avatar" >
				<XUIAvatar
					value={people[selectedPersonId].name}
					imageUrl={people[selectedPersonId].avatar}
					size="small"
				/>
			</XUITextInputSideElement>
		);
		const rightElement = selectedPersonId != null && (
			<XUITextInputSideElement type="icon">
				<XUIButton variant="icon" onClick={() => this.selectPerson(null)} aria-label="Clear">
					<XUIIcon icon={crossIcon} />
				</XUIButton>
			</XUITextInputSideElement>
		);

		return (
			<XUIAutocompleter
				inputLabelText='autocompleter'
				isInputLabelHidden
				ref={ac => this.completer = ac}
				onSearch={this.onSearchChangeHandler}
				placeholder="Select a person"
				searchValue={value}
				onBackspacePill={this.deleteLastPerson}
				leftElement={leftElement}
				rightElement={rightElement}
			>
				{dropdownContents}
			</XUIAutocompleter>
		)
	}
}

<SingleSelectExample />
```
