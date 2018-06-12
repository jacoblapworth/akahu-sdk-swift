import React, {Component, Fragment} from 'react';
// import PropTypes from 'prop-types';
import {barChartTheme} from '../helpers/theme';
import getTargetPosition from '../helpers/targetposition';
import {BAR_ACTIVE, NAME_SPACE} from '../helpers/constants';
import {alwaysPositive} from '../helpers';

const createStackTop = ({barBottom, barStacks, ratio, stackIndex}) => {
	const height = alwaysPositive(barStacks[stackIndex] * ratio);
	const offset = (
		barStacks
			.slice(0, stackIndex)
			.reduce((acc, stack) => acc + stack * ratio, 0)
	);

	return alwaysPositive(barBottom - offset - height);
};

// We can encounter the scenario where the disparity between bars total values
// are so large (10 vs 100000000000000) that bars that have data appear to be
// empty. In that regard the minimum value a bar with data can have is 1px
// (to keep the semblance of a visible bar).
const createStackHeight = ({barStack, ratio}) => {
	const height = alwaysPositive(barStack * ratio);

	return height ? Math.max(height, 1) : 0;
};

class StackedBar extends Component {
	handleToolTipShow = (event, {barData, barIndex, stackIndex = null}) => {
		const {updateToolTip, createToolTipMessage} = this.props;
		const position = getTargetPosition(event);
		const message = createToolTipMessage({...barData, barIndex, stackIndex});
		updateToolTip(position, message);
	};

	handleToolTipHide = () => this.props.updateToolTip();

	createStackThunk = ({ratio, barBottom, barLeft, barWidth, barStacks}) => (barStack, stackIndex) => {
		const {
			onBarClick,
			updateToolTip,
			createToolTipMessage,
			colorStacks,
			index: barIndex,
			datum: barData,
		} = this.props;
		const {isBarActive, activeStacks = []} = barData;
		const testIsActive = stackIndex => isBarActive || activeStacks.indexOf(stackIndex) >= 0;
		const stackTop = createStackTop({barBottom, barStacks, ratio, stackIndex});
		const stackHeight = createStackHeight({barStack, ratio});
		const clickProps = onBarClick && {
			onClick: event => onBarClick(event, {...barData, barIndex, stackIndex}),
			style: {cursor: 'pointer'}
		};
		const toolTipProps = (updateToolTip && createToolTipMessage) && {
			onMouseEnter: event => this.handleToolTipShow(event, {barData, barIndex, stackIndex}),
			onMouseLeave: this.handleToolTipHide
		};

		return (
			<Fragment key={stackIndex}>
				<rect
					{...{...clickProps, ...toolTipProps}}
					x={barLeft}
					y={stackTop}
					width={barWidth}
					height={stackHeight}
					fill={colorStacks[stackIndex]}
				/>
				{testIsActive(stackIndex) && (
					<rect
						style={{pointerEvents: 'none'}}
						x={barLeft}
						y={stackTop}
						width={barWidth}
						height={stackHeight}
						fill={BAR_ACTIVE}
					/>
				)}
			</Fragment>
		);
	};

	render = () => {
		const {
			chartId,
			barWidth: barWidthRaw,
			yAxisMaxValue,
			yAxisHeight,

			// Victory...
			datum: barData,
			index: barIndex,
			y0: rawYOffset,
		} = this.props;

		const {y: barStacks} = barData;
		if (!barStacks.length) return null;

		const radius = 3;
		const divider = 10;
		const ratio = yAxisHeight / yAxisMaxValue;
		const maxStack = barStacks.reduce((acc, stack) => acc + stack, 0);
		const maskId = `${NAME_SPACE}-chart--${chartId}--bar${barIndex}`;
		const barBottom = alwaysPositive(rawYOffset);
		const barLeft = (barWidthRaw * barIndex) + divider;
		const barTop = alwaysPositive(barBottom - (maxStack * ratio));
		const barWidth = alwaysPositive(barWidthRaw - (divider * 2));
		const barHeight = alwaysPositive((maxStack * ratio) + radius);
		const createStack = this.createStackThunk({ratio, barBottom, barLeft, barWidth, barStacks});

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
					{barStacks.map(createStack)}
				</g>
			</g>
		);
	};
}

export default StackedBar;
