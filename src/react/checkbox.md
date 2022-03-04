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
  <span className="xui-text-label xui-fieldlabel-layout" id="uncontrolledCheckbox">
    Quote title
  </span>
  <div aria-labelledby="uncontrolledCheckbox">
    <XUICheckbox isDefaultChecked>Use project name</XUICheckbox>
  </div>
</div>;
```

### Controlled

Controlled `XUICheckbox`s' presentation are driven by the two props, `isChecked` and `isIndeterminate`. You can hook into the `onChange` event to update them when the user interacts with the checkbox.

```jsx harmony
import { useState } from 'react';
import XUICheckbox from '@xero/xui/react/checkbox';

const options = ['Draft', 'In progress', 'Closed'];
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

const RangeExample = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedState, setSelectedState] = useState(selectedStates.NONE);

  const onChange = event => {
    const value = event.target.value;
    const newSelectedItems = { ...selectedItems, [value]: !selectedItems[value] };

    setSelectedItems(newSelectedItems);
    setSelectedState(getSelectedState(newSelectedItems));
  };

  const toggleAll = () => {
    const newSelectedState = selectedState === selectedStates.ALL ? false : true;
    const newSelectedItems = options.reduce(
      (selectedItems, option) => ({ ...selectedItems, [option]: newSelectedState }),
      {}
    );

    setSelectedItems(newSelectedItems);
    setSelectedState(newSelectedState ? selectedStates.ALL : selectedStates.NONE);
  };

  return (
    <div>
      <span className="xui-text-label xui-fieldlabel-layout" id="controlledCheckboxes">
        Project state
      </span>
      <div aria-labelledby="controlledCheckboxes" role="group">
        <XUICheckbox
          isChecked={selectedState === selectedStates.ALL}
          isIndeterminate={selectedState === selectedStates.INDETERMINATE}
          onChange={toggleAll}
        >
          All
        </XUICheckbox>
        {options.map(option => (
          <XUICheckbox
            isChecked={selectedItems[option]}
            key={option}
            onChange={onChange}
            value={option}
          >
            {option}
          </XUICheckbox>
        ))}
      </div>
    </div>
  );
};

<RangeExample />;
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

const CheckboxExample = () => {
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
    <div>
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
          Draft
        </XUICheckbox>
        <XUICheckbox isChecked={selectedItems[1]} onChange={() => toggleCheckbox(1)}>
          In progress
        </XUICheckbox>
        <XUICheckbox isChecked={selectedItems[2]} onChange={() => toggleCheckbox(2)}>
          Closed
        </XUICheckbox>
      </XUICheckboxRangeSelector>
    </div>
  );
};

<CheckboxExample />;
```

### Disabled

```jsx harmony
import XUICheckbox from '@xero/xui/react/checkbox';

<div>
  <span className="xui-text-label xui-fieldlabel-layout" id="disabledCheckboxes">
    Project state
  </span>
  <div aria-labelledby="disabledCheckboxes" role="group">
    <XUICheckbox isDisabled isIndeterminate>
      All
    </XUICheckbox>
    <XUICheckbox isDisabled>Draft</XUICheckbox>
    <XUICheckbox isDisabled>In Progress</XUICheckbox>
    <XUICheckbox isDefaultChecked isDisabled>
      Closed
    </XUICheckbox>
  </div>
</div>;
```

### Reversed labels

Use the `isReversed` prop to have the label appear to the left of the checkbox element.

```jsx harmony
import { useState } from 'react';
import XUICheckbox from '@xero/xui/react/checkbox';

<div>
  <span className="xui-text-label xui-fieldlabel-layout" id="reversedCheckboxes">
    Quote title
  </span>
  <div aria-labelledby="reversedCheckboxes">
    <XUICheckbox isReversed>Use project name</XUICheckbox>
  </div>
</div>;
```

It is also possible to use the `isLabelHidden` prop to visually hide the label, but we strongly recommend providing a label for accessibility purposes, even if it will be hidden.

### Custom Icons

`XUICheckbox` supports the use of a custom [`XUIIcon`](#icon) to style the presentation of the element.

`iconMain` is the icon object from `@xero/xui-icon` to render in place of a checkbox.

```jsx harmony
import starIcon from '@xero/xui-icon/icons/star';
import XUICheckbox from '@xero/xui/react/checkbox';

<XUICheckbox iconMain={starIcon} isDefaultChecked>
  Balance Sheet
</XUICheckbox>;
```
