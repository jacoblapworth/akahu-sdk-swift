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

		return (
			<XUIPageHeader
				title={title || 'Title'}
				tabs={builtTabs}
				actions={
					<XUIActions
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
