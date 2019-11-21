<div class="xui-margin-vertical">
	<a href="../section-components-collectinginput-dropdowns.html" isDocLink>Dropdown in the XUI Documentation</a>
</div>

A set of components used to associate a trigger (button, text input etc) with a popup containing content. It can handle any content such as [DatePickers](#datepicker) or forms. They provide the user similar behaviour to a native `<select />` element.

This is a set of components that can be used to associate a trigger (button, text input,etc) with a popup containing content.

Using a [`Picklist`](#picklist) in `DropDown` gives behaviour similar to a `select` HTML element. But `DropDown` can accommodate any content from [`DatePicker`](#datepicker) to forms. To use dropdowns, you should create a trigger element and a dropdown element, then pass both as props to `DropDownToggled`.

You may find one of these simpler components meets your requirements:

- [`SelectBox`](#select-box) A simplified wrapper for `DropDown` and `DropDownToggled`, acts like a `<select/>` element
- [`Autocompleter`](#autocompleter) Has a text input for a trigger and allows the user to search through and select from a list of items.

### Terminology

Dropdowns are deceptively complex, so it's important to understand the terms used throughout this documentation.

#### DropDown

This is the container for the elements that are conditionally shown on the page. It's a positioned element that floats on top of most other content. Examples of content include the selectable items in a `SelectBox` or the `XUIDatePicker` calendar paired up with a text input.

#### Trigger

The trigger is the element that the user interacts with to open or close the dropdown. Examples include the button that opens the selectable list in a `SelectBox` or the text input that users type into in order to search for items in `Autocompleter`.
