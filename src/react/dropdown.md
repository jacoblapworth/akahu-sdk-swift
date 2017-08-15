<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-dropdowns.html#dropdowns">Dropdown in the XUI Documentation</a></span>
	</div>
</div>

## What is a XUI Dropdown?

This is a set of components that can be used to associate a trigger (button, text input,etc) with a popup containing content.

Using a [Picklist](#picklist) in the `DropDown` gives behaviour similar to a `select` element. But `DropDown` can accomodate any content from [DatePickers](#datepicker) to forms. The basic idea involves creating a trigger element and a dropdown element, then passing both as props to the `<DropDownToggled />` component.

You may find one of these simpler components meets your requirements:

* [Select Box](#select-box) A simplified wrapper for `DropDown` and `DropDownToggled`, acts like a `<select/>` element
* [Autocompleter](#autocompleter) Has a text input for a trigger and allows the user to search through and select from a list of items.

### Terminology

DropDowns are deceptively complex, so it's important to understand the terms used throughout this documentation.

#### DropDown

This is the container for the elements that are conditionally shown on the page. It's an absolutely positioned element that floats on top of other content.  Examples of content include the selectable items in a select box or the calendar inside of a DatePicker paired up with a text input.

#### Trigger

The trigger is the element that the user interacts with to open or close the dropdown. Examples include the button that opens the selectable list in a select box or the text input that users type into in order to search for items in an autocompleter.

## Basic Use Cases

At the heart of all of our Dropdown implementations is the `<DropDownToggled />` component. It's what connects the trigger element with the dropdown.  The two elements are siblings in a React render tree, and the dropdown itself will actually render as an immediate child of the body no matter where it sits in the React virtual DOM tree, but both have to know about each other.  Actions on the button have to open and close the dropdown so for accessibility reasons, the trigger has to know both the ID of the dropdown element and the ID of the currently selected element.  However, React's one-way data flow means that we need something sitting on top of both of these components to send information back and forth.

**Important Note:**
If you want standard picklist behavior (close on select, keyboard handlers, etc) then you **must** have a `<Picklist />` as an immediate child of the `<DropDown />`.  If you are missing these features, make sure that you are correctly using the `<Picklist />` component.

Here's a quick example of creating a selectable list of items with a button trigger:

```
const DropDownToggled = require('./components/dropdown/DropDownToggled').default;
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

### Multiselect
To enable multiselect behaviour you will need to set two props.  First, set `closeOnSelect` to `false` on the `<DropDownToggled />` to ensure that the user can select multiple items while the dropdown is open. Then set the `multiselect` prop on your Pickitems to `true`.

```
const { Component } = require('react');
const DropDownToggled = require('./components/dropdown/DropDownToggled').default;
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
