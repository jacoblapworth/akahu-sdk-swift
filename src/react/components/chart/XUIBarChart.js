import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryStack,
	VictoryContainer,
	VictoryTheme,
	VictoryLabel,
	Line
} from 'victory';
import StackedBar from './customElements/StackedBar';
import StackedLabel from './customElements/StackedLabel';
import GroupWrapper from './customElements/GroupWrapper';
import GraphTooltip from './customElements/GraphTooltip';
import getGroupPosition, { testIsCloseEnough } from './helpers';
import { barChartTheme } from './helpers/theme';

class XUIBarChart extends Component {

	constructor() {
		super();
		this.updateChartWidth = this.updateChartWidth.bind(this);
		this.updateToolTip = this.updateToolTip.bind(this);
	}

	rootNode = null;

	state = {
		chartWidth: 100,
		yAxisWidth: 0,
		xAxisHeight: 0,
		toolTipPosition: [0, 0],
		toolTipData: { /* bar: {}, stack: {} */ }
	};

	componentDidMount = () => {
		const throttledAction = throttle(this.updateChartWidth, 1000);
		window.addEventListener('resize', throttledAction);
		this.updateChartWidth();
		this.updateYAxisWidth();
		this.updateXAxisHeight();
	};

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.throttledAction);
		this.throttledAction.cancel();
	};

	componentDidUpdate = () => {
		this.updateChartWidth();
		this.updateYAxisWidth();
		this.updateXAxisHeight();
	};

	updateToolTip = (nextPosition = [], toolTipData = {}) => {
		const [nextX = 0, nextY = 0] = nextPosition;
		const [prevX, prevY] = this.state.toolTipPosition;
		const isNewPosition = nextX !== prevX && nextY !== prevY;

		if (isNewPosition) {
			this.setState({
				...this.state,
				toolTipPosition: [nextX, nextY],
				toolTipData
			});
		}
	};

	updateChartWidth = () => {
		const { rootNode, state } = this;
		const chartWidth = (rootNode && rootNode.offsetWidth) || 100;
		const isCloseEnough = testIsCloseEnough(chartWidth, state.chartWidth);

		if (!isCloseEnough) {
			this.setState({
				...state,
				chartWidth
			});
		}
	};

	updateXAxisHeight = () => {
		const { rootNode, state } = this;
		const xAxisNode = rootNode && rootNode.querySelector('.xui-chart--xaxis');
		const xAxisHeight = xAxisNode ? getGroupPosition(xAxisNode).height : 0;
		const isCloseEnough = testIsCloseEnough(xAxisHeight, state.xAxisHeight);

		if (!isCloseEnough) {
			this.setState({
				...state,
				xAxisHeight
			});
		}
	};

	updateYAxisWidth = () => {
		const { rootNode, state } = this;
		const yAxisNode = rootNode && rootNode.querySelector('.xui-chart--yaxis');
		const yAxisWidth = yAxisNode ? getGroupPosition(yAxisNode).width : 0;
		const isCloseEnough = testIsCloseEnough(yAxisWidth, state.yAxisWidth);

		if (!isCloseEnough) {
			this.setState({
				...state,
				yAxisWidth
			});
		}
	};

	render = () => {
		const {
			id,
			title,
			description,
			bars,
			isStacked,
			barColors,
			onBarClick,
			activeColor,
			createToolTipContent
		} = this.props;
		const {
			chartWidth,
			yAxisWidth,
			xAxisHeight,
			toolTipPosition,
			toolTipData
		} = this.state;

		const chartHeight = 300;
		const [toolTipX, toolTipY] = toolTipPosition;
		const hasToolTip = Boolean(createToolTipContent && toolTipX && toolTipY);
		const padding = {
			// A gap threshold to safegaurd against overflow.
			top: 2,
			// Gap between x-axis line + label height + bottom (with room for scroll bars).
			bottom: 20 + xAxisHeight + 20,
			// Gap between y-axis line + label width.
			left: yAxisWidth + 20,
			// A gap threshold to safegaurd against overflow.
			right: 2
		};
		const contentWidth = chartWidth - padding.left - padding.right;
		const barsTotal = bars.length;
		const rawWidth = contentWidth / barsTotal;
		const minWidth = 34;
		const maxWidth = 200;
		const barWidth = rawWidth < minWidth ? minWidth : Math.min(rawWidth, maxWidth);
		const barsWidth = barWidth * barsTotal;
		const addUpStacks = ({ y }) => y.reduce((acc, index) => acc + index, 0);
		const maxY = bars.map(addUpStacks).sort().reverse()[0];

		return (
			<div className="xui-chart">

				{title && <h2>{title}</h2>}
				{title && description && <p>{description}</p>}

				<div
					className="xui-chart--base"
					ref={node => (this.rootNode = node)}
					style={{
						// These two styles are required for IE 11 where the SVG will not fill
						// its parent container correctly unless the height is explicitly
						// stipulated. This breaks that width:height ratio so an overflow:hidden
						// is needed to tame the beast.
						// NOTE: The overflow could cause problems with the tooltip down the
						// line.
						height: `${chartHeight}px`,
						overflow: 'hidden'
					}}>

					{
					// We have a situation where we need to create a "responsive" scrolling
					// content area in a static SVG environment that does not allow for such
					// functionally. In that regard we split the chart into two seperate
					// <VictoryChart />'s and overlay them over top of each other.
					//
					// Graph 1 - acts as the base scaffold that holds the y-axis and
					// "presentational" width and height.
					//
					// Graph 2 - holds the scrollable bar content and x-axis labels that
					// lays ontop of Graph 1.
					//
					//
					//                 Graph 1 and 2:
					//                 --------------
					//     .- - -.- - - - - - - - - - - - - - - -.
					//     ¦  y  ¦                               ¦
					//     ¦  .  ¦                               ¦
					//     ¦  a  ¦                               ¦
					//     ¦  x  ¦            b a r s            ¦
					//     ¦  i  ¦                               ¦
					//     ¦  s  ¦                               ¦
					//     ¦ - - ¦ - - - - - - - - - - - - - - - ¦
					//     ¦ /// ¦          x . a x i s          ¦
					//     °- - -°- - - - - - - - - - - - - - - -°
					//     .     .                               .
					//     .     .                               .
					//     .     .           Graph 1:            .
					//     .     .           --------            .
					//     .- - -.- - - - - - - - - - - - - - - -.
					//     ¦  y  ¦ ///////////////////////////// ¦
					//     ¦  .  ¦ ///////////////////////////// ¦
					//     ¦  a  ¦ ///////////////////////////// ¦
					//     ¦  x  ¦ ///////////////////////////// ¦
					//     ¦  i  ¦ ///////////////////////////// ¦
					//     ¦  s  ¦ ///////////////////////////// ¦
					//     ¦ - - ° ///////////////////////////// ¦
					//     ¦ /////////////////////////////////// ¦
					//     °- - - - - - - - - - - - - - - - - - -°
					//           .                               .
					//           .                               .
					//           .           Graph 2:            .
					//           .           --------            .
					//           .- - - - - - - - - - - - - - - -.- - - - - - - - - - - -.
					//           ¦                               ¦ ///////////////////// ¦
					//           ¦                               ¦ ///////////////////// ¦
					//           ¦                               ¦ ///////////////////// ¦
					//           ¦            b a r s            ¦ //  h i d d e n  //// ¦
					//           ¦                               ¦ //  c o n t e n t  // ¦
					//           ¦                               ¦ ///////////////////// ¦
					//           ¦ - - - - - - - - - - - - - - - ¦ ///////////////////// ¦
					//           ¦          x . a x i s          ¦ ///////////////////// ¦
					//           °- - - - - - - - - - - - - - - -°- - - - - - - - - - - -°
					//
					//           ------------->  s c r o l l  t o  v i e w  ------------->
					}

					<VictoryChart
						// Y-axis can restrict maximim axis value like Sam wanted.
						// domain={{ x: [0, 5], y: [0, 5] }}

						// Push bars "middle" alignment back into the graph "bar" area.
						// We are controlling this via bespoke components and therefore reset
						// everything back to zero.
						domainPadding={{ x: 0 }}

						// Height of the "svg" graph (px).
						height={chartHeight} // Default = 300
						width={chartWidth}

						// The space around the "bar" area and the rest of the graph.
						padding={padding}

						theme={barChartTheme}
						containerComponent={(
							<VictoryContainer
								responsive={true}
								title={title}
								desc={description}
							/>
						)}>

						<VictoryAxis
							dependentAxis={true}
							orientation="left"
							// offsetX={30}
							// offsetY={30}
							scale={{ y: 'linear' }}
							padding={padding}

							// xAxisHeight={xAxisHeight}
							// y={1000}

							// Add the zero at the start of the axis (is hidden by default).
							crossAxis={false}

							// domainPadding={{ x: [0, 0], y: [0, 0] }}
							// domainPadding={{ x: [30, 30], y: [30, 30] }}
							domain={[0, maxY]}
							tickCount={3}
							// tickValues={[0, 2.11, 3.9, 6.1, 8.05]}
							groupComponent={<GroupWrapper className="xui-chart--yaxis" />}
							tickLabelComponent={<VictoryLabel className="xui-chart--measure"/>}
						/>

					</VictoryChart>

					<div
						className="xui-chart--content"
						style={{
							left: `${padding.left}px`,
							width: `${contentWidth}px`
						}}>

						<div className="xui-chart--scroll">

							<VictoryChart
								// Y-axis can restrict maximim axis value like Sam wanted.
								// domain={{ x: [0, 5], y: [0, 5] }}

								// Push bars "middle" alignment back into the graph "bar" area.
								// We are controlling this via bespoke components and therefore reset
								// everything back to zero.
								domainPadding={{ x: 0 }}

								// Height of the "svg" graph (px).
								height={chartHeight} // Default = 300
								width={barsWidth}

								// The space around the "bar" area and the rest of the graph.
								padding={padding}

								theme={barChartTheme}
								containerComponent={(
									<VictoryContainer
										// We want the content to spill out of the charting bounds
										// (due to our responsive scrolling system). In that regard
										// we turn off then "responsive" flag which removes the
										// { height: 100%; width: 100%; } overides and instead rely
										// on our static sizes that we measure.
										responsive={false}
									/>
								)}>

								<VictoryAxis
									dependentAxis={false}
									orientation="bottom"
									scale={{ x: 'linear' }}
									padding={padding}
									// domainPadding={{ x: barWidth * 0.5 }}
									// yAxisWidth={yAxisWidth}
									// y={1000}
									// domain={[0, maxY]}
									// domain={"x"}
									// tickCount={5}
									// width={chartWidth}
									width={barsWidth}
									tickValues={bars.map(({ x }) => x)}
									groupComponent={<GroupWrapper className="xui-chart--xaxis" />}
									// containerComponent={<GroupWrapper className="xui-chart--xaxis" />}

									gridComponent={(
										<Line
											type={"grid"}
											style={{
												stroke: 'transparent',
												strokeWidth: 0
											}}
										/>
									)}

									tickLabelComponent={(
										<StackedLabel barWidth={barWidth} />
									)}
								/>

								<VictoryBar
									data={bars}
									dataComponent={(
										<StackedBar
											id={id}
											barColors={barColors}
											onBarClick={onBarClick}
											barWidth={barWidth}
											activeColor={activeColor}
											updateToolTip={createToolTipContent && this.updateToolTip}
										/>
									)}
									// Control the x-axis order.
									// categories={{ x: ['Potato', 'Banana', 'Apple', 'Carrot'] }}

									// Where do the bars position themselfs.
									// alignment="middle"
									// !!! Not working?
									// cornerRadius={3}
									// !!! Not working?
									// barRatio={1.5}
									// Flip the bars 90deg.
									// horizontal={false} // Default = false

									// Labels.
									// - - - - - - - - - - - - - - - - - - - - - - - -
									// labels={(d) => d.y}
									// style={{ labels: { fill: "white" } }}
									// labelComponent={<VictoryLabel dy={30} />}

									// For shared events.
									// name="series-1"

									// !!! Not working?
									// sortKey="x"
									// !!! Not working?
									// sortOrder="ascending"
									// sortOrder="descending"
									// !!! Not working?
									// standalone={false}

									// Let the user set the x-axis from the data schema.
									// x="x"
									y={addUpStacks}
									// Y-axis offset.
									// y0={0}

									groupComponent={<GroupWrapper className="xui-chart--bars" />}
									// containerComponent={<GroupWrapper className="xui-chart--bars" />}
								/>

							</VictoryChart>

						</div>

					</div>
				</div>
				{hasToolTip && (
					<GraphTooltip
						toolTipContent={createToolTipContent(toolTipData)}
						toolTipY={toolTipY}
						toolTipX={toolTipX}
					/>
				)}
			</div>
		);
	};
}

export default XUIBarChart;

XUIBarChart.propTypes = {};
