import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
		const {title, labels} = this.props;

		const trigger = (
			<XUIButton
				variant="icon-large"
				title={title}>
				<XUIIcon path={infoPathData} />
			</XUIButton>
		);

		const dropdown = (
			<DropDown
			fixedWidth
				size="medium"
				hasKeyboardEvents={false}
				restrictFocus={false}>
				<div className={`${NAME_SPACE}-chart--key`}>
					<div className={`${NAME_SPACE}-chart--key-title`}>{title}</div>
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

ChartKey.propTypes = {
	title: PropTypes.string,
	labels: PropTypes.arrayOf(PropTypes.string),
	colors: PropTypes.arrayOf(PropTypes.string),
};
