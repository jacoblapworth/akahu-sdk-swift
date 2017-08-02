SelectBox
==========
A generic React UI component that renders a select box, which is meant to be a straight up replacement for the
`<select>` HTML element.

## Example
```js
<SelectBox
	value="Lapierre"
	name="select"
	buttonContent="Lapierre"
	label="Select a Bike"
>
	<SelectBoxOption id="1" value="1" value="Santa Cruz" onSelect={selectHandler}>
		Santa Cruz
	</SelectBoxOption>
	<SelectBoxOption id="2" value="2" value="Transition" onSelect={selectHandler}>
		Transition
	</SelectBoxOption>
	<SelectBoxOption id="3" value="3" value="Lapierre" selected={true} onSelect={selectHandler}>
		Lapierre
	</SelectBoxOption>
	<SelectBoxOption id="4" value="4" value="Surly" onSelect={selectHandler}>
		Surly
		</SelectBoxOption>
	<SelectBoxOption id="5" value="5" value="Kona" onSelect={selectHandler}>
		Kona
	</SelectBoxOption>
</SelectBox>
```

_SelectBox in closed state._

![SelectBox closed](example/SelectBox.png)

_SelectBox in open state_

![SelectBox open](example/SelectBoxOpen.png)

_Multi SelectBox in open state_

![Select Multi Box open](example/SelectBoxMultiOpen.png)

## Prop Types

### SelectBox

`label`: (String, Required) Input Label

`name`: (String, Required) Input Name

`placeholder`: (String, Optional) Placeholder text for the select-box input when props.type is `Search` */

`labelHidden`: (Boolean, Optional) Input Label visibility

`value`: (*, Required)  Value of the SelectBox. This value will be the input's value attribute, allowing forms to gather this information

`closeAfterSelection`: (Boolean, Optional) After making a selection, does the dropdown close? Defaults to true.

`buttonClasses`: (String, Optional) Additional classes to be applied to the button

`buttonContent`: (String, Optional) String to be displayed on the button. Is only required for SelectBox, not SearchBox

`containerClasses`: (String, Optional) Additional classes to be applied to the container

`dropDownClasses`: (String, Optional) Additional classes to be applied to the dropDown

`inputGroupClasses`: (String, Optional) Additional classes to be applied to the inputGroup

`labelClasses`: (String, Optional) Additional classes to be applied to the label

`inputClasses`: (String, Optional) Additional classes to be applied to the button or text-input

`onInputChange`: (Function, Optional) Callback to be executed after a SearchBox input change. Is required prop for SearchBox

`onInputFocus`: (Function, Optional) Callback to be executed after a SearchBox gets focus

`onInputBlur`: (Function, Optional) Callback to be executed after a SearchBox loses focus

`onDropdownHide`: (Function, Optional) Callback to be executed after the dropdown is hidden

`qaHook`: (String, Optional) A String which will render as html attribute `data-automationid='{String}' on the selectbox, with a suffixed version on SelectBox input & button.

`buttonVariant`: (String, Optional) An XUI button variant to use for the trigger button

`isTextTruncated`: (Boolean, Optional) Toggles the text truncation inside the trigger.

### SelectBoxOption

`truncatedText`: (Boolean, Optional) Restrict SelectBoxOption children which are strings to one line. Defaults to false

`onSelect`: (Function, Required) Callback to be executed after a selection is made

`optionClasses`: (String, Optional) Additional classes to be applied to the option insides

`isDisabled`: (Boolean, Optional) Render the option as disabled. Defaults to false

`value`: (*, Required) The value associated with this option

`isSelected`: (Boolean, Required) Defaults to false.

## Helpers

`TextHelpers`: Helper functions for creating text for buttonContent.

```js
<SelectBox
	buttonContent={TextHelpers.getText(['array', 'of', 'selected', 'values'], 'placeholder')}
/>
```
