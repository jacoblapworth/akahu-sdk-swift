import React, {
	PureComponent
} from 'react';
import {
	XUIActions,
	XUIPageHeader
} from '../../../structural';
import Picklist, {
	Pickitem
} from '../../../picklist';
import XUIButton, {
	XUISplitButtonGroup,
	XUISecondaryButton
} from '../../../button';
import { XUIGridAreaMasterPanelDropdownEventLabel } from '../XUIGridAreaMasterPanelDropdown';

const fireEvent = () => {
	window.dispatchEvent(new CustomEvent(XUIGridAreaMasterPanelDropdownEventLabel, {
		bubbles: true,
	}))
}

export default class CustomHeader extends PureComponent {
	state = {
		selectedTab: 1
	};

	onTabClick = (a) => {
		this.setState({
			selectedTab: a
		})
	}

	render() {
		const {
			title,
			showMediumDownButton
		} = this.props;

		const builtTabs = (
			<Picklist>
				{[0, 1].map((item) => (
					<Pickitem
						ariaRole='menuitem'
						id={`number_${item}`}
						key={`number_${item}`}
						isSelected={this.state.selectedTab === item}
						onClick={this.onTabClick.bind(this, item)}
					>
						Tab
					</Pickitem>
				))}
			</Picklist>
		);

		const MediumDownButton = (
			<XUIButton
				className='xui-u-hidden-medium-up'
				onClick={() => fireEvent()}
			>
				Show navigation
			</XUIButton>
		);

		return (
			<XUIPageHeader
				title={title || 'Title'}
				tabs={builtTabs}
				actions={
					<XUIActions
						primaryAction={
							showMediumDownButton && MediumDownButton
						}
						secondaryAction={
							<XUISplitButtonGroup variant="create" isDisabled={false} >
								<XUIButton>New thing</XUIButton>
								<XUISecondaryButton aria-label="More options" />
							</XUISplitButtonGroup>
						}
					/>
				}
			/>
		)
	}
}
