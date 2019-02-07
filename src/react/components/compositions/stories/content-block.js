import React, { PureComponent, Fragment } from 'react';
import { XUIContentBlock, XUIContentBlockItem } from '../../../structural';
import XUIButton, { XUIButtonCaret } from '../../../button';
import XUIIcon from '../../../icon';
import overflow from '@xero/xui-icon/icons/overflow';
import { XUIGridAreaMasterPanelDropdownEventLabel } from '../XUIGridAreaMasterPanelDropdown';

const fireEvent = () => {
	window.dispatchEvent(new CustomEvent(XUIGridAreaMasterPanelDropdownEventLabel, {
		bubbles: true,
	}))
}

export default class ContentBlock extends PureComponent {
	render() {

		const {
			showMediumDownButton
		} = this.props;

		const MediumDownButton = showMediumDownButton ? (
			<XUIButton
				className='xui-u-hidden-medium-up'
				onClick={() => fireEvent()}
				variant="borderless-standard"
				size="small"
			>
				Filter <XUIButtonCaret />
			</XUIButton>
		) : null;

		return (

				<XUIContentBlock className="xui-panel">
					<XUIContentBlockItem
						primaryHeading='Heading'
						action={MediumDownButton}
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
									<XUIIcon
										icon={overflow}
										isBoxed
										/>
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
								<XUIIcon
									icon={overflow}
									isBoxed
									/>
							</XUIButton>
						}
					/>
				</XUIContentBlock>
		)
	}
}
