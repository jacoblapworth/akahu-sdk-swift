import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import getGroupPosition, { testIsCloseEnough } from '../helpers';

class HorizontallyCenterContent extends Component {

	contentNode;
	state = { /* contentWidth */ };

	updateContentWidth = () => {

		const { state, contentNode } = this;
		const contentWidth = contentNode ? getGroupPosition(contentNode).width : 0;
		const shouldUpdate = !testIsCloseEnough(contentWidth, state.contentWidth || 0);

		if (shouldUpdate) {
			this.setState({ ...state, contentWidth });
		}

	}

	componentDidMount() {
		this.updateContentWidth();
	}

	componentDidUpdate() {
		this.updateContentWidth();
	}

	// Measures the size of the supplied content and positions it horizontally in
	// reference to the supplied width of the wrapping container.
	//
	// NOTE: Content elements will ONLY be measured if they have the ".xui-chart--measure".
	// This is a good thing as we can ignore any redundant items that Victiory adds
	// to the DOM.
	//
	//      Before:
	//      - - - -
	//      .- - - - - - - - -.- - - -.
	//      |  C o n t e n t  |///////|
	//      °- - - - - - - - -°- - - -°
	//      <----- W r a p p e r ----->
	//
	//
	//      After:
	//      - - - -
	//      .- -.- - - - - - - - -.- -.
	//      |///|  C o n t e n t  |///|
	//      °- -°- - - - - - - - -°- -°
	//      <----- W r a p p e r ----->

	render() {

		const { wrapperWidth, wrapperHeight, children } = this.props;
		const { contentWidth = wrapperWidth } = this.state;
		const centerOffset = (wrapperWidth - contentWidth) * 0.5;

		return (
			<svg
				ref={node => this.contentNode = node}
				y={0}
				x={centerOffset}
				width={wrapperWidth}
				height={wrapperHeight}
				viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}>

				{ children }

			</svg>
		);
	}

}

export default HorizontallyCenterContent;
