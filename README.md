xui-button
==========

A React UI component that creates buttons from the [XUI UI library](https://github.dev.xero.com/pages/Style/xui/section-buttons.html). This includes single buttons and grouped buttons

## Installation

```bash
$ bower install --save git@github.dev.xero.com:FutureRobot/xui-button.git
```

### XUI Button Properties
`isDisabled`: (Boolean, Optional) Determines if the button is disabled or not. Set to false by default

`isGrouped`: (Boolean, Optional) If this button is part of a parent button group

`onClick`: (Function, Required) Bind a function to fire when the button is clicked

`text`: (String, Required) Sets the button text

`variant`: (String, Optional) Determines what the purpose of this button is. `default`, `primary`, or `create`. Defaults to `default`

`size`: (String, Optional) Modifier for the size of the button. `default`, `small`, or `full-width`. Defaults to `default`

`type`: (String, Optional) The HTML type of this button. `button`, or `link`. Defaults to `button`

`className`: (String, Optional) Any extra modifier classes you want on the button

`href`: (String, Optional) If this button is type `link` then this will be the hyperlink reference. Else ignored

`qaHook`: (String, Optional) An optional data attribute for QA automation hooks

`target`: (String, Optional) The `target` attribute for the button if the type is `link`. Else ignored

`title`: (String, Optional) The `title` attribute for this button

### Example
```js
import XUIButton, {XUIButtonGroup} from 'xui-button';

<XUIButton
	isDisabled={true}
	onChange={handleClick()}
	variant={'secondary'}
	size={'full-width'}
	text='Click me'></XUIButton>

<XUIButtonGroup>
	<XUIButton
		isGrouped={true}
		text='Grouped one'></XUIButton>
	<XUIButton
		isGrouped={true}
		text='Grouped two'></XUIButton>
</XUIButtonGroup>

```
