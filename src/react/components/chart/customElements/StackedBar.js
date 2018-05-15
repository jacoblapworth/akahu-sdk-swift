import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ap } from '../helpers';

class StackedBar extends Component {
  // constructor() {
  //   super();
  //   this.handleToolTipShow = this.handleToolTipShow.bind(this);
  //   this.handleToolTipHide = this.handleToolTipHide.bind(this);
  // }

  handleToolTipShow = ({ event, bar, barIndex, stackIndex = null }) => {
    // console.log("MOVE", event.target, event.pageX);
    // updateToolTip([100, 100], bar),
    const { updateToolTip } = this.props;
    const { pageX, pageY } = event;

    updateToolTip([pageX, pageY], { ...bar, barIndex, stackIndex });
  };

  handleToolTipHide = () => this.props.updateToolTip();

  render = () => {
    const {
      barColors,
      barWidth,
      activeColor,
      updateToolTip,
      xOffset,
      data,
      datum: bar,
      horizontal,
      index: barIndex,
      padding,
      polar,
      origin,
      scale,
      style,
      width,
      height,
      x,
      y,
      y0,
      x0
    } = this.props;

    // console.log(this.props);

    const {
      y: stacks,
      onBarClick,
      onStackClick,
      isBarActive,
      activeStacks = []
    } = bar;
    const maxStack = stacks.reduce((acc, stack) => acc + stack, 0);
    const maxHeight = y0 - y;
    const ratio = maxHeight / maxStack;
    const maskId = `bar-${barIndex}`;
    const radius = 5;
    const divider = 10;
    const xLocation = xOffset + barWidth * barIndex;
    const yLocation = stackIndex =>
      y +
      stacks
        .slice(stackIndex + 1)
        .reduce((acc, stack) => acc + stack * ratio, 0);
    const isActive = stackIndex =>
      isBarActive || activeStacks.indexOf(stackIndex) >= 0;

    // The bar is setup into to main parts.
    //
    // 1. The "stacked" <rect />'s that make up the visual part of the bars. These
    // bars are pushed up flush against each other and the x/y axis creating a solid
    // box model.
    //
    //      My Graph.
    //      ¯¯¯¯¯¯¯¯
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
    // 2. The "mask" that rounds the top corners of the entire bar and adds a
    // horisontal divider between the x/y axis and the bars themselfs.
    // NOTE: The mask extends slightly below the bottom of the bar so that their are
    // only rounded corners at the top.

    // console.log("maxk width", barWidth - divider * 2);
    // console.log("mask height", maxHeight + radius);
    // console.log('xxxx', stack * ratio)
    // console.log("stack width", barWidth);
    // console.log("bar", updateToolTip);

    return (
      <g>
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect
              x={ap(xLocation + divider)}
              y={ap(y)}
              width={ap(barWidth - divider * 2)}
              height={ap(maxHeight + radius)}
              rx={ap(radius)}
              ry={ap(radius)}
              fill={"white"}
            />
          </mask>
        </defs>

        <g
          {...{
            // ...(updateToolTip && {
            //   onMouseMove: this.handleToolTipShow,
            //   onMouseLeave: this.handleToolTipHide
            // }),
            ...(onBarClick && {
              onClick: () => onBarClick(bar),
              style: { cursor: "pointer" }
            })
          }}
          mask={`url(#${maskId})`}
          // onMouseMove={() => console.log("MOVE")}
          // onMouseLeave={onMouseLeave}
        >
          {stacks.map((stack, stackIndex) => (
            <rect
              {...{
                ...(!onBarClick &&
                  onStackClick && {
                    onClick: () => onStackClick(bar, stackIndex),
                    style: { cursor: "pointer" }
                  }),
                ...(updateToolTip && {
                  onMouseMove: event =>
                    this.handleToolTipShow({
                      event,
                      bar,
                      barIndex,
                      stackIndex
                    }),
                  onMouseLeave: this.handleToolTipHide
                })
              }}
              key={stackIndex}
              height={ap(stack * ratio)}
              width={ap(barWidth)}
              x={ap(xLocation)}
              y={ap(yLocation(stackIndex))}
              fill={isActive(stackIndex) ? activeColor : barColors[stackIndex]}
            />
          ))}
        </g>
      </g>
    );
  };
}

export default StackedBar;
