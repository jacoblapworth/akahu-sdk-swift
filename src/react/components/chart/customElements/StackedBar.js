import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import getTargetPosition from '../helpers/targetposition';
import {BAR_ACTIVE, NAME_SPACE} from '../helpers/constants';
import {alwaysPositive} from '../helpers/utilities';

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

class StackedBar extends PureComponent {
	handleToolTipShow = (event, barData) => {
		const {updateToolTip, createToolTipMessage} = this.props;
		const position = getTargetPosition(event);
		const message = createToolTipMessage(barData);
		updateToolTip(position, message);
	};

	handleToolTipHide = () => this.props.updateToolTip();

	createStackThunk = ({ratio, barBottom, barLeft, barWidth, barStacks}) => (barStack, stackIndex = null) => {
		const {
			onBarClick,
			updateToolTip,
			createToolTipMessage,
			colorStacks,
			activeBars,
			index: barIndex,
			datum: barData,
		} = this.props;
		const {id: barId} = barData;
		const testIsActive = stackIndex => (activeBars[barId] || []).indexOf(stackIndex) >= 0;
		const stackTop = createStackTop({barBottom, barStacks, ratio, stackIndex});
		const stackHeight = createStackHeight({barStack, ratio});
		const interactionParams = {...barData, barIndex, barId, stackIndex};
		const clickProps = onBarClick && {
			onClick: event => onBarClick(event, interactionParams),
			style: {cursor: 'pointer'}
		};
		const toolTipProps = (updateToolTip && createToolTipMessage) && {
			onMouseEnter: event => this.handleToolTipShow(event, interactionParams),
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

		const {id: barId, y: barStacks} = barData;
		if (!barStacks.length) return null;

		const radius = 3;
		const divider = 10;
		const ratio = yAxisHeight / yAxisMaxValue;
		const totalStack = barStacks.reduce((acc, stack) => acc + stack, 0);
		const maskId = `${NAME_SPACE}-chart--bar-mask-${chartId}${barId}`;
		const barBottom = alwaysPositive(rawYOffset);
		const barLeft = (barWidthRaw * barIndex) + divider;
		const barTop = alwaysPositive(barBottom - (totalStack * ratio));
		const barWidth = alwaysPositive(barWidthRaw - (divider * 2));
		const barHeight = alwaysPositive((totalStack * ratio) + radius);
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

StackedBar.propTypes = {
	chartId: PropTypes.string,
	onBarClick: PropTypes.func,
	updateToolTip: PropTypes.func,
	createToolTipMessage: PropTypes.func,
	colorStacks: PropTypes.arrayOf(PropTypes.string),
	activeBars: PropTypes.object,
	datum: PropTypes.object,
	index: PropTypes.number,
	barWidth: PropTypes.number,
	yAxisMaxValue: PropTypes.number,
	yAxisHeight: PropTypes.number,
	y0: PropTypes.number,
};
