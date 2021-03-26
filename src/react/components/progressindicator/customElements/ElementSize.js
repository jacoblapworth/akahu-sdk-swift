import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

class ElementSize extends Component {
  state = {
    elementWidth: null,
    elementHeight: null,
  };

  rootNode = React.createRef();

  throttled;

  componentDidUpdate = () => this.setCurrentSize();

  componentDidMount = () => {
    this.setCurrentSize();
    this.throttled = throttle(this.setCurrentSize, 500);
    window.addEventListener('resize', this.throttled);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.throttled);
    this.throttled.cancel();
  };

  setCurrentSize = () => {
    const { rootNode } = this;
    const { elementWidth, elementHeight } = this.state;

    if (rootNode.current) {
      const { clientWidth, clientHeight } = rootNode.current;
      const hasWidthChanged = clientWidth && elementWidth !== clientWidth;
      const hasHeightChanged = clientHeight && elementHeight !== clientHeight;

      if (hasWidthChanged || hasHeightChanged) {
        this.setState({
          elementWidth: clientWidth,
          elementHeight: clientHeight,
        });
      }
    }
  };

  render = () => {
    const { className, children } = this.props;
    const isWrapperSizeCalculated = this.state.elementWidth && this.state.elementHeight;

    return (
      <div className={className} ref={this.rootNode}>
        {isWrapperSizeCalculated && children(this.state)}
      </div>
    );
  };
}

ElementSize.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ElementSize;
