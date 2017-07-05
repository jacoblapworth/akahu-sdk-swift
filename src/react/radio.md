Enhanced version of HTML radio using SVGs. Use in place of `<input type="radio" />`.

### XUI Docs

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-checkboxes-and-radios.html#checkboxes-and-radios-1">Checkboxes and Radios</a></span>
	</div>
</div>

```
const rowClasses = 'xui-space-around xui-margin-bottom-small';

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
			<XUIRadio name="radioGroup" isReversed>Reversed</XUIRadio>
			<XUIRadio name="radioGroup" defaultChecked>Check me</XUIRadio>
			<XUIRadio name="radioGroup">Nah check me</XUIRadio>
			<XUIRadio name="radioGroup" iconMainPath={customIcon}>You really want to check me</XUIRadio>
			<XUIRadio name="radioGroup" isDisabled>Disabled</XUIRadio>
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
