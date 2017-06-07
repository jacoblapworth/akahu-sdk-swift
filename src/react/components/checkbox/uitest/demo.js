import React from 'react';
import ReactDOM from 'react-dom';
import XUICheckbox from '../XUICheckbox';
import XUICheckboxGroup from '../XUICheckboxGroup';
import desktop from '@xero/xui-icon/icons/desktop';

const rowClasses = 'xui-row-flex xui-space-around xui-margin-bottom-small';
const normal = (
	<section>
		<h3>Standard Checkbox</h3>
		<div className={rowClasses}>
			<XUICheckbox>Uncontrolled</XUICheckbox>
			<XUICheckbox isChecked={false}>Unchecked</XUICheckbox>
			<XUICheckbox isChecked>Checked</XUICheckbox>
			<XUICheckbox isIndeterminate>Indeterminate</XUICheckbox>
			<XUICheckbox isDisabled>Disabled Unchecked</XUICheckbox>
			<XUICheckbox isDisabled isChecked>Disabled Checked</XUICheckbox>
			<XUICheckbox isDisabled isIndeterminate>Disabled Indeterminate</XUICheckbox>
		</div>
	</section>
);

const reversed = (
	<section>
		<h3>Reversed Checkbox</h3>
		<div className={rowClasses}>
			<XUICheckbox isReversed>Uncontrolled</XUICheckbox>
			<XUICheckbox isReversed isChecked={false}>Unchecked</XUICheckbox>
			<XUICheckbox isReversed isChecked>Checked</XUICheckbox>
			<XUICheckbox isReversed isIndeterminate>Indeterminate</XUICheckbox>
			<XUICheckbox isReversed isDisabled>Disabled Unchecked</XUICheckbox>
			<XUICheckbox isReversed isDisabled isChecked>Disabled Checked</XUICheckbox>
			<XUICheckbox isReversed isDisabled isIndeterminate>Disabled Indeterminate</XUICheckbox>
		</div>
	</section>
);

const customIcon = (
	<section>
		<h3>Checkbox with custom icons</h3>
		<div className={rowClasses}>
			<XUICheckbox iconMainPath={desktop}>
				Uncontrolled
			</XUICheckbox>
			<XUICheckbox iconMainPath={desktop} isChecked={false}>
				Unchecked
			</XUICheckbox>
			<XUICheckbox iconMainPath={desktop}isChecked>
				Checked
			</XUICheckbox>
			<XUICheckbox iconMainPath={desktop} isIndeterminate>
				Indeterminate
			</XUICheckbox>
			<XUICheckbox iconMainPath={desktop} isDisabled>
				Disabled Unchecked
			</XUICheckbox>
			<XUICheckbox iconMainPath={desktop} isDisabled isChecked>
				Disabled Checked
			</XUICheckbox>
			<XUICheckbox iconMainPath={desktop} isDisabled isIndeterminate>
				Disabled Indeterminate
			</XUICheckbox>
		</div>
	</section>
);

const group = (
	<section>
		<h3>Checkbox Group</h3>
		<XUICheckboxGroup>
			<XUICheckbox isReversed>Reversed</XUICheckbox>
			<XUICheckbox>Normal</XUICheckbox>
			<XUICheckbox iconMainPath={desktop}>Custom Icon</XUICheckbox>
		</XUICheckboxGroup>
	</section>
);

ReactDOM.render(
	<div>
		{normal}
		{reversed}
		{customIcon}
		{group}
	</div>,
	document.getElementById('app')
);
