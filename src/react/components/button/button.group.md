Buttons can be grouped together (e.g. if their actions are all related) by using a `<XUIButtonGroup>`.
To disable an entire button group, you must add the `isDisabled` prop to each button in the group, not to the `<XUIButtonGroup>` itself.

```
	<XUIButtonGroup>
		<XUIButton>One</XUIButton>
		<XUIButton>Two</XUIButton>
		<XUIButton>Three</XUIButton>
	</XUIButtonGroup>

```
