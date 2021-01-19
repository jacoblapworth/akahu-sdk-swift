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
      <>
        <svg
          height={labelHeight}
          viewBox={`0 0 ${labelWidth} ${labelHeight}`}
          width={labelWidth}
          x={labelLeft}
          y={labelTop}
        >
          {shouldCalculateCenter ? (
            // We want to run the centering sequence as little as possible as it's
            // a "small" design enhancement for a "large" overhead. Unless explicitly
            // requested we bypass this component.
            <HorizontallyCenterContent wrapperHeight={labelHeight} wrapperWidth={labelWidth}>
              {children}
            </HorizontallyCenterContent>
          ) : (
            children
          )}
        </svg>

        {!isToolTipHidden && toolTipMessage && (
          <rect
            fill="transparent"
            height={labelHeight - toolTipOffset}
            onMouseEnter={this.handleToolTipShow}
            onMouseLeave={this.handleToolTipHide}
            width={labelWidth}
            x={labelLeft}
            y={labelTop}
          />
        )}
      </>
    );
  };
}

export default XAxisLabelWrapper;

XAxisLabelWrapper.propTypes = {
  children: PropTypes.element,
  isToolTipHidden: PropTypes.bool,
  labelHeight: PropTypes.number,
  labelLeft: PropTypes.number,
  labelTop: PropTypes.number,
  labelWidth: PropTypes.number,
  shouldCalculateCenter: PropTypes.bool,
  toolTipMessage: PropTypes.node,
  toolTipOffset: PropTypes.number,
  updateToolTip: PropTypes.func,
};

XAxisLabelWrapper.defaultProps = {
  toolTipOffset: 20,
};
