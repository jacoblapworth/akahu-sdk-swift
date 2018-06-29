import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class XUIAccordion extends PureComponent {
	state = {
		openId: null,
	};

	updateOpenId = id => () => {
		this.setState(prevState => ({
			openId: prevState.openId === id ? null : id,
		}));
	};

	render() {
		const { ListItem } = this.props;

		return (
			<div data-automationid={this.props.qaHook} className={this.props.className}>
				{this.props.data.map(item => (
					<ListItem
						isOpen={this.state.openId === item[this.props.idKey]}
						onClick={this.updateOpenId(item[this.props.idKey])}
						key={item[this.props.idKey]}
						item={item}
					/>
				))}
			</div>
		);
	}
}

XUIAccordion.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/** A list of the data to be displayed in the accordion.
	 *  Each list item should match the shape of the 'item' in the ListItem component used.
	*/
	data: PropTypes.array,
	// String representing the key of the unique identifier for each item in data.
	idKey: PropTypes.string,
	// The ListItem component to use
	ListItem: PropTypes.func.isRequired
};

XUIAccordion.defaultProps = {
	idKey: 'id',
	data: []
};
