Buttons can be grouped together (e.g. if their actions are all related) by using a `<XUIButtonGroup>`.

To disable an entire button group, you must add the `isDisabled` prop to each button in the group, not to the `<XUIButtonGroup>` itself.

```
	<XUIButtonGroup qaHook="numbered-buttongroup">
		<XUIButton>One</XUIButton>
		<XUIButton>Two</XUIButton>
		<XUIButton>Three</XUIButton>
	</XUIButtonGroup>
```

To set the size of an entire button group, you can set the `size` prop on `<XUIButtonGroup>`.

```
	<XUIButtonGroup qaHook="numbered-buttongroup" size="small">
		<XUIButton>One</XUIButton>
		<XUIButton>Two</XUIButton>
		<XUIButton>Three</XUIButton>
	</XUIButtonGroup>
```
