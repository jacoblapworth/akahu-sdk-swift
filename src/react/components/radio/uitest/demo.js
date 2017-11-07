import React from 'react';
import ReactDOM from 'react-dom';
import XUIRadio from '../XUIRadio';
import XUIRadioGroup from '../XUIRadioGroup';
import desktop from '@xero/xui-icon/icons/desktop';

const rowClasses = 'xui-row-flex xui-u-flex-space-around xui-margin-bottom-small';

const normal = (
	<section>
		<h3>Standard Radio</h3>
		<div className={rowClasses}>
			<XUIRadio>Uncontrolled</XUIRadio>
			<XUIRadio isChecked={false}>Unchecked</XUIRadio>
			<XUIRadio isChecked qaHook="checked-radio">Checked</XUIRadio>
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
			<XUIRadio isReversed>Uncontrolled</XUIRadio>
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
			<XUIRadio iconMainPath={desktop}>You really want to check me</XUIRadio>
			<XUIRadio isDisabled>Disabled</XUIRadio>
		</XUIRadioGroup>
	</section>
);

const customIcon = (
	<section>
		<h3>Radio with custom icons</h3>
		<div className={rowClasses}>
			<XUIRadio iconMainPath={desktop}>
				Uncontrolled
			</XUIRadio>
			<XUIRadio iconMainPath={desktop} isChecked={false}>
				Unchecked
			</XUIRadio>
			<XUIRadio iconMainPath={desktop} isChecked>
				Checked
			</XUIRadio>
			<XUIRadio iconMainPath={desktop} isChecked isRequired>
				Required
			</XUIRadio>
			<XUIRadio iconMainPath={desktop} isDisabled>
				Disabled Unchecked
			</XUIRadio>
			<XUIRadio iconMainPath={desktop} isDisabled isChecked>
				Disabled Checked
			</XUIRadio>
		</div>
	</section>
);

ReactDOM.render(
	<div className="xui-page-width-large">
		{normal}
		{reversed}
		{customIcon}
		{group}
	</div>,
	document.getElementById('app')
)
