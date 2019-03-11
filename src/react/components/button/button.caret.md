The trigger to open a [`<DropDownToggled>`](#dropdown) is often a Button. We provide a `<XUIButtonCaret />` component so you don't need to manually add a caret icon each time.

Check out the [Dropdown](#dropdown) examples to see Buttons being used as triggers.

```jsx harmony
import XUIButton, { XUIButtonCaret } from "../../button";

<XUIButton>
	Dropdown <XUIButtonCaret />
</XUIButton>
```

But you can just as easily drop in other icons too.

```jsx harmony
import icon from "@xero/xui-icon/icons/checkbox-check";
import XUIButton from '../../button';
import XUIIcon from "../../icon";

<XUIButton>
	Checkbox <XUIIcon icon={icon} />
</XUIButton>
```
