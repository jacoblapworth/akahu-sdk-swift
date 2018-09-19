Switches can be grouped together, making it easier to include them alongside inputs and other form elements.

The touch target for Switches in a group is the entire "row" of the Switch Group.

```
<XUISwitchGroup>
	<XUISwitch>Switch it up</XUISwitch>
</XUISwitchGroup>
```

```
<XUISwitchGroup labelText="Birds of New Zealand">
	<XUISwitch isReversed isChecked>Tūī</XUISwitch>
	<XUISwitch isReversed>Pīwakawaka</XUISwitch>
	<XUISwitch isReversed>Ruru</XUISwitch>
	<XUISwitch isReversed isDisabled>Moa</XUISwitch>
</XUISwitchGroup>
```

