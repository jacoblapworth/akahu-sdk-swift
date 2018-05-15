import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import { VictoryContainer } from "victory";

let key = 0;

class GroupWrapper extends PureComponent {

	render() {
		const { className, children } = this.props;
		return <g key={key += 1} className={className}>{children}</g>;
	}
	// render = () => (
	// 	<VictoryContainer
	// 		className={this.props.className}
	// 		standalone={false}
	// 	/>
	// )

}

export default GroupWrapper;
