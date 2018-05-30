import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import DropDownToggled from '../../dropdown/DropDownToggled';
import DropDown from '../../dropdown/DropDown';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import infoPathData from '@xero/xui-icon/icons/info';
import radioCheckPathData from '@xero/xui-icon/icons/radio-check';

/*

			<DropDownToggled
				className="exampleClass"
				onOpen={() => console.log('user wants to open the dropdown')}
				trigger={trigger}
				dropdown={dropdown}
				qaHook="dropdown-example"
			/>

		const dropdown = (
			<DropDown onSelect={this.onSelect}>
				<Picklist>
					{createItems(toggledItems, this.state.selectedId)}
				</Picklist>
			</DropDown>
		);

*/

class ChartKey extends Component {
	render() {
		const { labels } = this.props;

		const trigger = (
			<XUIButton
				variant="icon"
				className={`xui-button-icon-large`}
				// onClick={() => console.log('TOGGLE')}
				title="Toggle key">
				<XUIIcon path={infoPathData} />
			</XUIButton>
		);

		// const keys = labels.map(label => (
		// 	<li
		// 		key={label}
		// 		className="xui-chartkey--item">
		// 		<XUIIcon path={radioCheckPathData} />
		// 		{label}
		// 	</li>
		// ));

		const dropdown = (
			<DropDown
				className="xui-dropdown-fixed-medium"
				hasKeyboardEvents={false}
				restrictFocus={false}>
				{/* <div className="xui-chartkey">
					<h3 className="xui-chartkey--title">Graph key</h3>
					<ul className="xui-chartkey--list">{keys}</ul>
				</div> */}
				<span className="xui-text-minor">Graph key</span>
				<Picklist>
					{ labels.map(label => (
						<Pickitem key={label}>
							<XUIIcon className="xui-pickitem--icon" path={radioCheckPathData} />
							<span>{label}</span>
						</Pickitem>
						// <li key={label} className="xui-pickitem">
						// 	<XUIIcon className="xui-pickitem--icon" path={radioCheckPathData} />
						// 	<span className="xui-pickitem--body">
						// 		<span className="xui-pickitem--text">
						// 			{label}
						// 		</span>
						// 	</span>
						// </li>
					)) }
				</Picklist>
			</DropDown>
		);

		return (
			<DropDownToggled
				// className="exampleClass"
				// onOpen={() => console.log('user wants to open the dropdown')}
				trigger={trigger}
				dropdown={dropdown}
				qaHook="xxxxxxxxx"
			/>
		);
	}
}

export default ChartKey;
