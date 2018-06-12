import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import DropDownToggled from '../../dropdown/DropDownToggled';
import DropDown from '../../dropdown/DropDown';
import infoPathData from '@xero/xui-icon/icons/info';
import {NAME_SPACE} from '../helpers/constants';

class ChartKey extends Component {
	createLabel = (label, index) => (
		<li
			key={label}
			className={`${NAME_SPACE}-chart--key-item`}>
			<div
				className={`${NAME_SPACE}-chart--key-icon`}
				style={{background: this.props.colors[index]}}
			/>
			{label}
		</li>
	);

	render() {
		const {title, labels, colors} = this.props;

		const trigger = (
			<XUIButton
				variant="icon"
				className={`xui-button-icon-large`}
				title={title}>
				<XUIIcon path={infoPathData} />
			</XUIButton>
		);

		const dropdown = (
			<DropDown
				className="xui-dropdown-fixed-medium"
				hasKeyboardEvents={false}
				restrictFocus={false}>
				<div className={`${NAME_SPACE}-chart--key`}>
					<div className="xui-text-minor xui-padding-small">{title}</div>
					<ul className={`${NAME_SPACE}-chart--key-list`}>
						{labels.map(this.createLabel)}
					</ul>
				</div>
			</DropDown>
		);

		return (
			<DropDownToggled
				trigger={trigger}
				dropdown={dropdown}
			/>
		);
	}
}

export default ChartKey;
