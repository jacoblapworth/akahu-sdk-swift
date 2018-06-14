import React, {Component} from 'react';
import PropTypes from 'prop-types';

let key = 0;

class GroupWrapper extends Component {
	render() {
		const {className, qaHook, children} = this.props;

		return (
			<g
				key={key += 1}
				data-automationid={qaHook}
				className={className}>
				{children}
			</g>
		);
	}
}

export default GroupWrapper;

GroupWrapper.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.any,
};
