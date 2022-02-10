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
import XUIPicklist, { XUIStatefulPicklist, XUIPickitem } from '@xero/xui/react/picklist';

class BasicStatefulPicklist extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedItem: 2,
      highlightedId: null
    };

    this.onHighlightChange = this.onHighlightChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this._rootNode = React.createRef();
    this._list = React.createRef();
  }

  onSelect(value, item) {
    this.setState({
      selectedItem: item.props.id
    });
    this._rootNode.current && this._rootNode.current.focus();
  }

  onHighlightChange(item) {
    this.setState({
      highlightedId: item.props.id
    });
  }

  onKeyDown(event) {
    this._list.current && this._list.current.onKeyDown(event);
  }

  render() {
    const { highlightedId } = this.state;
    return (
      <div
        aria-activedescendant={highlightedId}
        id="spl-wrapper1"
        onKeyDown={this.onKeyDown}
        ref={this._rootNode}
        role="group"
        tabIndex={0}
      >
        <XUIStatefulPicklist
          secondaryProps={{ role: null }}
          onHighlightChange={this.onHighlightChange}
          onSelect={this.onSelect}
          ref={this._list}
        >
          <XUIPicklist secondaryProps={{ role: 'menu' }}>
            {[1, 2, 3, 4].map(i => {
              return (
                <XUIPickitem
                  ariaRole="menuitem"
                  id={`vertical_${i}`}
                  key={i}
                  isSelected={this.state.selectedItem === `vertical_${i}`}
                >
                  {`Item ${i}`}
                </XUIPickitem>
              );
            })}
          </XUIPicklist>
        </XUIStatefulPicklist>
      </div>
    );
  }
}
<BasicStatefulPicklist />;
```

```jsx harmony
import XUIPicklist, { XUIStatefulPicklist, XUIPickitem } from '@xero/xui/react/picklist';

class BasicHorizontalStatefulPicklist extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedItem: 2,
      highlightedId: null
    };

    this.onSelect = this.onSelect.bind(this);
    this.onHighlightChange = this.onHighlightChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this._rootNode = React.createRef();
    this._list = React.createRef();
  }

  onSelect(value, item) {
    this.setState({
      selectedItem: item.props.id
    });
    this._rootNode.current && this._rootNode.current.focus();
  }

  onHighlightChange(item) {
    this.setState({
      highlightedId: item.props.id
    });
  }

  onKeyDown(event) {
    this._list.current && this._list.current.onKeyDown(event);
  }

  render() {
    const { highlightedId } = this.state;
    return (
      <div
        aria-activedescendant={highlightedId}
        id="spl-wrapper2"
        onKeyDown={this.onKeyDown}
        ref={this._rootNode}
        role="group"
        tabIndex={0}
      >
        <XUIStatefulPicklist
          secondaryProps={{ role: null }}
          isHorizontal
          onHighlightChange={this.onHighlightChange}
          onSelect={this.onSelect}
          ref={this._list}
        >
          <XUIPicklist secondaryProps={{ role: 'menu' }} isHorizontal>
            {[1, 2, 3, 4].map(i => {
              return (
                <XUIPickitem
                  ariaRole="menuitem"
                  id={`horizontal_${i}`}
                  key={i}
                  isSelected={this.state.selectedItem === `horizontal_${i}`}
                >
                  {`Item ${i}`}
                </XUIPickitem>
              );
            })}
          </XUIPicklist>
        </XUIStatefulPicklist>
      </div>
    );
  }
}
<BasicHorizontalStatefulPicklist />;
```

#### Key Things To Note

- **The wrapping element must be in focus** for the keyboard handling to work.
- You need to **hook in the `keyDown` event** so it can be managed by the wrapper and not assume it should be called with every valid keyboard event. This is so certain `keyDown` events or DOM nodes can be filtered out by the custom wrapper. See [`XUIDropdownPanel`](#xuidropdownpanel) for a good example of this.
- You need to **manage select state**. `XUIStatefulPicklist` provides an `onSelect` handler to let you know when an item has been selected. You will need to store this in your wrapper's state and pass this to the selected `XUIPickitem`s using the `isSelected` prop. This is because the `XUIStatefulPicklist` can handle single or multiple item selections and the wrapper should determine which to use.
