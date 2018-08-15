import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * This wrapper class is so we can reference the list through the virtual DOM. When
 * a react DOM node is used the ref is the actual DOM node rendered instead of React's
 * virtual DOM. As the StatefulPicklist relies on this virtual DOM to navigate through
 * it's children we need to create a wrapper.
 */
export default class StatefulPicklistWrapper extends Component {
	render() {
		const { children, ...spreadProps } = this.props;
		return <div {...spreadProps}>{children}</div>;
	}
}

StatefulPicklistWrapper.propTypes = {
	children: PropTypes.node,
};
