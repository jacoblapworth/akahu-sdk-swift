/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import desktop from '@xero/xui-icon/icons/desktop';
import XUIIcon from '../../icon/XUIIcon';
import XUIButton from '../XUIButton';
import XUIButtonCaret from '../XUIButtonCaret';
import XUISplitButtonGroup from '../XUISplitButtonGroup';
import XUISecondaryButton from '../XUISecondaryButton';
import { SizeClassNames, VariantClassNames } from '../private/constants.js';

const onClick = () => console.log('Button Click');
const onSecondaryClick = () => console.log('Secondary Button Click');
const keys = Object.keys;
const variants = keys(VariantClassNames);
const sizes = keys(SizeClassNames);

const buttonVariants = (
	<section>
		<h3>Button Variants</h3>
		{variants.map(variant => {
			const containerClasses = cn('xui-row-flex xui-space-around xui-margin-bottom-small', {
				'xui-background-grey-1 xui-text-color-white': variant === 'icon-inverted'
			});
			const icon = variant.startsWith('icon') ? <XUIIcon path={desktop} /> : null;
			return (
				<div key={variant} className={containerClasses}>
					<XUIButton variant={variant} onClick={onClick}>
						{icon}
						{variant}
					</XUIButton>
					<XUIButton isDisabled variant={variant} onClick={onClick}>
						{icon}
						Disabled {variant}
					</XUIButton>
					<XUIButton variant={variant} onClick={onClick}>
						{icon}
						{variant} with caret
						<XUIButtonCaret />
					</XUIButton>
					<XUIButton isDisabled variant={variant} onClick={onClick}>
						{icon}
						Disabled {variant} with caret
						<XUIButtonCaret />
					</XUIButton>
					<XUIButton isLink variant={variant} href="https://www.xero.com">
						{icon}
						Link {variant}
					</XUIButton>
					<XUIButton isLink isDisabled variant={variant} href="https://www.xero.com">
						{icon}
						Disabled Link {variant}
					</XUIButton>
				</div>
			);
		})}
	</section>
);

const buttonSizes = (
	<section>
		<h3>Button Sizes</h3>
		{sizes.map(size => (
			<div key={size} className="xui-row-flex xui-space-around xui-margin-bottom-small">
				<XUIButton size={size} onClick={onClick}>
					{size}
				</XUIButton>
				<XUIButton isDisabled size={size} onClick={onClick}>
					Disabled {size}
				</XUIButton>
				<XUIButton isLink size={size} href="https://www.xero.com">
					Link {size}
				</XUIButton>
				<XUIButton isLink isDisabled size={size} href="https://www.xero.com">
					Disabled Link {size}
				</XUIButton>
				<XUIButton isLink size={size} href="https://www.xero.com" target="_blank">
					_blank Link {size} with caret
					<XUIButtonCaret />
				</XUIButton>
				<XUIButton isLink isDisabled size={size} href="https://www.xero.com" target="_blank">
					_blank Disabled Link {size} with caret
					<XUIButtonCaret />
				</XUIButton>
			</div>
		))}
	</section>
);

const splitButtonVariants = (
	<section>
		<h3>Split Button Variants</h3>
		{variants.map(variant => {
			const containerClasses = cn('xui-row-flex xui-space-around xui-margin-bottom-small', {
				'xui-background-grey-1 xui-text-color-white': variant === 'icon-inverted'
			});
			const icon = variant.startsWith('icon') ? <XUIIcon path={desktop} /> : null;
			return (
				<div key={variant} className={containerClasses}>
					<XUISplitButtonGroup variant={variant}>
						<XUIButton variant={variant} onClick={onClick}>
							{icon}
							{variant}
						</XUIButton>
						<XUISecondaryButton onClick={onSecondaryClick} />
					</XUISplitButtonGroup>
					<XUISplitButtonGroup isDisabled variant={variant}>
						<XUIButton variant={variant} onClick={onClick}>
							{icon}
							Disabled {variant}
						</XUIButton>
						<XUISecondaryButton onClick={onSecondaryClick} />
					</XUISplitButtonGroup>
				</div>
			);
		})}
	</section>
);

const icons = (
	<section>
		<h3>Icon Buttons (only icons)</h3>
		<div className="xui-row-flex xui-space-around xui-margin-bottom-small">
			<XUIButton variant="icon">
				<XUIIcon path={desktop} />
			</XUIButton>
			<XUIButton isDisabled variant="icon">
				<XUIIcon path={desktop} />
			</XUIButton>
			<XUIButton isLink variant="icon" href="https://www.xero.com">
				<XUIIcon path={desktop} />
			</XUIButton>
			<XUIButton isLink isDisabled variant="icon" href="https://www.xero.com">
				<XUIIcon path={desktop} />
			</XUIButton>
		</div>
		<div className="xui-row-flex xui-space-around xui-margin-bottom-small xui-background-grey-1 xui-text-color-white">
			<XUIButton variant="icon-inverted">
				<XUIIcon path={desktop} />
			</XUIButton>
			<XUIButton isDisabled variant="icon-inverted">
				<XUIIcon path={desktop} />
			</XUIButton>
			<XUIButton isLink variant="icon-inverted" href="https://www.xero.com">
				<XUIIcon path={desktop} />
			</XUIButton>
			<XUIButton isLink isDisabled variant="icon-inverted" href="https://www.xero.com">
				<XUIIcon path={desktop} />
			</XUIButton>
		</div>
	</section>
);

ReactDOM.render(
	<div className="xui-page-width-standard">
		{icons}
		{buttonVariants}
		{buttonSizes}
		{splitButtonVariants}
	</div>,
	document.getElementById('app')
);
