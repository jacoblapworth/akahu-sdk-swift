import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { barChartTheme } from '../helpers/theme';
import { alwaysPositive } from '../helpers';

class StackedBar extends Component {

	handleToolTipShow = (event, { barData, barIndex, stackIndex = null }) => {
		const { updateToolTip, padding } = this.props;
		const getTargetValue = reference => event.target[reference].baseVal.value;
		const left = getTargetValue('x') + padding.left;
		const top = getTargetValue('y');
		const height = getTargetValue('height');
		const width = getTargetValue('width');
		const position = { left, top, width, height };
		const data = { ...barData, barIndex, stackIndex };

		updateToolTip(position, data);
	};

	handleToolTipHide = () => this.props.updateToolTip();

	render = () => {
		const {
			chartId,
			colorStacks,
			colorActive,
			onBarClick,
			barWidth: barWidthRaw,
			updateToolTip,
			yAxisMaxValue,
			yAxisHeight,

			// Victory...
			datum: barData,
			index: barIndex,
			y0: rawYOffset,

		} = this.props;

		const { y: barStacks, isBarActive, activeStacks = [] } = barData;
		if (!barStacks.length) return null;

		const radius = 3;
		const divider = 10;
		const ratio = yAxisHeight / yAxisMaxValue;
		const maxStack = barStacks.reduce((acc, stack) => acc + stack, 0);
		const maskId = `xui-chart--${chartId}--bar${barIndex}`;
		const barBottom = alwaysPositive(rawYOffset);
		const barLeft = (barWidthRaw * barIndex) + divider;
		const barTop = barBottom - (maxStack * ratio);
		const barWidth = alwaysPositive(barWidthRaw - (divider * 2));
		const barHeight = (maxStack * ratio) + radius;
		const testIsActive = stackIndex => isBarActive || activeStacks.indexOf(stackIndex) >= 0;
		const createStackTop = stackIndex => barBottom - (
			barStacks
				.slice(0, stackIndex)
				.reduce((acc, stack) => acc + stack * ratio, 0)
		) - (barStacks[stackIndex] * ratio);

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
							x={barLeft}
							y={barTop}
							width={barWidth}
							height={barHeight}
							rx={radius}
							ry={radius}
							fill="white"
						/>
					</mask>
				</defs>

				<g mask={`url(#${maskId})`}>
					{ barStacks.map((barStack, stackIndex) => (
						<rect
							{...{
								...(onBarClick && {
									onClick: event => onBarClick(event, { ...barData, barIndex, stackIndex }),
									style: { cursor: 'pointer' }
								}),
								...(updateToolTip && {
									onMouseEnter: event => this.handleToolTipShow(event, { barData, barIndex, stackIndex }),
									onMouseLeave: this.handleToolTipHide
								})
							}}
							key={stackIndex}
							x={barLeft}
							y={createStackTop(stackIndex)}
							width={barWidth}
							height={barStack * ratio}
							fill={colorActive && testIsActive(stackIndex)
								? colorActive
								: colorStacks[stackIndex]}
						/>
					)) }
				</g>
			</g>
		);
	};
}

export default StackedBar;
