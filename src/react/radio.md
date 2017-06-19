```
const rowClasses = 'xui-space-around xui-margin-bottom-small';
console.log(customIcon);

const normal = (
	<section>
		<h3>Standard Radio</h3>
		<div className={rowClasses}>
			<XUIRadio>Uncontrolled</XUIRadio>
			<XUIRadio isChecked={false}>Unchecked</XUIRadio>
			<XUIRadio isChecked>Checked</XUIRadio>
			<XUIRadio isRequired>Required</XUIRadio>
			<XUIRadio isDisabled>Disabled Unchecked</XUIRadio>
			<XUIRadio isDisabled isChecked>Disabled Checked</XUIRadio>
		</div>
	</section>
);

const reversed = (
	<section>
		<h3>Reversed Radio</h3>
		<div className={rowClasses}>
			<XUIRadio isReversed isChecked={false}>Unchecked</XUIRadio>
			<XUIRadio isReversed isChecked>Checked</XUIRadio>
			<XUIRadio isReversed isRequired>Required Reversed</XUIRadio>
			<XUIRadio isReversed isDisabled>Disabled Unchecked</XUIRadio>
			<XUIRadio isReversed isDisabled isChecked>Disabled Checked</XUIRadio>
		</div>
	</section>
);

const group = (
	<section>
		<h3>Radio Group</h3>
		<XUIRadioGroup>
			<XUIRadio isReversed>Reversed</XUIRadio>
			<XUIRadio isChecked>Check me</XUIRadio>
			<XUIRadio>Nah check me</XUIRadio>
			<XUIRadio iconMainPath={customIcon}>You really want to check me</XUIRadio>
			<XUIRadio isDisabled>Disabled</XUIRadio>
		</XUIRadioGroup>
	</section>
);

const customIcon = (
	<section>
		<h3>Radio with custom icons</h3>
		<div className={rowClasses}>
			<XUIRadio iconMainPath={customIcon} isChecked={false}>
				Unchecked
			</XUIRadio>
			<XUIRadio iconMainPath={customIcon} isChecked>
				Checked
			</XUIRadio>
			<XUIRadio iconMainPath={customIcon} isChecked isRequired>
				Required
			</XUIRadio>
			<XUIRadio iconMainPath={customIcon} isDisabled>
				Disabled Unchecked
			</XUIRadio>
			<XUIRadio iconMainPath={customIcon} isDisabled isChecked>
				Disabled Checked
			</XUIRadio>
		</div>
	</section>
);

<div className="xui-page-width-large">
	{normal}
	{reversed}
	{customIcon}
	{group}
</div>
```
