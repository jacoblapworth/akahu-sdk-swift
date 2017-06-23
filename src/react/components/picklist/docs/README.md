Picklist
========
![](https://img.shields.io/badge/XUI-^10.16.0-blue.svg)
![](https://img.shields.io/badge/React-^15.5.4-blue.svg)

A component that brings in the XUI styles for a list of items or Picklist. The Picklist and Pickitems are presentational components with a StatefulPicklist wrapper available to handle keyboard navigation on it's children.

Is this just a Menu and MenuItems?
--
A menu is often in the context of a dropdown or navigational menu so to avoid that assumption
we've named this picklist, a list of things you can pick from. It can be used in the context of a sidebar,
navigation, filtering, dropdowns etc.

Component Dependencies
--
`XUI Checkbox` Used in Pickitem when the 'multiselect' prop is true.

Stateful Picklist
--
The StatefulPicklist is a component that wraps the Picklist to keep track of which element is highlighted and APIs to
manipulate highlighting behavior.  These APIs are used by components like the dropdown to allow the user to navigate
through the menu and select an item.

#### API Methods

`highlightNext`: Adds the highlight class to the next item in the menu. It will navigate over the menu groups so if the next item is in a different group this is handled.
Also if the last item in the menu is the current item, the first item in the menu will be the next item to be highlighted.

`highlightPrevious`: Adds the highlight class to the previous item in the group. Again traversing over the DropDownListBox Groups and if the first item in the list is the current item the previous will be the very last item in that list.

`highlightOption`: This function allows you to specify a certain item to highlight if necessary. For example, if the first item in the menu should be highlighted when the Dropdown, you can use this method to do that.

`selectHighlighted`: This will apply the select classes to the current item highlighted.

`findItemById`: Each child will be given a unique id if not provided, this method will use the Virtual DOM to find that item and return the item if found. Null will be returned if it cannot be found.

## Example
--

```js
import React from 'react';
import Picklist, { Pickitem, StatefulPicklist } from '@xero/xui/react/picklist';

class PicklistExample extends Component {
	constructor(){
		super();

		this.state = {
			selectedItems: null
		};

		this.onOptionSelect = this.onOptionSelect.bind(this);
	}

	onOptionSelect(value, item){
		const smp = this;

		smp.setState({
			selectedItem: item
		});
	}

	isItemSelected(id){
		const smp = this;

		return smp.state.selectedItem && smp.state.selectedItem.props.id === id;
	}

	render(){
		const smp = this;

		return (
			<StatefulPicklist onSelect={smp.onOptionSelect}>
				<Picklist>
					<Pickitem id='1' className="item" isSelected={smp.isItemSelected('1')}>
						Item 1
					</Pickitem>
					<Pickitem id='2' isSelected={smp.isItemSelected('2')}>
						Item 2
					</Pickitem>
					<Pickitem isSelected={smp.isItemSelected('3')}>
						Item 3
					</Pickitem>
					<Pickitem id='4' isSelected={smp.isItemSelected('4')}>
						Item 4
					</Pickitem>
				</Picklist>
			</StatefulPicklist>
		);
	}
}
```

## Prop Types

### NestedPicklist
`qaHook`: (string, Optional)

`children`: (node, Optional)

`className`: (string, Optional)

`secondaryProps`: (object, Optional, Default={
    role: "group"
})

`_isGroup`: (Optional, Default=true)


### NestedPicklistContainer
`children`: (node, Optional)

`qaHook`: (string, Optional)

`id`: (union, Required)

`className`: (string, Optional)

`open`: (bool, Optional, Default=false)

`onOpen`: (func, Optional)

`onClose`: (func, Optional)

`secondaryProps`: (object, Optional, Default={
    role: 'treeitem'
})

`_isGroupContainer`: (Optional, Default=true)


### NestedPicklistTrigger
`children`: (node, Optional)

`qaHook`: (string, Optional)

`id`: (union, Required)

`className`: (string, Optional)

`isHighlighted`: (bool, Optional, Default=false)

`isSelected`: (bool, Optional)

`onClick`: (func, Optional)

`onMouseOver`: (func, Optional)

`secondaryProps`: (object, Optional, Default={
    "aria-label": "Toggle submenu",
    role: "button"
})

`split`: (Optional, Default=false)

`_isMenuItem`: (Optional, Default=true)

`_isGroupTrigger`: (Optional, Default=true)


### Pickitem
`children`: (node, Optional)

`className`: (string, Optional)

`id`: (union, Required)

`isSelected`: (bool, Optional, Default=false) true if the item is selected

`isHighlighted`: (bool, Optional) true if the item is highlighted

`onClick`: (func, Optional) callback when the pick item is clicked.

`onBlur`: (func, Optional) callback on blur of the pick item

`onFocus`: (func, Optional) callback on focus of the pick item

`onKeyDown`: (func, Optional) callback on keydown of the pick item

`onSelect`: (func, Optional) callback when this item is selected by a parent component

`href`: (string, Optional)  to be used in child, will render an a tag if used and button if not

`ariaRole`: (string, Optional, Default='option') defaults to `option` for the aria role attribute, but can be defined for other uses.

`value`: (any, Optional) The value associated with this PickItem which will be passed to the onSelect callbacks here and in the StatefulPicklist

`disableSelectedStyles`: (bool, Optional, Default=false) false by default, for nested children such as checkboxes, icons or groups selected styles should be disabled.

`multiselect`: (bool, Optional) @property {Boolean} [multiselect=false]false by default, when true a checkbox will be added to the layout of the child component.

`checkboxClassName`: (string, Optional) @property {String} [checkboxClassName]Means classes can be passed toe the XUICheckbox component in PickItemBody.

`qaHook`: (string, Optional) the automation-id to add to the item

`isDisabled`: (bool, Optional, Default=false) false by default, the disabled behaviour and styles are applied when this is true.

`isSplit`: (bool, Optional, Default=false) Whether or not this pickitem sits next to a NestedPicklistToggle

`ariaLabel`: (string, Optional) optional label to add to a pickitem

`target`: (string, Optional)  a link is preferred, this target prop can be used on the <a> tag

`_isMenuItem`: (Optional, Default=true)


### PickitemBody
`children`: (node, Optional)

`isSelected`: (bool, Optional)

`multiselect`: (bool, Optional)

`href`: (string, Optional)

`checkboxClassName`: (string, Optional)

`onClick`: (func, Optional)

`onKeyDown`: (func, Optional)

`onMouseOver`: (func, Optional)

`target`: (string, Optional)


### Picklist
`children`: (node, Optional)

`className`: (string, Optional)

`id`: (string, Optional)

`onKeyDown`: (func, Optional)

`onMouseDown`: (func, Optional)

`secondaryProps`: (object, Optional, Default={
    role:"group"
})


### StatefulPicklist
`children`: (node, Optional)

`className`: (string, Optional)

`qaHook`: (string, Optional)

`ignoreKeyboardEvents`: (array, Optional, Default=[]) Pass in an array of keydown keycodes to be ignored from dropdown behaviour.

`id`: (string, Optional) id of the list

`onSelect`: (func, Optional) Enables a generalised callback when an item has been selected.

`canFocus`: (bool, Optional, Default=false) Whether or not the user should be allowed to tab to this component

`onHighlightChange`: (func, Optional) callback when the highlighted element has changed.

`secondaryProps`: (object, Optional, Default={
    role:"tree"
}) An object of props that can be spread on the stateful picklist, useful for aria attributes.

`hidden`: (Optional, Default=false)
