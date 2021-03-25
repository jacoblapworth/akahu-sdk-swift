import PropTypes from 'prop-types';
import React from 'react';
import { Portal } from 'react-portal';

import shallowCompare from '../../../helpers/shallowCompare';
import PositioningHelper from './helpers/positioning';
import doAsync from '../../helpers/doAsync';

export default class Positioning extends React.Component {
  ref = React.createRef();

  updatePositionTimeoutId;

  windowHasResizeListener = false;

  state = {};

  componentDidMount() {
    this.updatePosition(true);

    if (document.readyState !== 'complete') {
      document.addEventListener('DOMContentLoaded', this.updatePosition);
    }

    if (window) {
      window.addEventListener('resize', this.updatePosition);
      this.windowHasResizeListener = true;
    }
  }

  componentWillUnmount() {
    window && window.removeEventListener('resize', this.updatePosition);
  }

  componentDidUpdate() {
    this.updatePosition(true);
    if (!this.windowHasResizeListener && window) {
      window.addEventListener('resize', this.updatePosition);
      this.windowHasResizeListener = true;
    }
  }

  render() {
    const { children } = this.props;
    const { isFullWidth, location, style } = this.state;
    return (
      <Portal>
        <div className="xui-container">
          <div ref={this.ref} style={{ position: 'absolute', ...style }}>
            {children(location, isFullWidth)}
          </div>
        </div>
      </Portal>
    );
  }

  /* eslint-disable no-param-reassign */
  getContentRect = contentElement => {
    const previousStyle = { left: contentElement.style.left, top: contentElement.style.top };
    /**
     * We place the contentElement at the top left of the page before retrieving its measurements so
     * that the size is not influenced by the edges of the page.
     */
    contentElement.style.left = '0';
    contentElement.style.top = '0';

    const contentRect = contentElement.getBoundingClientRect();

    contentElement.style.left = previousStyle.left;
    contentElement.style.top = previousStyle.top;

    return contentRect;
  };
  /* eslint-enable no-param-reassign */

  updatePosition = async updateSynchronously => {
    const doSync = callback => new Promise(resolve => resolve(callback()));
    const execute = updateSynchronously ? doSync : doAsync;

    const { pageGutter, preferredLocation, triggerGap } = this.props;

    if (this.updatePositionTimeoutId) {
      clearTimeout(this.updatePositionTimeoutId);
    }

    if (!this.ref.current || !this.props.triggerRef.current) {
      return;
    }

    const contentRect = await execute(
      () => this.ref.current && this.getContentRect(this.ref.current),
    );
    const triggerRect = await execute(() => this.props.triggerRef.current?.getBoundingClientRect());

    if (triggerRect) {
      const positionHelper = await execute(
        () =>
          new PositioningHelper(
            preferredLocation,
            contentRect,
            triggerRect,
            triggerGap,
            pageGutter,
          ),
      );

      const location = await execute(() => positionHelper.getLocation());
      const style = await execute(() => positionHelper.getPositionStyle());
      const isFullWidth = await execute(() => positionHelper.isFullWidth());
      // This function is called often so we only call `setState` if something has changed.

      if (location !== this.state.location || !shallowCompare(style, this.state.style)) {
        this.setState({
          isFullWidth,
          location,
          style,
        });
      }
    }

    /**
     * Running `updatePosition` regularly accommodates the following situations:
     * - The content resizes (could be handled with a ResizeObserver)
     * - The trigger resizes (could be handled with a ResizeObserver)
     * - The trigger changes position (currently we have no way of observing this reliably)
     */
    this.updatePositionTimeoutId = setTimeout(this.updatePosition, 100);
  };
}

Positioning.propTypes = {
  /**
   * This component requires `children` to be a function. The function receives 2 arguments,
   * `location` and `isFullWidth`, and returns a React node.
   *
   * The `location` is where the content ended up being positioned, this will be the
   * `preferredLocation` or the next available location.
   *
   * The `isFullWidth` flag is `true` when the width of the content is narrower than the body when
   * taking the `pageGutter` into consideration. This is useful for switching to a full-width style
   * when there is not enough room to position the content correctly.
   */
  children: PropTypes.func.isRequired,
  /**
   * How much space should be left between the edge of the page and the content to be positioned.
   */
  pageGutter: PropTypes.number,
  /**
   * The preferred location for the content. If the preferred location is not available the opposite
   * side of the trigger will be checked, followed by the right and bottom sides, and finally the
   * left and top sides.
   */
  preferredLocation: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * How much space should be left between the trigger and the content to be positioned.
   */
  triggerGap: PropTypes.number,
  /**
   * The ref for the HTMLElement the content should be positioned around.
   */
  triggerRef: PropTypes.object,
};
