import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import overflowPathData from '@xero/xui-icon/icons/overflow';

import DropDown from '../../dropdown/DropDown';
import DropDownToggled from '../../dropdown/DropDownToggled';
import Picklist from '../../picklist/Picklist';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import { NAME_SPACE } from '../helpers/constants';
import { ns } from '../../helpers/xuiClassNamespace';

class OverflowMenu extends PureComponent {
	createTrigger = overflowMenuTitle => (
		<XUIButton
			variant="icon"
			className={`${ns}-button-icon-large`}
		>
			<XUIIcon
				icon={overflowPathData}
				className={`${ns}-u-flex-inherit`}
				title={overflowMenuTitle}
				isBoxed
			/>
		</XUIButton>
	);

	createDropDown = items => (
		<DropDown>
			<Picklist>
				{items.map((Item, key) => Item && cloneElement(Item, { key }))}
			</Picklist>
		</DropDown>
	);

	render = () => {
		const { items, overflowMenuTitle } = this.props;
		const trigger = this.createTrigger(overflowMenuTitle);
		const dropdown = this.createDropDown(items);

		return (
			<DropDownToggled
				trigger={trigger}
				dropdown={dropdown}
				className={`${NAME_SPACE}--overflowmenu-body`}
				isLegacyDisplay
			/>
		);
	};
}

OverflowMenu.propTypes = {
	items: PropTypes.arrayOf(PropTypes.node).isRequired,
	overflowMenuTitle: PropTypes.string,
};

export default OverflowMenu;
