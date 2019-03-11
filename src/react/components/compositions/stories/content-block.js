import React, { PureComponent } from 'react';
import { XUIContentBlock, XUIContentBlockItem } from '../../../structural';
import XUIButton, { XUIButtonCaret } from '../../../button';
import Dropdown, { DropDownToggled } from '../../../dropdown';
import Picklist, { Pickitem } from '../../../picklist';
import XUIIcon from '../../../icon';
import overflow from '@xero/xui-icon/icons/overflow';

export default class ContentBlock extends PureComponent {
	render() {

		const {
			showMediumDownButton,
			dropdownOptions = [],
			onSelectItem,
		} = this.props;

		const MediumDownButton = (
			<XUIButton
				className='xui-u-hidden-medium-up'
				variant="borderless-standard"
				size="small"
			>
				Filter <XUIButtonCaret />
			</XUIButton>
		);

		const dropdown = (
			<Dropdown>
				<Picklist>
					{dropdownOptions.map(item => (
						<Pickitem
							id={item}
							key={item}
							onSelect={onSelectItem.bind(this, item)}>
							Navigation item {item}
						</Pickitem>
					))}
				</Picklist>
			</Dropdown>
		);

		const toggledDropdown = showMediumDownButton ? (
			<DropDownToggled
				trigger={MediumDownButton}
				dropdown={dropdown}
				/>
		): null;

		return (

				<XUIContentBlock className="xui-panel">
					<XUIContentBlockItem
						primaryHeading='Heading'
						action={toggledDropdown}
						/>
					{[1,2,3].map(item => (
						<XUIContentBlockItem
							key={item}
							primaryHeading='Title'
							secondaryHeading='Subtitle'
							overflow={
								<XUIButton
									variant="icon"
									aria-label="Overflow menu"
								>
									<XUIIcon icon={overflow} />
								</XUIButton>
							}
							/>
					))}
					<XUIContentBlockItem
						primaryHeading='Title'
						secondaryHeading='Subtitle'
						description='Description &middot; Description &middot; Description'
						overflow={
							<XUIButton
								variant="icon"
								aria-label="Overflow menu"
							>
								<XUIIcon icon={overflow} />
							</XUIButton>
						}
					/>
				</XUIContentBlock>
		)
	}
}
