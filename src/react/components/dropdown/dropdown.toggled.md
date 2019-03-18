`DropDownToggled` connects the trigger element with the dropdown, in terms of behavior and wrapping the two elements for positioning.

## Basic Use Cases

### Using with `Picklist`

If you want standard `Picklist` behaviour (close on select, keyboard handlers, etc) then you **must** have `Picklist` as an immediate child of the `DropDown`. If you are missing these features, make sure that you are correctly using the `Picklist` component.

```jsx harmony
import { Component } from 'react';
import XUIButton, { XUIButtonCaret } from '../../button';
import Picklist, { Pickitem } from '../../picklist';
import DropDown, { DropDownToggled } from '../../dropdown';

const isSelected = (item, selectedIds) =>
  item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);

function createItems(item, selectedId) {
  if (Array.isArray(item)) {
    return item.map(i => createItems(i, selectedId));
  }

  return (
    <Pickitem
      {...item.props}
      value={item.props.id}
      key={item.props.id}
      isSelected={isSelected(item, selectedId)}
    >
      {item.text}
    </Pickitem>
  );
}

const toggledItems = [
  'Apricot',
  'Banana',
  'Cherry',
  'Dragon Fruit',
  'Eggplant',
  'Fennel',
  'Grapefruit',
  'Honeydew',
  'Iceberg Lettuce',
  'Jackfruit',
  'Kiwifruit',
  'Lime',
  'Mango',
  'Nectarine',
  'Orange',
  'Pineapple',
  'Quince',
  'Rapberry',
  'Starfruit',
  'Tomato',
  'Uglifruit',
  'Valencia Orange',
  'Watermelon',
  'Xi gua',
  'Yellow quash',
  'Zucchini',
].map((text, id) => {
  return { props: { id }, text };
});

class ToggledDropDown extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selectedId: null,
    };
    this.logOpen = this.logOpen.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    this.setState({
      selectedId: value,
    });
  }

  logOpen() {
    console.log('user wants to open the dropdown');
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
        <Picklist>{createItems(toggledItems, this.state.selectedId)}</Picklist>
      </DropDown>
    );
    return (
      <DropDownToggled
        className="exampleClass"
        onOpen={this.logOpen}
        trigger={trigger}
        dropdown={dropdown}
        qaHook="dropdown-example"
      />
    );
  }
}
<ToggledDropDown />;
```

### Multiselect `Picklist`

```jsx harmony
import { Component } from 'react';
import XUIButton, { XUIButtonCaret } from '../../button';
import Picklist, { Pickitem } from '../../picklist';
import DropDown, { DropDownToggled } from '../../dropdown';

const items = [
  { id: 'a', text: 'First' },
  { id: 'b', text: 'Second' },
  { id: 'c', text: 'Third' },
  { id: 'd', text: 'Fourth' },
];

class MultiselectExample extends Component {
  constructor(...args) {
    super(...args);

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
    );
    const dropdown = (
      <DropDown onSelect={this.onSelect}>
        <Picklist>
          {items.map(item => (
            <Pickitem
              key={item.id}
              id={item.id}
              value={item.id}
              isSelected={selected[item.id]}
              isMultiselect
            >
              {item.text} Option
            </Pickitem>
          ))}
        </Picklist>
      </DropDown>
    );
    return <DropDownToggled trigger={trigger} dropdown={dropdown} closeOnSelect={false} />;
  }
}
<MultiselectExample />;
```

#### Props required for this behaviour

- `closeOnSelect=false` -> `DropDownToggled`: Allows user to select multiple items without the dropdown closing
- `isMultiselect=true` -> `Pickitem`: Renders the `Pickitem` as a checkbox

## Complex examples

Although using `DropDown` with `Picklist` provides the default behaviour, the API is configurable enough to handle almost any content.

### Dropdown with a date picker

```jsx harmony
import { Component } from 'react';
import XUIButton from '../../button';
import DropDown, { DropDownToggled } from '../../dropdown';
import XUIDatePicker from '../../datepicker';

const today = new Date();
const months = [
  'Jan',
  'Feb',
  'March',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatDate = date => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

class SimpleDropDownDatePicker extends Component {
  constructor(...args) {
    super(...args);
    this.datepicker = React.createRef();
    this.ddt = React.createRef();

    this.state = {
      selectedDate: today,
      currentMonth: new Date(),
    };

    this.onSelectDate = this.onSelectDate.bind(this);
    this.focusDatePicker = this.focusDatePicker.bind(this);
  }

  focusDatePicker() {
    this.datepicker.current.focus();
  }

  onSelectDate(day) {
    this.setState({
      selectedDate: day,
      currentMonth: day,
    });
    this.ddt.current.closeDropDown();
  }

  render() {
    const { currentMonth, selectedDate } = this.state;
    const dropdown = (
      <DropDown>
        <XUIDatePicker
          ref={this.datepicker}
          displayedMonth={currentMonth}
          onSelectDate={this.onSelectDate}
          selectedDate={selectedDate}
        />
      </DropDown>
    );
    const trigger = (
      <XUIButton>{selectedDate == null ? 'Select a date' : formatDate(selectedDate)}</XUIButton>
    );
    return (
      <DropDownToggled
        ref={this.ddt}
        trigger={trigger}
        dropdown={dropdown}
        closeOnTab={false}
        restrictToViewPort={false}
        onOpenAnimationEnd={this.focusDatePicker}
      />
    );
  }
}
<SimpleDropDownDatePicker />;
```

As mentioned, the above example is not using dropdown with its optimised use case so we need to manually handle some interactions. See the key points below for more details.

#### Props required for this behaviour

- `restrictToViewPort=false` -> `DropDownToggled`: Ensure that the user is never required to scroll the contents of the date picker. Scrolling is fine for lists. But scrolling a date picker is a bad user experience. This means that the date picker might hang off the edge of the screen or slightly cover the button, but this is preferable to having to scroll inside of the dropdown.
- `closeOnTab=false` -> `DropDownToggled`: Enables user to use the tab key to navigate to the next/previous month buttons or the selects controlling the month and year.
- `onOpenAnimationEnd=function` -> `DropDownToggled`: This function should call `XUIDatePicker.focus` as focus is required to enable keyboard navigation on the datepicker.
- `onSelectDate` -> `XUIDatePicker`: This function should call `DropDownToggled.closeDropDown` manually close the dropdown when appropriate.

### DropDown with Text Input Trigger

It is highly recommended that you use [`Autocompleter`](#autocompleter) to implement this pattern if it fits your use case. It handles these customisations by default.

```jsx harmony
import 'array.prototype.find';
import { Component } from 'react';
import DropDown, { DropDownToggled } from '../../dropdown';
import XUITextInput from '../../textinput';
import { boldMatch, decorateSubStr, XUIAutocompleterEmptyState } from '../../autocompleter';
import Picklist, { Pickitem } from '../../picklist';

const items = [
  'Apricot',
  'Banana',
  'Cherry',
  'Dragon Fruit',
  'Eggplant',
  'Fennel',
  'Grapefruit',
  'Honeydew',
  'Iceberg Lettuce',
  'Jackfruit',
  'Kiwifruit',
  'Lime',
  'Mango',
  'Nectarine',
  'Orange',
  'Pineapple',
  'Quince',
  'Rapberry',
  'Starfruit',
  'Tomato',
  'Uglifruit',
  'Valencia Orange',
  'Watermelon',
  'Xi gua',
  'Yellow quash',
  'Zucchini',
].map((text, id) => {
  return { id, text };
});

class InputTriggerExample extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      inputValue: '',
      selectedId: null,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.ddt = React.createRef();
  }

  onInputChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  onInputKeyDown(event) {
    if (this.ddt.current.isDropDownOpen() && this.dropdown != null) {
      this.dropdown.onKeyDown(event);
    } else {
      this.ddt.current.openDropDown();
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
      <XUITextInput
        label="dropdown with text input trigger"
        placeholder="Type Here"
        value={inputValue}
        onChange={this.onInputChange}
        onKeyDown={this.onInputKeyDown}
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
      pickItems = (
        <XUIAutocompleterEmptyState id="noItems">No Fruit Found</XUIAutocompleterEmptyState>
      );
    } else {
      pickItems = visibleItems.map(item => (
        <Pickitem key={item.id} id={item.id} value={item.id} isSelected={selectedId === item.id}>
          <span>{decorateSubStr(item.text, inputValue, boldMatch)}</span>
        </Pickitem>
      ));
    }

    const dropdown = (
      <DropDown
        ref={d => (this.dropdown = d)}
        hasKeyboardEvents={false}
        restrictFocus={false}
        onSelect={this.onSelect}
      >
        <Picklist>{pickItems}</Picklist>
      </DropDown>
    );

    return (
      <DropDownToggled
        ref={this.ddt}
        trigger={trigger}
        dropdown={dropdown}
        triggerClickAction="none"
      />
    );
  }
}

<InputTriggerExample />;
```

#### Props required for this behaviour

- `triggerClickAction="none"/"open"` -> `DropDownToggled`: By default trigger clicks will toggle open state. When using with an input, click should only open the dropdown or do nothing.
- `hasKeyboardEvents=false` -> `DropDown`: Required to keep focus on the input while typing.
- `restrictFocus=false` -> `DropDown`: Required to keep focus on the input while typing.
- `onKeyDown=function` -> `XUITextInput`:
  - If `triggerClickAction="none"`, you should open the dropdown here by calling `DropDownToggled.openDropDown`.
  - `keydown` events should be passed down to `DropDown.onKeyDown` to default `DropDown` keyboard navigation such as closing on `esc`, `Picklist` navigation etc.

### Inline display

We've added the ability for DropDown to position the DropDownPanel inline with your content, for improved accessibility and to resolve a few tough positioning scenarios, like dropdowns in a scrolling modal, or preferring to align the dropdown to the right of the trigger. To use this, set `isLegacyDisplay` to false on `DropDownToggled` and see the accompanying related props.
