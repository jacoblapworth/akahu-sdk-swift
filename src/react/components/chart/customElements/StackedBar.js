import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import getTargetPosition from '../helpers/targetposition';
import {NAME_SPACE, BAR_RADIUS, BAR_PADDING_X} from '../helpers/constants';
import {alwaysPositive} from '../helpers/utilities';
import {createStackTop, createStackHeight, createInteractionParams} from '../helpers/bars';

class StackedBar extends PureComponent {
	handleToolTipShow = (event, barData) => {
		const {updateToolTip, createToolTipMessage} = this.props;
		const position = getTargetPosition(event);
		const message = createToolTipMessage(barData);
		updateToolTip(position, message);
	};

	handleToolTipHide = () => this.props.updateToolTip();

	createStackThunk = ({ratio, barBottom, barLeft, barWidth, barStacks}) => (barStack, stackIndex) => {
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
		const {id: barId} = barData;
		const testIsActive = stackIndex => (activeBars[barId] || []).indexOf(stackIndex) >= 0;
		const stackTop = createStackTop({barBottom, barStacks, ratio, stackIndex});
		const stackHeight = createStackHeight({barStack, ratio});
		const interactionParams = createInteractionParams(isBarStacked, {...barData, barIndex, stackIndex});
		const clickProps = onBarClick && {
			onClick: event => onBarClick(event, interactionParams),
			style: {cursor: 'pointer'}
		};
		const toolTipProps = !isToolTipHidden && {
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
						fill={colorActive}
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

		const radius = BAR_RADIUS;
		const divider = BAR_PADDING_X;
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
	yAxisMaxValue: PropTypes.number,
	yAxisHeight: PropTypes.number,
	y0: PropTypes.number,
};
