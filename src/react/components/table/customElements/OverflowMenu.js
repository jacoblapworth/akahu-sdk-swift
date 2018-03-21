import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import DropDown from '../../dropdown/DropDown';
import DropDownToggled from '../../dropdown/DropDownToggled';
import Picklist from '../../picklist/Picklist';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import overflowPathData from '@xero/xui-icon/icons/overflow';
import { NAME_SPACE } from '../helpers/constants';

class OverflowMenu extends PureComponent {
	createTrigger = () => (
		<XUIButton
			variant="icon"
			className="xui-button-icon-large">
			<XUIIcon
				path={overflowPathData}
				className="xui-u-flex-inherit"
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
		const { items } = this.props;
		const trigger = this.createTrigger();
		const dropdown = this.createDropDown(items);

		return (
			<DropDownToggled
				trigger={trigger}
				dropdown={dropdown}
				className={`${NAME_SPACE}--overflowmenu-body`}
			/>
		);
	};
}

OverflowMenu.propTypes = {
	items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default OverflowMenu;