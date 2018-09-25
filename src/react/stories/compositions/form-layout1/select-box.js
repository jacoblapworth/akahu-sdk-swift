// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import SelectBox, { SelectBoxOption } from '../../../select-box';
const bank = require('@xero/xui-icon/icons/bank').default;
import XUIIcon from '../../../icon';

export default class LayoutSelect extends React.Component {
	constructor() {
		super();

		this.state = {
			selectedItem: null
		};

		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(value) {
		const { onSelect } = this.props;
		this.setState({selectedItem:value});
		onSelect && value !== '' && onSelect(value);
	}

	render() {
		const { selectedItem } = this.state;
		const {
			label,
			children,
			title,
			name,
			className,
			htmlFor
		} = this.props;

		const displayText = selectedItem != null && selectedItem !== '' ? selectedItem : title;

		return (
			<div className={className}>
				<SelectBox
					ref={c => this.selectOne = c}
					name={name}
					labelText={label}
					htmlFor={htmlFor}
					buttonContent={
						<span>
							<XUIIcon icon={bank} className="xui-margin-right-xsmall" />
							{displayText}
						</span>
					}
					isTextTruncated={false}
					isFieldLayout
				>
					{children && children.map((opt, idx) => {

						return (
							<SelectBoxOption
								id={opt}
								key={idx + opt + 'userDefined key'}
								isSelected={opt === selectedItem && selectedItem !== ''}
								value={opt}
								onSelect={this.onSelect}
							>
								{opt}
							</SelectBoxOption>
						);
					})}
				</SelectBox>
				<input hidden id={selectedItem} value={selectedItem != null ? selectedItem : ''} name={name}/>
			</div>
		);
	}
}

LayoutSelect.propTypes = {
	children: PropTypes.any,
	label: PropTypes.string,
	title: PropTypes.string,
	name: PropTypes.string,
	onSelect: PropTypes.func,
	className: PropTypes.string,
	htmlFor: PropTypes.string
};
