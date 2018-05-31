import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import XUIButton from '../../button/XUIButton';
import XUIIcon from '../../icon/XUIIcon';
import DropDownToggled from '../../dropdown/DropDownToggled';
import DropDown from '../../dropdown/DropDown';
import infoPathData from '@xero/xui-icon/icons/info';
import radioCheckPathData from '@xero/xui-icon/icons/radio-check';

class ChartKey extends Component {
	render() {
		const { labels, colors } = this.props;
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
				<div className="xui-chartkey">
					<div className="xui-text-minor xui-padding-small">Graph key</div>
					<ul className="xui-chartkey--list">
						{ labels.map((label, index) => (
							<li key={label} className="xui-chartkey--item">
								<div
									className="xui-chartkey--icon"
									style={{ background: colors[index] }}
								/>
								{label}
							</li>
						)) }
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
