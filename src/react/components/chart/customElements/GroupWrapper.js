import React, {PureComponent} from 'react';
// import PropTypes from 'prop-types';

let key = 0;

class GroupWrapper extends PureComponent {
	render() {
		const {className, children} = this.props;

		return (
			<g
				key={key += 1}
				className={className}>
				{children}
			</g>
		);
	}
}

export default GroupWrapper;
