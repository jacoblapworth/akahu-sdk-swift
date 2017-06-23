Autocompleter
==========
![](https://img.shields.io/badge/XUI-^10.16.0-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

A searchable input field that also handles keyboard interactions and highlighting states with the dropdown portion of the component.

### Example
```js
import React from 'react';
import Autocompleter from '@xero/xui/react/autocompleter';
import Picklist, { Pickitem } from '@xero/xui/react/picklist';

class DetailedListExample extends Component {
	constructor() {
		super();

		const example = this;

		example.state= {
			value: '',
			people: people,
			selectedItem: null
		};

		example.onSearchChangeHandler = example.onSearchChangeHandler.bind(example);
	}

	onSearchChangeHandler(value) {
		const example = this;
		const { selectedItem } = example.state;
		example.completer.openDropDown();
		example.setState({
			value: value,
			people: filterPeopleByValue(people, value, selectedItem)
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

	getItems() {
		const example = this;
		const { value, people } = example.state;
		const noResults = <Pickitem>No People Found</Pickitem>;

		if(!Array.isArray(people) || people.length <= 0){
			return noResults;
		}

		return people.map(item => (
			<Pickitem
				key={`multi-${item.id}`}
				id={item.id} multiselect={true}
				disableSelectedStyles={true}
				isSelected={!!selectedItems[item.id]}
				onSelect={example.onOptionSelect}
			>
				{decorateSubStr(item.name, value || '', boldMatch)}
			</Pickitem>
		));
	}

	render() {
		const example = this;
		const { value } = example.state;

		return (
			<Autocompleter
				ref={ac => example.completer = ac}
				onSearch={example.onSearchChangeHandler}
				placeholder="Search"
				searchValue={value}
				dropdownSize="large"
			>
				<Picklist>
					{example.getItems()}
				</Picklist>
			</Autocompleter>
		)
	}
}
```

### Prop Types

`onOptionSelect` {Function} Callback to handle when an option has been selected from the dropdown.

`loading` {Boolean} When set to true a loader will be displayed instead of the picklist items. State for this should be managed externally and it's defaulted to false.

`id` {String} ID to be added to the dropdown element of the completer.

`searchValue` {String} Value that should be inside the input.

`className` {String} CSS class(es) to go on the wrapping DOM node.

`dropdownClassName` {String} CSS class(es) to go on the dropdown list.

`inputClassName` {String} CSS class(es) to go on the input.

`placeholder` {String} Placeholder for the input

`maxLength` {Number} max length of the input

`pills` {Pill|Pill[]} A set of pills to show above the input.  Useful for showing what was selected in a multi-select.

`onOpen` {Function} Callback for when the list opens.

`onClose` {Function} Callback for when the list closes.

`onSearch` {Function} Callback for when the user types into the search box

`searchThrottleInterval` {Number} If you want to throttle the input's onChange handler, put the throttle interval here.

`dropdownSize` {String} applies a class to the dropdown which sets the width. Valid values are `small`, `medium`, `large`, and `xlarge`. If no value is provided,
the Autocompleter's Dropdown will be given `xui-u-fullwidth`, so that it spans the full width of the input.

`closeOnSelect` {Boolean} maps to the same property of the DropDownToggled component.

`openOnFocus` {Boolean} false by default, when set to true the dropdown will automatically open when the input is given focus.
