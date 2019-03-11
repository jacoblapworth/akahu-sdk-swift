Switches can be grouped together, making it easier to include them alongside inputs and other form elements.

The touch target for Switches in a group is the entire "row" of the Switch Group.

```jsx harmony
import XUISwitch, { XUISwitchGroup } from '../../switch';

<XUISwitchGroup
	hintMessage="Grouped switches can have hints"
>
	<XUISwitch>Switch it up</XUISwitch>
</XUISwitchGroup>
```

```jsx harmony
import XUISwitch, { XUISwitchGroup } from '../../switch';

<XUISwitchGroup
	label="Birds of New Zealand"
	isInvalid
	validationMessage="Grouped switches can have validation"
>
	<XUISwitch isReversed isDefaultChecked>Tūī</XUISwitch>
	<XUISwitch isReversed>Pīwakawaka</XUISwitch>
	<XUISwitch isReversed>Ruru</XUISwitch>
	<XUISwitch isReversed isDisabled>Moa</XUISwitch>
</XUISwitchGroup>
```

