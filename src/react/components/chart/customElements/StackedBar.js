import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { barChartTheme } from '../helpers/theme';
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
			barColor,
			onBarClick,
			barWidth: rawBarWidth,
			activeColor,
			updateToolTip,
			axisHeight,
			data,
			datum: bar,
			maxYDomain,
			index: barIndex,
			y0: rawYOffset,
			// horizontal,
			// padding,
			// polar,
			// origin,
			// scale,
			// style,
			// width,
			// height,
			// x,
			// y,
			// x0
		} = this.props;

		const {
			y: stacks,
			isBarActive,
			activeStacks = []
		} = bar;

		if (!stacks.length) return null;

		const yBottom = alwaysPositive(rawYOffset);
		const maxStack = stacks.reduce((acc, stack) => acc + stack, 0);
		const ratio = axisHeight / maxYDomain;
		const maskId = `xui-chart--${id}--bar${barIndex}`;
		const radius = 3;
		const divider = 10;
		const xPos = (rawBarWidth * barIndex) + divider;
		const yPos = yBottom - (maxStack * ratio);
		const trimmedBarWidth = alwaysPositive(rawBarWidth - (divider * 2));
		const barHeight = (maxStack * ratio) + radius;
		const yLocation = stackIndex => yBottom - stacks.slice(0, stackIndex).reduce((acc, stack) => acc + stack * ratio, 0) - (stacks[stackIndex] * ratio);
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
							x={xPos}
							y={yPos}
							width={trimmedBarWidth}
							height={barHeight}
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
							x={xPos}
							y={yLocation(stackIndex)}
							width={trimmedBarWidth}
							height={stack * ratio}
							fill={activeColor && isActive(stackIndex)
								? activeColor
								: barColor[stackIndex]}
						/>
					)) }
				</g>
			</g>
		);
	};
}

export default StackedBar;
