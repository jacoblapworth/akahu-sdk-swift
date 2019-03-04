The `StatefulPicklist` wraps the `Picklist` to keep track of which element is highlighted and can take care of highlighting behaviour within itself. It also Exposes these methods to control highlighting behavior from a wrapping component. A good example is `DropDown` which manages the users navigation on the menu and selecting an item. They're also available if a custom wrapper for `StatefulPicklist` is needed. Detailed information on the API can be found in the [DropDown section](#dropdown).

### Components Using StatefulPicklist
* [DropDown](#dropdown)
* [SelectBox, inherited from Dropdown](#select-box)
* [Autocompleter](#autocompleter)


### Using StatefulPicklist
In most cases you would be able to use a wrapper around the `StatefulPicklist`, such as the ones listed above.  However, for some cases you may need to roll your own. To understand how to correctly implement the component, you should be aware of what behaviours `StatefulPicklist` covers:

#### It Includes
* Manages state of highlighted items.
* Exposes API methods to set and find highlighted items.
* Handles mouse events on items.
* Hooks to use the keyboard navigation.

#### It Doesn't Include
* Managing state of selected items.
* Automatically hook up keyboard events.
* Focus of DOM elements.

### Example
A thin wrapper around the `StatefulPicklist` to demonstrate the bare minimum to build a working component.

```jsx
const Pickitem = require('../picklist/Pickitem').default;

class BasicStatefulPicklist extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedItem: 2
		}

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

	onKeyDown(event) {
		this._list.current && this._list.current.onKeyDown(event);
	}

	render () {
		return (
				<div
					id="spl-wrapper1"
					ref={this._rootNode}
					tabIndex={0}
					onKeyDown={this.onKeyDown}
				>
					<StatefulPicklist secondaryProps={{ role: null }} onSelect={this.onSelect} ref={this._list}>
						<Picklist secondaryProps={{ role: 'menu' }}>
							{[1, 2, 3, 4].map(i => {
								return (
									<Pickitem ariaRole='menuitem' id={`vertical_${i}`} key={i} isSelected={this.state.selectedItem === `vertical_${i}`}>
										{`Item ${i}`}
									</Pickitem>
									)
								})
							}
						</Picklist>
					</StatefulPicklist>
				</div>
			)
		}
};
<BasicStatefulPicklist />;
```

```
const Pickitem = require('../picklist/Pickitem').default;

class BasicHorizontalStatefulPicklist extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedItem: 2
		}

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

	onKeyDown(event) {
		this._list.current && this._list.current.onKeyDown(event);
	}

	render () {
		return (
				<div
					id="spl-wrapper2"
					ref={this._rootNode}
					tabIndex={0}
					onKeyDown={this.onKeyDown}
				>
					<StatefulPicklist secondaryProps={{ role: null }} isHorizontal onSelect={this.onSelect} ref={this._list}>
						<Picklist secondaryProps={{ role: 'menu' }} isHorizontal>
							{[1, 2, 3, 4].map(i => {
								return (
									<Pickitem ariaRole='menuitem' id={`horizontal_${i}`} key={i} isSelected={this.state.selectedItem === `horizontal_${i}`}>
										{`Item ${i}`}
									</Pickitem>
									)
								})
							}
						</Picklist>
					</StatefulPicklist>
				</div>
			)
		}
};
<BasicHorizontalStatefulPicklist />;
```

#### Key Things To Note
* **The wrapping element must be in focus** for the keyboard handling to work.
* You need to **hook in the keyDown event**, this is so it can be managed by the wrapper and not assume it should be called with every valid keyboard event. This is so certain keyDown events or DOM nodes can be filtered out by the custom wrapper. See the DropdownPanel for a good example of this.
* You need to **manage select state**. The `StatefulPicklist` provides an `onSelect` handler to let you know when an item has been selected. You will need to store this in your wrapper's state and pass this to the selected `Pickitem`s using the `isSelected` prop. This is because the `StatefulPicklist` can handle single or multiple item selections and the wrapper should determine which to use.
