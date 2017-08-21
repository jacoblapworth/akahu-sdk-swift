A split button is used the present a primary action coupled with a dropdown trigger for secondary actions.
The `<XUISplitButtonGroup>` component will inherit the `isDisabled` and the `variant` props from the parent component down to the button children.

A split button can only be completely disabled - you cannot disable only one part of the button

```
// try setting `isDisabled={true}`, or change the variant, and see how both buttons are disabled

<XUISplitButtonGroup variant="primary" isDisabled={false} >
	<XUIButton>Split Button</XUIButton>
	<XUISplitButton />
</XUISplitButtonGroup>
```
