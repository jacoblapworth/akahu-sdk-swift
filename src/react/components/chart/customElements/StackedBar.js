import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { alwaysPositive } from '../helpers';

class StackedBar extends Component {

	handleToolTipShow = ({ event, bar, barIndex, stackIndex = null }) => {
		const { updateToolTip } = this.props;
		const { pageX, pageY } = event;

		updateToolTip([pageX, pageY], { ...bar, barIndex, stackIndex });
	};

	handleToolTipHide = () => this.props.updateToolTip();

	render = () => {
		const {
			id,
			barColors,
			onBarClick,
			barWidth,
			activeColor,
			updateToolTip,
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

		const {
			y: stacks,
			isBarActive,
			activeStacks = []
		} = bar;
		const yTop = alwaysPositive(y);
		const yBottom = alwaysPositive(y0);
		const maxStack = stacks.reduce((acc, stack) => acc + stack, 0);
		const maxHeight = yBottom - yTop;
		const ratio = maxHeight / maxStack;
		const maskId = `xui-chart--${id}--bar${barIndex}`;
		const radius = 5;
		const divider = 10;
		const xLocation = barWidth * barIndex;
		const yLocation = stackIndex => yTop + stacks.slice(stackIndex + 1).reduce((acc, stack) => acc + stack * ratio, 0);
		const isActive = stackIndex => isBarActive || activeStacks.indexOf(stackIndex) >= 0;

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

		return (
			<g>
				<defs>
					<mask
						id={maskId}
						maskUnits="userSpaceOnUse">
						<rect
							x={xLocation + divider}
							y={yTop}
							width={barWidth - divider * 2}
							height={maxHeight + radius}
							rx={radius}
							ry={radius}
							fill="white"
						/>
					</mask>
				</defs>

				<g mask={`url(#${maskId})`}>
					{ stacks.map((stack, stackIndex) => (
						<rect
							{...{
								...(onBarClick && {
									onClick: event => onBarClick(event, { ...bar, barIndex, stackIndex }),
									style: { cursor: 'pointer' }
								}),
								...(updateToolTip && {
									onMouseMove: event => this.handleToolTipShow({ event, bar, barIndex, stackIndex }),
									onMouseLeave: this.handleToolTipHide
								})
							}}
							key={stackIndex}
							height={stack * ratio}
							width={barWidth}
							x={xLocation}
							y={yLocation(stackIndex)}
							fill={isActive(stackIndex) ? activeColor : barColors[stackIndex]}
						/>
					)) }
				</g>
			</g>
		);
	};
}

export default StackedBar;
