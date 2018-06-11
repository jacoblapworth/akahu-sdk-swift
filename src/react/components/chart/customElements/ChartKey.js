import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import DropDownToggled from '../../dropdown/DropDownToggled';
import DropDown from '../../dropdown/DropDown';
import infoPathData from '@xero/xui-icon/icons/info';

class ChartKey extends Component {
	createLabel = (label, index) => (
		<li
			key={label}
			className="xui-chart--key-item">
			<div
				className="xui-chart--key-icon"
				style={{background: this.props.colors[index]}}
			/>
			{label}
		</li>
	);

	render() {
		const {labels, colors} = this.props;

		const trigger = (
			<XUIButton
				variant="icon"
				className={`xui-button-icon-large`}
				title="Toggle key">
				<XUIIcon path={infoPathData} />
			</XUIButton>
		);

		const dropdown = (
			<DropDown
				className="xui-dropdown-fixed-medium"
				hasKeyboardEvents={false}
				restrictFocus={false}>
				<div className="xui-chart--key">
					<div className="xui-text-minor xui-padding-small">Graph key</div>
					<ul className="xui-chart--key-list">
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
