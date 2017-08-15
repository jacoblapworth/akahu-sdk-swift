The DropDown's API had to have default behavior, and the Picklist use case was chosen to be that default. However, the API is very configurable to allow consumers to handle almost any use case.  These are some examples of relatively common use cases.

### DropDown with DatePicker

While the `<DropDown />` API is optimized for the `<Picklist />` use case, it can contain any element.

```
const XUIDatePicker = require('../../datepicker').default;
const XUIButton = require('../../button').default;

const today = new Date();
const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = date => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

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
				{selectedDate == null ? 'Select a date' : formatDate(selectedDate)}
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

**First, the `restrictToViewPort` prop of `<DropDownToggled />` is set to `false`** to ensure that the user is never required to scroll the contents of the date picker.  Scrolling is fine for lists, but scrolling a date picker is a cumbersome user experience.  This does mean that the date picker might hang off the edge of the screen or slightly cover the button, but this is prerrable to having to scroll inside of the dropdown.

**The `<DropDown />` component is also not able to focus the datepicker automatically.**  Since the date picker has to receive focus in order to handle keyboard events, it's essential that focus is moved. To accomplish this, call `XUIDatePicker.focus` once the `<DropDown />` is positioned and visible by passing it as a callback to the `onOpenAnimationEnd` prop of `<DropDownToggled />` instead of the `onOpen` prop.  `onOpen` is called as soon as the user takes an action to open the dropdown, so the date picker isn't able to receive focus yet.

**Keyboard users also need to use the tab key to navigate** to the next/previous month buttons or the selects controlling the month and year.  However, the dropdown will close when the user hits the tab key by default.  To prevent this, set the `closeOnTab` prop to false on `<DropDownToggled />`.

**Lastly, the dropdown must be manually closed when the user has selected a date.**  The `XUIDatePicker.onSelectDate` callback is used to set state and call `DropDownToggled.closeDropDown`.

### DropDown with Text Input Trigger

It is highly recommended that you use the [Autocompleter](#autocompleter) to implement this pattern if it fits your use case.  It handles theses customizations by default.

By default, the DropDown handles keyboard events for you because focus is actually placed on the DropDown's DOM node.  In many situations, that may not be desirable.  One common use case is where the trigger is actually a text input, since the user generally wants to be able to type in the text box.

```
require('array.prototype.find').shim();
const debounce = require('lodash.debounce');
const { Component } = require('react');
const { boldMatch, decorateSubStr, EmptyState } = require('../../autocompleter');

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
		let pickItems;
		if (visibleItems.length === 0) {
			pickItems = <EmptyState id="noItems">No Fruit Found</EmptyState>;
		} else {
			pickItems = visibleItems.map(item => (
				<Pickitem
					key={item.id}
					id={item.id}
					value={item.id}
					isSelected={selectedId === item.id}
				>
					<span>{decorateSubStr(item.text, inputValue, boldMatch)}</span>
				</Pickitem>
			));
		}

		const dropdown = (
			<DropDown
				ref={c => this.dropdown = c}
				hasKeyboardEvents={false}
				restrictFocus={false}
				onSelect={this.onSelect}
			>
				<Picklist>
					{pickItems}
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

The above example illustrates how several props can be used to achieve your desired UX.

**`DropDownToggled.triggerClickAction` determines what happens when the user clicks on the trigger.**  By default, we toggle the dropdown's open state, but you can turn this off with "none" or use "open" to always open.

**If you want the focus to remain on the trigger once the dropdown is open**, you have to set the `DropDown.hasKeyboardEvents` and `DropDown.restrictFocus` props to `false` to ensure that focus does not shift to the dropdown.

**However, the combination of setting those props means that the dropdown no longer automatically opens.**  If you choose to go this route, you'll now need to manually open the dropdown by calling the `DropDownToggled.openDropDown` API.  The example above just does it on any keypress in the input, but this is not required, and the dropdown can be opened at any time.

**While this opens the dropdown, the arrow keys, escape key, etc no longer allow the user to navigate the dropdown.** The `DropDown.onKeyDown` API is a public API for this very reason.  Simply pass the keydown event to the DropDown and all normal keyboard handlers will take effect without moving focus from your trigger node.  Calling the public API is the equivalent of simulating a keydown event on the DropDown, so you get the same behavior as if the keydown did happen on the dropdown.
