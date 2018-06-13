The trigger to open a [`<DropDownToggled>`](#dropdown) is often a Button. We provide a `<XUIButtonCaret />` component so you don't need to manually add a caret icon each time.

Check out the [Dropdown](#dropdown) examples to see Buttons being used as triggers.

```jsx
	<XUIButton>
		Dropdown <XUIButtonCaret />
	</XUIButton>
```

But you can just as easily drop in other icons too.

```jsx
	const XUIIcon = require('../icon/XUIIcon').default;
	const icon = require('@xero/xui-icon/icons/checkbox-check').default;
	<XUIButton>
		Checkbox <XUIIcon icon={icon} />
	</XUIButton>
```
