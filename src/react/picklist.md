### What is a Picklist?

Picklist is a set of components that brings in the XUI styles for a list of items or Picklist. The Picklist and Pickitems are presentational components with a StatefulPicklist wrapper available to handle keyboard navigation on it's children.

#### Is this just a Menu and MenuItems?
A menu is often in the context of a dropdown or navigational menu so to avoid that assumption
we've named this picklist, a list of things you can pick from. It can be used in the context of a sidebar,
navigation, filtering, dropdowns etc.

#### Notes on Stateful Picklist
The StatefulPicklist is a component that wraps the Picklist to keep track of which element is highlighted and APIs to manipulate highlighting behavior.  These APIs are used by components like the dropdown to allow the user to navigate through the menu and select an item.  Detailed information on these APIs is displayed below.

### XUI Docs

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-picklist.html#picklist">Picklist</a></span>
	</div>
</div>

### Related
* [DropDown](#dropdown)

```
<Picklist>
	<Pickitem id="plain1" isSelected={true}>I literally come with nothing, I am just here to look pretty</Pickitem>
	<Pickitem id="plain2">Next Item</Pickitem>
	<Pickitem id="plain3">Another Item</Pickitem>
	<Pickitem id="plain4" href="http://xero.com">A Fourth Item</Pickitem>
	<Pickitem id="plain5">Last Item</Pickitem>
</Picklist>
```

### Horizontal vairant

```
<Picklist isHorizontal>
	<Pickitem id="plain1" isSelected shouldTruncate>
		Projects
	</Pickitem>
	<Pickitem id="plain2" shouldTruncate>
		Timesheets
	</Pickitem>
	<Pickitem id="plain3" shouldTruncate>
		Other things
	</Pickitem>
</Picklist>
```
