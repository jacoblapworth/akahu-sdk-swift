import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { testIsCloseEnough } from '../helpers/utilities';
import getGroupPosition from '../helpers/groupposition';

class HorizontallyCenterContent extends PureComponent {
  contentNode = React.createRef();

  state = {
    /* contentWidth */
  };

  updateContentWidth = () => {
    const { state, contentNode } = this;
    const contentWidth = contentNode.current && getGroupPosition(contentNode.current).width;
    const shouldUpdate =
      contentNode && !testIsCloseEnough(contentWidth || 0, state.contentWidth || 0);

    if (shouldUpdate) {
      this.setState({ ...state, contentWidth });
    }
  };

  componentDidMount = () => {
    this.updateContentWidth();
  };

  componentDidUpdate = () => {
    this.updateContentWidth();
  };

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

  render = () => {
    const { wrapperWidth, wrapperHeight, children } = this.props;
    const { contentWidth = wrapperWidth } = this.state;
    const centerOffset = (wrapperWidth - contentWidth) * 0.5;

    return (
      <svg
        height={wrapperHeight}
        ref={this.contentNode}
        viewBox={`0 0 ${wrapperWidth} ${wrapperHeight}`}
        width={wrapperWidth}
        x={centerOffset}
        y={0}
      >
        {children}
      </svg>
    );
  };
}

export default HorizontallyCenterContent;

HorizontallyCenterContent.propTypes = {
  children: PropTypes.element,
  wrapperHeight: PropTypes.number,
  wrapperWidth: PropTypes.number,
};
