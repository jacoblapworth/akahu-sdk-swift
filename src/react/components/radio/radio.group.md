Radios can be grouped together, which makes it easier to include them alongside inputs and other form elements.
When grouping radios together, you still need to add a `name` to each Radio so that only one can be selected at a time.

The touch target for Radios in a group is the entire "row" of the Radio Group.

```
<XUIRadioGroup labelText="cities">
	<XUIRadio name="radioGroup">Wellington</XUIRadio>
	<XUIRadio name="radioGroup">Canberra</XUIRadio>
	<XUIRadio name="radioGroup">Washington D.C</XUIRadio>
	<XUIRadio name="radioGroup" isDisabled >Carthage</XUIRadio>
</XUIRadioGroup>
```
