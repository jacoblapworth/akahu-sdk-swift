import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import getTargetPosition from '../helpers/targetposition';
import HorizontallyCenterContent from './HorizontallyCenterContent';

class XAxisLabelWrapper extends PureComponent {
  handleToolTipShow = event => {
    const { updateToolTip, toolTipMessage } = this.props;
    const preferred = 'bottom';
    const position = { ...getTargetPosition(event), preferred };

    updateToolTip(position, toolTipMessage);
  };

  handleToolTipHide = () => this.props.updateToolTip();

  render = () => {
    const {
      toolTipMessage,
      toolTipOffset,
      isToolTipHidden,
      shouldCalculateCenter,
      labelLeft,
      labelTop,
      labelWidth,
      labelHeight,
      children,
    } = this.props;

    return (
      <Fragment>
        <svg
          y={labelTop}
          x={labelLeft}
          height={labelHeight}
          width={labelWidth}
          viewBox={`0 0 ${labelWidth} ${labelHeight}`}
        >
          {shouldCalculateCenter ? (
            // We want to run the centering sequence as little as possible as it's
            // a "small" design enhancement for a "large" overhead. Unless explicitly
            // requested we bypass this component.
            <HorizontallyCenterContent wrapperWidth={labelWidth} wrapperHeight={labelHeight}>
              {children}
            </HorizontallyCenterContent>
          ) : (
            children
          )}
        </svg>

        {!isToolTipHidden && toolTipMessage && (
          <rect
            y={labelTop}
            x={labelLeft}
            width={labelWidth}
            height={labelHeight - toolTipOffset}
            fill="transparent"
            onMouseEnter={this.handleToolTipShow}
            onMouseLeave={this.handleToolTipHide}
          />
        )}
      </Fragment>
    );
  };
}

export default XAxisLabelWrapper;

XAxisLabelWrapper.propTypes = {
  shouldCalculateCenter: PropTypes.bool,
  toolTipMessage: PropTypes.node,
  toolTipOffset: PropTypes.number,
  isToolTipHidden: PropTypes.bool,
  updateToolTip: PropTypes.func,
  labelLeft: PropTypes.number,
  labelTop: PropTypes.number,
  labelWidth: PropTypes.number,
  labelHeight: PropTypes.number,
  children: PropTypes.element,
};

XAxisLabelWrapper.defaultProps = {
  toolTipOffset: 20,
};
