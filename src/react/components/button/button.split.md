A split button is used where you have a primary action, but want to group it with a dropdown trigger for secondary actions.
The `<XUISplitButtonGroup>` component helps you out by propagating the `isDisabled` and the `variant` props from the parent component down to the button children.

A Split Button behaves differently to a Button Group in that it can only be disabled at the top level — you can't disable only part of the button.

```
// try setting `isDisabled={true}`, or change the variant, and see how both buttons are disabled

<XUISplitButtonGroup variant="primary" isDisabled={false} >
	<XUIButton>Split Button</XUIButton>
	<XUISplitButton />
</XUISplitButtonGroup>
```
