import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "babel-polyfill";

export default class Wrapper extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		onError: PropTypes.func.isRequired,
	};

	componentDidCatch(error) {
		this.props.onError(error);
	}

	render() {
		return (
			<div className="xui-container">
				{this.props.children}
			</div>
		);
	}
}
