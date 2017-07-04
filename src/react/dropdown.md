### What is an XUI Dropdown?

This is a set of components that can be used to associate a trigger (button, text input,etc) with a popup containing content.

Using a [Picklist](#picklist) in the `DropDown` gives behaviour similar to a `select` element. But `DropDown` can accomodate any content from [DatePickers](#datepicker) to forms. The basic idea involves creating a trigger element and a dropdown element, then passing both as props to the `<DropDownToggled />` component.

You may find one of these simpler components meets your requirements:

* [Select Box](#select-box) A simplified wrapper for `DropDown` and `DropDownToggled`, acts like a `<select/>` element
* [Autocompleter](#autocompleter) Has a text input for a trigger and allows the user to search through and select from a list of items.

#### Terminology

DropDowns are deceptively complex, so it's important to understand the terms used throughout this documentation.

##### DropDown

This is the container for the elements that are conditionally shown on the page.  It's an absolutely positioned element that floats on top of other content.  Examples of content include the selectable items in a select box or the calendar inside of a DatePicker paired up with a text input.

##### Trigger

The trigger is the element that the user interacts with to open the dropdown.  Examples include the button that opens the selectable list in a select or the text input that users type into in order to search for items in an autocompleter.

### XUI Docs

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-dropdowns.html#dropdowns">Dropdown</a></span>
	</div>
</div>

### Basic Use Cases

At the heart of all of our Dropdown implementations is the `<DropDownToggled />` component.  It's what connects the trigger element with the dropdown.  The two elements are siblings in a React render tree, and the dropdown itself will actually render as an immediate child of the body no matter where it sits in the React virtual DOM tree, but both have to know about each other.  Actions on the button have to open and close the dropdown and, for accessibility reasons, the trigger has to know both the ID of the dropdown element and the currently selected element.  However, React's one-way data flow means that we need something sitting on top of both of these components to send information back and forth

Here's a quick example of creating a selectable list of items with a button trigger:

```
const isSelected = (item, selectedIds) => item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);
const { Component } = require ('react');

function createItems(items, selectedId) {
	if (Array.isArray(items)) {
		return items.map(i => createItems(i, selectedId));
	}
	return React.createElement(Pickitem, {
		...items.props,
		value: items.props.id,
		key: items.props.id,
		isSelected: isSelected(items, selectedId),
	}, items.text);
}

const toggledItems = [ 'Apricot', 'Banana', 'Cherry', 'Dragon Fruit', 'Eggplant', 'Fennel', 'Grape Fruit', 'Honeydew', 'Iceberg Lettuce', 'Jakefruit', 'Kiwi Fruit', 'Lime','Mango', 'Nectarine', 'Orange', 'Pineapple', 'Quince', 'Rapberry', 'Starfruit', 'Tmato', 'Ugl Fruit', 'ValenciaOrange', 'Watermelon', 'Xigua','Yellow quash', 'Zuchini'].map( (text,id) => {
	return { props: { id }, text };
});

class ToggledDropDown extends Component {
	constructor() {
		super();
		this.state = {
			selectedId: null,
		};
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(value) {
		this.setState({
			selectedId: value,
		});
	}

	render() {
		const trigger = (
			<XUIButton>
				{this.state.selectedId ? toggledItems[this.state.selectedId].text : 'Trigger Button'}
				<XUIButtonCaret />
			</XUIButton>
		);
		const dropdown = (
			<DropDown onSelect={this.onSelect}>
				<Picklist>
					{createItems(toggledItems, this.state.selectedId)}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				className="exampleClass"
				onOpen={() => console.log('user wants to open the dropdown')}
				trigger={trigger}
				dropdown={dropdown}
			/>
		);
	}
}
<ToggledDropDown />
```

#### Multiselect

Enabling multiselect behavior is a simple matter of setting a couple of props on the right components.  First, set `closeOnSelect` to `false` on the `<DropDownToggled />` to ensure that the user can select multiple items while the dropdown is open.  Then set the `multiselect` prop on your Pickitems to `true`.  Example:

```
const { Component } = require('react');
const items = [
	{ id: 'a', text: 'First' },
	{ id: 'b', text: 'Second' },
	{ id: 'c', text: 'Third' },
	{ id: 'd', text: 'Fourth' },
];

class MultiselectExample extends Component {
	constructor() {
		super();

		this.state = {
			selected: {
				a: false,
				b: false,
				c: false,
				d: false,
			},
		};

		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(value) {
		this.setState(state => ({
			selected: {
				...state.selected,
				[value]: !state.selected[value],
			},
		}));
	}

	render() {
		const { selected } = this.state;
		const selectedItems = items.filter(item => selected[item.id]).map(item => item.text);
		const trigger = (
			<XUIButton>
				{selectedItems.length == 0 ? 'Select Items' : selectedItems.join(', ')}
				<XUIButtonCaret />
			</XUIButton>
		)
		const dropdown = (
			<DropDown onSelect={this.onSelect}>
				<Picklist>
					{items.map(item => (
						<Pickitem
							key={item.id}
							id={item.id}
							value={item.id}
							isSelected={selected[item.id]}
							multiselect
						>
							{item.text} Option
						</Pickitem>
					))}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				trigger={trigger}
				dropdown={dropdown}
				closeOnSelect={false}
			/>
		);
	}
}
<MultiselectExample />
```


#### With Header and Footer

The `<DropDownHeader />` and `<DropDownFooter />` components are used to add a fixed header and/or footer element to the dropdown.  These elements don't scroll with the rest of the list, and are ignored by the default arrow key handlers.  Add these components via the `header` and `footer` prop on the `<DropDown />` component.

Here is the first example extended with the header and footer:

```
const checked = require ( '@xero/xui-icon/icons/checkbox-check' ).default;
const searchIcon = require ( '@xero/xui-icon/icons/search' ).default;
const isSelected = (item, selectedIds) => item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);
const { Component } = require ('react');

function createItems(items, selectedId) {
	if (Array.isArray(items)) {
		return items.map(i => createItems(i, selectedId));
	}
	return React.createElement(Pickitem, {
		...items.props,
		value: items.props.id,
		key: items.props.id,
		isSelected: isSelected(items, selectedId),
	}, items.text);
}

const toggledItems = [ 'Apricot', 'Banana', 'Cherry', 'Dragon Fruit', 'Eggplant', 'Fennel', 'Grape Fruit', 'Honeydew', 'Iceberg Lettuce', 'Jakefruit', 'Kiwi Fruit', 'Lime','Mango', 'Nectarine', 'Orange', 'Pineapple', 'Quince', 'Rapberry', 'Starfruit', 'Tmato', 'Ugl Fruit', 'ValenciaOrange', 'Watermelon', 'Xigua','Yellow quash', 'Zuchini'].map( (text,id) => {
	return { props: { id }, text };
});

class XDD extends Component {
	constructor() {
		super();

		this.state = {
			selectedId: null,
		};

		this.closeDropDown = this.closeDropDown.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	closeDropDown() {
		this.ddt.closeDropDown();
	}

	onSelect(value) {
		this.setState({
			selectedId: value,
		});
	}

	render() {
		const dropdownHeader = (
			<DropDownHeader
				title="Filter States:"
				onSecondaryButtonClick={this.closeDropDown}
				onPrimaryButtonClick={this.onSelect}
				displayPrimaryButton={true}
				primaryButtonContent={<XUIIcon path={checked} inline={true} />}
			>
				<XUIInput
					className="xui-input-borderless xui-input-borderless-solid"
					containerClassName="xui-inputwrapper-borderless xui-u-fullwidth"
					iconAttributes={{
						path: searchIcon,
						position: 'left',
					}}
					inputAttributes={{
						type: 'search',
						placeholder: 'Fake search box',
					}}
				/>
			</DropDownHeader>
		);

		const dropdownFooter = (
			<DropDownFooter>
				<Picklist>
					<Pickitem id="footerAction">+ Add New Field</Pickitem>
				</Picklist>
			</DropDownFooter>
		);

		const trigger = (
			<XUIButton>
				{this.state.selectedId ? toggledItems[this.state.selectedId].text : 'Toggle Button'}
				<XUIButtonCaret />
			</XUIButton>
		);
		const dropdown = (
			<DropDown
				onSelect={this.onSelect}
				header={dropdownHeader}
				footer={dropdownFooter}
			>
				<Picklist>
					{createItems(toggledItems, this.state.selectedId)}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				ref={c => this.ddt = c}
				trigger={trigger}
				dropdown={dropdown}
			/>
		);
	}
}
<XDD />
```

### Common Use Cases

The DropDown's API had to have default behavior, and the Picklist use case was chosen to be that default.  However, the API is very configurable to allow consumers to handle almost any use case.  These are some examples of relatively common use cases.

#### DropDown with DatePicker

While the `<DropDown />` API is optimized for the `<Picklist />` use case, it can contain any element.  Here is an example of a `<XUIDatePicker />` inside of a `<DropDown />`:

```
const XUIDatePicker = require('./datepicker').default;
const XUIButton = require('./button').default;

const today = new Date();

class SimpleDropDownDatePicker extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedDate: null,
			currentMonth: new Date(),
		};

		this.onSelectDate = this.onSelectDate.bind(this);
		this.focusDatePicker = this.focusDatePicker.bind(this);
	}

	focusDatePicker() {
		this.datepicker.focus();
	}

	onSelectDate(day) {
		this.setState({
			selectedDate: day,
			currentMonth: day,
		});
		this.ddt.closeDropDown();
	}

  render() {
		const { currentMonth, selectedDate } = this.state;
		const dropdown = (
			<DropDown>
				<XUIDatePicker
					ref={c => this.datepicker = c}
					displayedMonth={currentMonth}
					onSelectDate={this.onSelectDate}
					selectedDate={selectedDate}
				/>
			</DropDown>
		);
		const trigger = (
			<XUIButton>
				{selectedDate == null ? 'Select a date' : selectedDate.toDateString()}
			</XUIButton>
		);
    return (
      <DropDownToggled
				ref={c => this.ddt = c}
				trigger={trigger}
				dropdown={dropdown}
				closeOnTab={false}
				restrictToViewPort={false}
				onOpenAnimationEnd={this.focusDatePicker}
			/>
    );
  }
}
<SimpleDropDownDatePicker />
```

Since this example is no longer using the dropdown for the optimized use case, there are certain user interactions that need to be handled manually.

First, the `restrictToViewPort` prop of `<DropDownToggled />` is set to `false` to ensure that the user is never required to scroll the contents of the date picker.  Scrolling is fine for lists, but scrolling a date picker is a cumbersome user experience.  This does mean that the date picker might hang off the edge of the screen or slightly cover the button, but this is prerrable to having to scroll inside of the dropdown.

The `<DropDown />` component is also not able to focus the datepicker automatically.  Since the date picker has to receive focus in order to handle keyboard events, it's essential that focus is moved. To accomplish this, call `XUIDatePicker.focus` once the `<DropDown />` is positioned and visible by passing it as a callback to the `onOpenAnimationEnd` prop of `<DropDownToggled />` instead of the `onOpen` prop.  `onOpen` is called as soon as the user takes an action to open the dropdown, so the date picker isn't able to receive focus yet.

Keyboard users also need to use the tab key to navigate to the next/previous month buttons or the selects controlling the month and year.  However, the dropdown will close when the user hits the tab key by default.  To prevent this, set the `closeOnTab` prop to false on `<DropDownToggled />`.

Lastly, the dropdown must be manually closed when the user has selected a date.  The `XUIDatePicker.onSelectDate` callback is used to set state and call `DropDownToggled.closeDropDown`.

#### DropDown with Text Input Trigger

It is highly recommended that you use the [Autocompleter](#autocompleter) to implement this pattern if it fits your use case.  It handles theses customizations by default.

By default, the DropDown handles keyboard events for you because focus is actually placed on the DropDown's DOM node.  In many situations, that may not be desirable.  One common use case is where the trigger is actually a text input, since the user generally wants to be able to type in the text box.

Here's an example of a possible way that this could be handled:

```
const debounce = require('lodash.debounce');
const { Component } = require('react');
const { boldMatch, decorateSubStr } = require('./autocompleter');

const items = [ 'Apricot', 'Banana', 'Cherry', 'Dragon Fruit', 'Eggplant', 'Fennel', 'Grape Fruit', 'Honeydew', 'Iceberg Lettuce', 'Jakefruit', 'Kiwi Fruit', 'Lime','Mango', 'Nectarine', 'Orange', 'Pineapple', 'Quince', 'Rapberry', 'Starfruit', 'Tmato', 'Ugl Fruit', 'ValenciaOrange', 'Watermelon', 'Xigua','Yellow quash', 'Zuchini'].map((text, id) => {
	return { id, text };
});

class InputTriggerExample extends Component {
	constructor() {
		super();

		this.state = {
			inputValue: '',
			selectedId: null,
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.onInputKeyDown = this.onInputKeyDown.bind(this);
		this.onSelect = this.onSelect.bind(this);
	}

	onInputChange(event) {
		this.setState({
			inputValue: event.target.value,
		});
	}

	onInputKeyDown(event) {
		if (this.ddt.isDropDownOpen() && this.dropdown != null) {
			this.dropdown.onKeyDown(event);
		} else {
			this.ddt.openDropDown();
		}
	}

	onSelect(value) {
		this.setState({
			inputValue: items.find(item => item.id === value).text,
			selectedId: value,
		});
	}

	render() {
		const { selectedId, inputValue } = this.state;
		const trigger = (
			<XUIInput
				inputAttributes={{
					placeholder: 'Type Here',
					value: inputValue,
					onInput: this.onInputChange,
					onKeyDown: this.onInputKeyDown,
				}}
			/>
		);

		let visibleItems;
		if (inputValue === '' || (selectedId != null && items[selectedId].text === inputValue)) {
			visibleItems = items;
		} else {
			const matcher = new RegExp(inputValue, 'i');
			visibleItems = items.filter(item => matcher.test(item.text));
		}

		const dropdown = (
			<DropDown
				ref={c => this.dropdown = c}
				hasKeyboardEvents={false}
				restrictFocus={false}
				onSelect={this.onSelect}
			>
				<Picklist>
					{visibleItems.map(item => (
						<Pickitem
							key={item.id}
							id={item.id}
							value={item.id}
							isSelected={selectedId === item.id}
						>
							<span>{decorateSubStr(item.text, inputValue, boldMatch)}</span>
						</Pickitem>
					))}
				</Picklist>
			</DropDown>
		);

		return (
			<DropDownToggled
				ref={c => this.ddt = c}
				trigger={trigger}
				dropdown={dropdown}
				triggerClickAction="none"
			/>
		);
	}
}

<InputTriggerExample />
```

This example illustrates how several props can be used to achieve your desired UX.

`DropDownToggled.triggerClickAction` determines what happens when the user clicks on the trigger.  By default, we toggle the dropdown's open state, but you can turn this off with "none" or use "open" to always open.

If you want the focus to remain on the trigger once the dropdown is open, you have to set the `DropDown.hasKeyboardEvents` and `DropDown.restrictFocus` props to `false` to ensure that focus does not shift to the dropdown.

However, the combination of setting those props means that the dropdown no longer automatically opens.  If you choose to go this route, you'll now need to manually open the dropdown by calling the `DropDownToggled.openDropDown` API.  The example above just does it on any keypress in the input, but this is not required, and the dropdown can be opened at any time.

While this opens the dropdown, the arrow keys, escape key, etc no longer allow the user to navigate the dropdown.  The `DropDown.onKeyDown` API is a public API for this very reason.  Simply pass the keydown event to the DropDown and all normal keyboard handlers will take effect without moving focus from your trigger node.  Calling the public API is the equivalent of simulating a keydown event on the DropDown, so you get the same behavior as if the keydown did happen on the dropdown.
