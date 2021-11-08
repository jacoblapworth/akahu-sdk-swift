<div class="xui-margin-vertical">
	<a href="../section-components-controls-checkbox.html" isDocLink>Checkbox in the XUI Documentation</a>
</div>

Enhanced version of HTML checkbox. Use in place of `<input type="checkbox" />`.

`XUICheckbox` supports properties for use with forms like the HTML checkbox input, including `isRequired`, `name`, and `value`.

## Examples

### Uncontrolled

`XUICheckbox` can be used as an uncontrolled component by omitting `isChecked` and (optionally) providing a `isDefaultChecked` property.

```jsx harmony
import XUICheckbox from '@xero/xui/react/checkbox';

<div>
  <XUICheckbox isDefaultChecked hintMessage="Hint text">
    Item 1
  </XUICheckbox>
  <XUICheckbox>Item 2</XUICheckbox>
  <XUICheckbox>Item 3</XUICheckbox>
</div>;
```

### Controlled

Controlled `XUICheckbox`s' presentation are driven by the two props, `isChecked` and `isIndeterminate`. You can hook into the `onChange` event to update them when the user interacts with the checkbox.

```jsx harmony
import { PureComponent } from 'react';

import XUICheckbox from '@xero/xui/react/checkbox';

const options = ['Cats', 'Dogs', 'Birds', 'Fish'];
const selectedStates = {
  ALL: 'ALL',
  INDETERMINATE: 'INDETERMINATE',
  NONE: 'NONE'
};

const values = object => Object.keys(object).reduce((values, key) => [...values, object[key]], []);

const getSelectedState = selectedItems => {
  const numberOfSelectedValues = values(selectedItems).filter(value => value).length;
  if (numberOfSelectedValues === 0) {
    return selectedStates.NONE;
  } else if (numberOfSelectedValues === options.length) {
    return selectedStates.ALL;
  }
  return selectedStates.INDETERMINATE;
};

class Example extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedItems: {},
      selectedState: selectedStates.NONE
    };

    this.onChange = this.onChange.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    this.setState(prevState => {
      const selectedItems = {
        ...prevState.selectedItems,
        [value]: !prevState.selectedItems[value]
      };
      return {
        selectedItems,
        selectedState: getSelectedState(selectedItems)
      };
    });
  }

  toggleAll() {
    this.setState(prevState => {
      const newSelectedState = prevState.selectedState === selectedStates.ALL ? false : true;
      return {
        selectedItems: options.reduce(
          (selectedItems, option) => ({
            ...selectedItems,
            [option]: newSelectedState
          }),
          {}
        ),
        selectedState: newSelectedState ? selectedStates.ALL : selectedStates.NONE
      };
    });
  }

  render() {
    const { selectedItems, selectedState } = this.state;
    return (
      <div>
        Which animals do you like?
        <div>
          <XUICheckbox
            isIndeterminate={selectedState === selectedStates.INDETERMINATE}
            isChecked={selectedState === selectedStates.ALL}
            onChange={this.toggleAll}
          >
            All
          </XUICheckbox>
          {options.map(option => (
            <XUICheckbox
              key={option}
              value={option}
              isChecked={selectedItems[option]}
              onChange={this.onChange}
            >
              {option}
            </XUICheckbox>
          ))}
        </div>
      </div>
    );
  }
}

<Example />;
```

### Range selection

Range selection allows users to select a range of checkboxes by holding the `Shift` key.

XUI components that come with checkboxes such as checkbox groups, picklists, and tables
have range selection built in.

To add this behaviour to your own components you will need to wrap the group of checkboxes in a single
`XUICheckboxRangeSelector`.

Checkboxes can be excluded from range selection with the `excludeFromRangeSelection` prop. We recommend
doing this for checkboxes that control other checkboxes (e.g. a checkbox that checks all other
checkboxes).

If you need more than one group of checkboxes nested under a single `XUICheckboxRangeSelector` you
can specify the group a checkbox belongs to with the `rangeSelectionGroup` prop.

```jsx harmony
import XUICheckbox, { XUICheckboxRangeSelector } from '@xero/xui/react/checkbox';

const Example = () => {
  const [selectedItems, setSelectedItems] = React.useState([false, false, false]);

  const toggleCheckbox = index => {
    setSelectedItems(previousState => {
      const newSelectedItems = [...previousState];
      newSelectedItems[index] = !selectedItems[index];
      return newSelectedItems;
    });
  };

  const toggleAll = () => {
    const newCheckedState = !selectedItems.every(item => item);

    setSelectedItems([newCheckedState, newCheckedState, newCheckedState]);
  };

  return (
    <XUICheckboxRangeSelector>
      <XUICheckbox
        excludeFromRangeSelection
        isChecked={selectedItems.every(item => item)}
        isIndeterminate={
          !selectedItems.every(item => item) && selectedItems.filter(item => item).length > 0
        }
        onChange={toggleAll}
      >
        All
      </XUICheckbox>
      <XUICheckbox isChecked={selectedItems[0]} onChange={() => toggleCheckbox(0)}>
        Item 1
      </XUICheckbox>
      <XUICheckbox isChecked={selectedItems[1]} onChange={() => toggleCheckbox(1)}>
        Item 2
      </XUICheckbox>
      <XUICheckbox isChecked={selectedItems[2]} onChange={() => toggleCheckbox(2)}>
        Item 3
      </XUICheckbox>
    </XUICheckboxRangeSelector>
  );
};

<Example />;
```

### Disabled

```jsx harmony
import XUICheckbox from '@xero/xui/react/checkbox';

<div>
  <XUICheckbox isDisabled>Unchecked</XUICheckbox>
  <XUICheckbox isDisabled isDefaultChecked>
    Checked
  </XUICheckbox>
  <XUICheckbox isDisabled isChecked={false} isIndeterminate>
    Indeterminate
  </XUICheckbox>
</div>;
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```jsx harmony
import { PureComponent } from 'react';
import XUICheckbox from '@xero/xui/react/checkbox';

class Example extends PureComponent {
  constructor() {
    this.state = {
      isIndeterminate: true
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({
      isIndeterminate: !this.state.isIndeterminate
    });
  }

  render() {
    return (
      <div>
        <XUICheckbox isReversed isDefaultChecked={false}>
          Unchecked
        </XUICheckbox>
        <XUICheckbox isReversed isDefaultChecked>
          Checked
        </XUICheckbox>
        <XUICheckbox
          isReversed
          isIndeterminate={this.state.isIndeterminate}
          onChange={this.onChange}
        >
          Indeterminate
        </XUICheckbox>
      </div>
    );
  }
}

<Example />;
```

It is also possible to use the `isLabelHidden` prop to visually hide the label, but we strongly recommend providing a label for accessibility purposes, even if it will be hidden.

### Custom Icons

`XUICheckbox` supports the use of a custom [`XUIIcon`](#icon) to style the presentation of the element.

`iconMain` is the icon object from `@xero/xui-icon` to render in place of a checkbox.

```jsx harmony
import starIcon from '@xero/xui-icon/icons/star';
import XUICheckbox from '@xero/xui/react/checkbox';

<div>
  <XUICheckbox isDefaultChecked iconMain={starIcon}>
    Favourite
  </XUICheckbox>
</div>;
```
