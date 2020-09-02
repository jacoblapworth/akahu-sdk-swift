import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import getTargetPosition from '../helpers/targetposition';
import { NAME_SPACE, BAR_RADIUS, BAR_PADDING_X } from '../helpers/constants';
import { forceValuePositive } from '../helpers/utilities';
import { getMinAndMaxYAxisTickValues } from '../helpers/yaxis';
import {
  createStackTop,
  createStackHeight,
  createInteractionParams,
  testIsAnyStackNegative,
  testIsAnyStackPositive,
  testIsCurrentStackPositive,
  addStackItems,
  forceAddStackItems,
} from '../helpers/bars';

class StackedBar extends PureComponent {
  handleToolTipShow = (event, barData) => {
    const { updateToolTip, createToolTipMessage } = this.props;
    const position = getTargetPosition(event);
    const message = createToolTipMessage(barData);
    updateToolTip(position, message);
  };

  handleToolTipHide = () => {
    const { updateToolTip } = this.props;
    return updateToolTip();
  };

  createBarMask = ({ barLeft, barTop, barWidth, barHeight }) => {
    const {
      datum: { y: stackData },
    } = this.props;
    const isAnyStackNegative = testIsAnyStackNegative(stackData);
    const isAnyStackPositive = testIsAnyStackPositive(stackData);
    const cornerOverrideHeight = Math.min(BAR_RADIUS, barHeight);
    const baseProps = {
      x: barLeft,
      y: barTop,
      width: barWidth,
      height: barHeight,
      fill: 'white',
    };

    return (
      <Fragment>
        <rect {...baseProps} rx={BAR_RADIUS} ry={BAR_RADIUS} />
        {
          // Remove the masks rounded corners on the bars "top" / "bottom" sides
          // that touch the "zero" base line.
        }
        {isAnyStackNegative && !isAnyStackPositive && (
          <rect {...baseProps} height={cornerOverrideHeight} />
        )}
        {!isAnyStackNegative && isAnyStackPositive && (
          <rect
            {...baseProps}
            height={cornerOverrideHeight}
            y={barTop + (barHeight - cornerOverrideHeight)}
          />
        )}
      </Fragment>
    );
  };

  createStackThunk = ({ ratio, barZeroBase, barLeft, barWidth, barStacks }) => (
    barStack,
    stackIndex,
  ) => {
    const {
      isBarStacked,
      onBarClick,
      isToolTipHidden,
      colorStacks,
      colorActive,
      activeBars,
      index: barIndex,
      datum: barData,
    } = this.props;
    const { id: barId } = barData;
    const testIsActive = (activeBars[barId] || []).indexOf(stackIndex) >= 0;
    const stackTop = createStackTop({
      barZeroBase,
      barStacks,
      ratio,
      stackIndex,
    });
    const stackHeight = createStackHeight(barStack * ratio);
    const interactionParams = createInteractionParams(isBarStacked, {
      ...barData,
      barIndex,
      stackIndex,
    });
    const clickProps = onBarClick && {
      onClick: event => onBarClick(event, interactionParams),
      style: { cursor: 'pointer' },
    };
    const toolTipProps = !isToolTipHidden && {
      onMouseEnter: event => this.handleToolTipShow(event, interactionParams),
      onMouseLeave: this.handleToolTipHide,
    };

    return (
      <Fragment key={stackIndex}>
        <rect
          {...{ ...clickProps, ...toolTipProps }}
          fill={colorStacks[stackIndex]}
          height={stackHeight}
          width={barWidth}
          x={barLeft}
          y={stackTop}
        />
        {testIsActive && (
          <rect
            fill={colorActive}
            height={stackHeight}
            style={{ pointerEvents: 'none' }}
            width={barWidth}
            x={barLeft}
            y={stackTop}
          />
        )}
      </Fragment>
    );
  };

  render = () => {
    const {
      chartId,
      barWidth: barWidthRaw,
      yAxisTickValues,
      yAxisHeight,
      padding,

      // Victory...
      datum: barData,
      index: barIndex,
      // Unused Victory references...
      // alignment, data, height, horizontal, index, origin, polar, width, x, x0, y, y0
    } = this.props;

    const { id: barId, y: barStacks } = barData;
    if (!barStacks.length) return null;

    const divider = BAR_PADDING_X;
    const { yAxisMinValue, yAxisMaxValue } = getMinAndMaxYAxisTickValues(yAxisTickValues);
    const yAxisValueSpan = forceValuePositive(yAxisMinValue) + forceValuePositive(yAxisMaxValue);
    const ratio = yAxisHeight / yAxisValueSpan;
    const totalStacksValue = barStacks.reduce(forceAddStackItems, 0);
    const positiveStacksValue = barStacks
      .filter(testIsCurrentStackPositive)
      .reduce(addStackItems, 0);
    const maskId = `${NAME_SPACE}-chart--bar-mask-${chartId}${barId}`;
    const barZeroBase = yAxisMaxValue * ratio + padding.top;
    const barLeft = barWidthRaw * barIndex + divider;
    const barTop = barZeroBase - positiveStacksValue * ratio;
    const barWidth = Math.max(barWidthRaw - divider * 2, 0);
    const barHeight = createStackHeight(totalStacksValue * ratio);
    const createStack = this.createStackThunk({
      ratio,
      barZeroBase,
      barLeft,
      barWidth,
      barStacks,
    });

    // The bar is setup into two main parts.
    //
    // 1. The "stacked" <rect />'s that make up the visual part of the bars. Each
    //    "stack" can have independent click and tooltip interactions applied to it.
    //
    //      My Graph.
    //      ¯¯¯¯¯¯¯¯¯
    //   8 .
    //     |             .----.
    //   6 |             |////|
    //     |     .----.  |////|
    //   4 |     |////|---.///|
    //     | .----.///|   |///|---.
    //   2 | |    |///|   |///|   |
    //     |_ _ _ _ _ _ _ _ _ _ _ _ _ .
    //   0     ()  ()  ()  ()  ()
    //         Vv  Ww  Xx  Yy  Zz
    //
    // 2. The "mask" that rounds the top corners of the entire bar. Bars that
    //    original from the "zero" base line (either above or below) do NOT have
    //    rounded corners from the origination side.

    return (
      <g>
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {this.createBarMask({
              barLeft,
              barTop,
              barWidth,
              barHeight,
            })}
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>{barStacks.map(createStack)}</g>
      </g>
    );
  };
}

export default StackedBar;

StackedBar.propTypes = {
  chartId: PropTypes.string,
  isBarStacked: PropTypes.bool,
  onBarClick: PropTypes.func,
  isToolTipHidden: PropTypes.bool,
  updateToolTip: PropTypes.func,
  createToolTipMessage: PropTypes.func,
  colorStacks: PropTypes.arrayOf(PropTypes.string),
  colorActive: PropTypes.string,
  activeBars: PropTypes.object,
  datum: PropTypes.object,
  index: PropTypes.number,
  barWidth: PropTypes.number,
  padding: PropTypes.object,
  yAxisTickValues: PropTypes.arrayOf(PropTypes.number),
  yAxisHeight: PropTypes.number,
};
