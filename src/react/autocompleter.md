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

### Multi-select

`XUIAutocompleter` can be passed an array of pills to display to the left of the input. Each pill should have the `xui-autocompleter--pill` class applied to receive the correct padding. `XUIAutocompleter` also provides a configurable empty state for when no search results are returned.

You should add a callback to `onBackspacePill` which removes the last selected element. This will be called if the backspace key is pressed while the input is empty.

Also note that the `<XUIAutocompleterEmptyState>` component needs to be wrapped in a `<Picklist>` component if you want to be able to access a header or footer with the keyboard.

```jsx
const { boldMatch, decorateSubStr } = require('./autocompleter');
const XUIAutocompleterEmptyState = require('./components/autocompleter/XUIAutocompleterEmptyState').default;
const { Component } = require('react');
const people  = require('./components/autocompleter/private/people').default;
const Pickitem = require('./components/picklist/Pickitem').default;
const DropDownFooter = require('./components/dropdown/DropDownFooter').default;
const plusIcon = require('@xero/xui-icon/icons/plus' ).default;

const filterPersonIds = (data, value, idsToExclude) => {
	const val = value.toLowerCase();
	return Object.keys(data).filter(id => {
		const node = data[id];
		//You could use String.includes here, however you would need to add the polyfill for IE11 support.
		return idsToExclude.indexOf(id) === -1 &&
			(node.name.toLowerCase().indexOf(val) > -1
			|| node.email.toLowerCase().indexOf(val) > -1
			|| node.subtext.toLowerCase().indexOf(val) > -1);
	});
};

//Example to show how the children can be styled however and you also define your own search criteria.
class WrapPillsExample extends Component {
	constructor() {
		super();

		this.state = {
			value: '',
			selectedPeopleIds: 0
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
		const unselectedPeopleIds = filterPersonIds(people, value, selectedPeopleIds);

		const dropdownContents = unselectedPeopleIds.length === 0 ?
			(
				<Picklist>
					<XUIAutocompleterEmptyState id="no_people">
						No People Found
					</XUIAutocompleterEmptyState>
				</Picklist>
			) : (
				<Picklist>
					{unselectedPeopleIds.map(id => (
						<Pickitem key={id} id={id} value={id} onSelect={this.selectPerson}>
							<div className="xui-u-flex">
								<XUIAvatar value={people[id].name} imageUrl={people[id].avatar} />
								<div className="xui-u-grow xui-padding-left">
									<div className="xui-heading-item xui-text-truncated">
										{decorateSubStr(people[id].name, value || '', boldMatch)}
									</div>
									<div className="xui-text-secondary xui-text-truncated">
										{decorateSubStr(people[id].email, value || '', boldMatch)}, {decorateSubStr(people[id].subtext, value || '', boldMatch)}
									</div>
								</div>
							</div>
						</Pickitem>
					))}
				</Picklist>
			);

		return (
				<XUIAutocompleter
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
const DropDownFooter = require('./components/dropdown/DropDownFooter').default;
const plusIcon = require('@xero/xui-icon/icons/plus' ).default;

const filterPersonIds = (data, value, idsToExclude) => {
	const val = value.toLowerCase();
	return data.filter(id => {
		const node = data[id];
		//You could use String.includes here, however you would need to add the polyfill for IE11 support.
		return idsToExclude.indexOf(id) === -1 &&
			(node.name.toLowerCase().indexOf(val) > -1
			|| node.email.toLowerCase().indexOf(val) > -1
			|| node.subtext.toLowerCase().indexOf(val) > -1);
	});
};

//Example to show how the children can be styled however and you also define your own search criteria.
class WrapPillsExample extends Component {
	constructor() {
		super();

		this.state = {
			value: '',
			selectedPeopleIds: [Object.keys(people)[0]]
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
		const unselectedPeopleIds = filterPersonIds(people, value, selectedPeopleIds);

		const dropdownContents = unselectedPeopleIds.length === 0 ?
			(
				<Picklist>
					<XUIAutocompleterEmptyState id="no_people">
						No People Found
					</XUIAutocompleterEmptyState>
				</Picklist>
			) : (
				<Picklist>
					{unselectedPeopleIds.map(id => (
						<Pickitem key={id} id={id} value={id} onSelect={this.selectPerson}>
							<div className="xui-u-flex">
								<XUIAvatar value={people[id].name} imageUrl={people[id].avatar} />
								<div className="xui-u-grow xui-padding-left">
									<div className="xui-heading-item xui-text-truncated">
										{decorateSubStr(people[id].name, value || '', boldMatch)}
									</div>
									<div className="xui-text-secondary xui-text-truncated">
										{decorateSubStr(people[id].email, value || '', boldMatch)}, {decorateSubStr(people[id].subtext, value || '', boldMatch)}
									</div>
								</div>
							</div>
						</Pickitem>
					))}
				</Picklist>
			);

		return (
				<XUIAutocompleter
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

### Single-select

When using `XUIAutocompleter` for selecting a single option, use the `leftElement` and `rightElement` props for adding information and options about the selected item and leave the `pills` prop empty.

```jsx
const { boldMatch, decorateSubStr } = require('./autocompleter');
const XUIAutocompleterEmptyState = require('./components/autocompleter/XUIAutocompleterEmptyState').default;
const XUITextInputSideElement = require('./components/textInput/XUITextInputSideElement').default;
const { Component } = require('react');
const people  = require('./components/autocompleter/private/people').default;
const Pickitem = require('./components/picklist/Pickitem').default;
const DropDownFooter = require('./components/dropdown/DropDownFooter').default;
const plusIcon = require('@xero/xui-icon/icons/plus' ).default;
const crossIcon = require('@xero/xui-icon/icons/cross-small').default;

const filterPersonIds = (data, value) => {
	const val = value.toLowerCase();
	return data.filter(id => {
		const node = data[id];
		return node.name.toLowerCase().indexOf(val) > -1
			|| node.email.toLowerCase().indexOf(val) > -1
			|| node.subtext.toLowerCase().indexOf(val) > -1;
	});
};

//Example to show how the children can be styled however and you also define your own search criteria.
class SingleSelectExample extends Component {
	constructor() {
		super();

		this.state = {
			value: people[Object.keys(people)[0]].name,
			selectedPersonId: Object.keys(people)[0]
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
		const searchResults = filterPersonIds(people, value);

		const dropdownContents = (
			<Picklist>
				{searchResults.map(id => {
					const person = people[id];
					console.log(person);
					return (
						<Pickitem key={id} id={id} value={id} onSelect={this.selectPerson}>
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
					);
				})}
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
				<XUIButton variant="icon" onClick={() => this.selectPerson(null)}>
					<XUIIcon path={crossIcon} />
				</XUIButton>
			</XUITextInputSideElement>
		);

		return (
			<XUIAutocompleter
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
