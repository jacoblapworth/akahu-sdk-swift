`XUIStatefulPicklist` wraps `XUIPicklist` to keep track of which element is highlighted and can take care of highlighting behaviour within itself. It also Exposes these methods to control highlighting behaviour from a wrapping component. A good example is `XUIDropdown`, which manages the users navigation on the menu and selecting an item. They're also available if a custom wrapper for `XUIStatefulPicklist` is needed. Detailed information on the API can be found in the [dropdown section](#dropdown).

### Components using stateful picklist

- [Dropdown](#dropdown)
- [Select box, inherited from dropdown](#select-box)
- [Autocompleter](#autocompleter)

### Using stateful picklist

In most cases you would be able to use a wrapper around the `XUIStatefulPicklist`, such as the ones listed above. However, for some cases you may need to roll your own. To understand how to correctly implement the component, you should be aware of what behaviours `XUIStatefulPicklist` covers:

#### It includes

- Manages state of highlighted items.
- Exposes API methods to set and find highlighted items.
- Handles mouse events on items.
- Hooks to use the keyboard navigation.

#### It doesn’t include

- Managing state of selected items.
- Automatically hook up keyboard events.
- Focus of DOM elements.

### Example

A thin wrapper around `XUIStatefulPicklist` to demonstrate the bare minimum to build a working component.

```jsx harmony
import { useRef, useState } from 'react';
import XUIPicklist, { XUIPickitem, XUIStatefulPicklist } from '@xero/xui/react/picklist';

const items = [
  { id: 0, text: 'Personal details' },
  { id: 1, text: 'Employment information' },
  { id: 2, text: 'Payment information' },
  { id: 3, text: 'Payslips' }
];

const StatefulPicklistExample = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [highlightedId, setHighlightedId] = useState(null);

  const onSelect = (value, item) => {
    setSelectedItem(item.props.id);
  };

  const onHighlightChange = item => {
    setHighlightedId(item.props.id);
  };

  return (
    <div className="xui-panel" style={{ width: '300px' }}>
      <XUIStatefulPicklist isFocusable onHighlightChange={onHighlightChange} onSelect={onSelect}>
        <XUIPicklist secondaryProps={{ role: 'menu' }}>
          {items.map(item => {
            return (
              <XUIPickitem
                ariaRole="menuitem"
                id={item.id}
                isSelected={selectedItem === item.id}
                key={item.id}
              >
                {item.text}
              </XUIPickitem>
            );
          })}
        </XUIPicklist>
      </XUIStatefulPicklist>
    </div>
  );
};

<StatefulPicklistExample />;
```

```jsx harmony
import { useRef, useState } from 'react';
import XUIPicklist, { XUIPickitem, XUIStatefulPicklist } from '@xero/xui/react/picklist';

const items = [
  { id: 0, text: 'All' },
  { id: 1, text: 'FY 2020' },
  { id: 2, text: 'FY 2019' },
  { id: 3, text: 'FY 2018' }
];

const StatefulPicklistExample = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [highlightedId, setHighlightedId] = useState(null);

  const onSelect = (value, item) => {
    setSelectedItem(item.props.id);
  };

  const onHighlightChange = item => {
    setHighlightedId(item.props.id);
  };

  return (
    <div className="xui-panel">
      <XUIStatefulPicklist
        isFocusable
        isHorizontal
        onHighlightChange={onHighlightChange}
        onSelect={onSelect}
      >
        <XUIPicklist isHorizontal secondaryProps={{ role: 'menu' }}>
          {items.map(item => {
            return (
              <XUIPickitem
                ariaRole="menuitem"
                id={item.id}
                isSelected={selectedItem === item.id}
                key={item.id}
              >
                {item.text}
              </XUIPickitem>
            );
          })}
        </XUIPicklist>
      </XUIStatefulPicklist>
    </div>
  );
};

<StatefulPicklistExample />;
```

#### Key Things To Note

- **The wrapping element must be in focus** for the keyboard handling to work.
- You need to **hook in the `keyDown` event** so it can be managed by the wrapper and not assume it should be called with every valid keyboard event. This is so certain `keyDown` events or DOM nodes can be filtered out by the custom wrapper. See [`XUIDropdownPanel`](#xuidropdownpanel) for a good example of this.
- You need to **manage select state**. `XUIStatefulPicklist` provides an `onSelect` handler to let you know when an item has been selected. You will need to store this in your wrapper's state and pass this to the selected `XUIPickitem`s using the `isSelected` prop. This is because the `XUIStatefulPicklist` can handle single or multiple item selections and the wrapper should determine which to use.
