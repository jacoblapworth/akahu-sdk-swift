import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryContainer,
  VictoryTheme
} from "victory";
import StackedBar from './customElements/StackedBar';
import StackedLabel from './customElements/StackedLabel';
import getGroupPosition, { ap, testIsCloseEnough } from './helpers';

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
		toolTipData: {
			// bar: {},
			// stack: {}
		}
	};

	componentDidMount = () => {
		// console.log("*** componentDidMount");
		const throttledAction = throttle(this.updateChartWidth, 1000);
		window.addEventListener("resize", throttledAction);
		this.updateChartWidth();
		this.updateYAxisWidth();
		this.updateXAxisHeight();
	};

	componentDidUpdate = () => {
		// console.log("*** componentDidUpdate");
		this.updateChartWidth();
		this.updateYAxisWidth();
		this.updateXAxisHeight();
	};

	updateToolTip = (toolTipPosition = [0, 0], toolTipData = {}) => {
		console.log({
			toolTipPosition,
			toolTipData
		});
		// toolTipPosition: [0, 0],
		//   toolTipData: {
		//   // bar: {},
		//   // stack: {}
		// }

		// const [currentX, currentY] = this.state.toolTipPosition;
		// const =

		// if (!testIsCloseEnough(chartWidth, this.state.chartWidth)) {
		this.setState({
			...this.state,
			toolTipPosition,
			toolTipData
		});
		// }
	};

	updateChartWidth = () => {
		const chartWidth = (this.rootNode && this.rootNode.offsetWidth) || 100;

		// console.log("chartWidth", chartWidth);

		if (!testIsCloseEnough(chartWidth, this.state.chartWidth)) {
			this.setState({
				...this.state,
				chartWidth
			});
		}
	};

	updateXAxisHeight = () => {
		// groupNode.querySelectorAll(".xui-measure");
		const xAxisNode =
			this.rootNode && this.rootNode.querySelector(".xui-x-axis");
		const nodes =
			xAxisNode && Array.from(xAxisNode.querySelectorAll(".xui-measure"));
		const { height: xAxisHeight = 0 } = nodes.length
			? getGroupPosition(nodes)
			: {};

		// console.log("xAxisNode | getGroupPosition", { width, height });
		// console.log("xAxisHeight", xAxisHeight);

		if (!testIsCloseEnough(xAxisHeight, this.state.xAxisHeight)) {
			this.setState({
				...this.state,
				xAxisHeight
			});
		}
	};

	updateYAxisWidth = () => {
		const yAxisNode =
			this.rootNode && this.rootNode.querySelector(".xui-y-axis");
		const nodes = yAxisNode && Array.from(yAxisNode.querySelectorAll("text"));
		const { width: yAxisWidth = 0 } = nodes.length
			? getGroupPosition(nodes)
			: {};
		// Weird, the width of a group has an extremely large width,
		// where the (negative) "x" offset actually equates to the width of the y-axis.
		// const yAxisWidth = yAxisNode ? Math.abs(yAxisNode.getBBox().x) : 0;

		// console.log("yAxisWidth", yAxisWidth);

		if (!testIsCloseEnough(yAxisWidth, this.state.yAxisWidth)) {
			this.setState({
				...this.state,
				yAxisWidth
			});
		}
	};

	render = () => {
		const {
			title,
			description,
			bars,
			isStacked,
			barColors,
			activeColor,
			toolTipComponent
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
		const hasToolTip = Boolean(toolTipComponent && toolTipX && toolTipY);
		// const yAxisNode =
		//   this.rootNode && this.rootNode.querySelector(".xui-y-axis");
		// const xAxisNode =
		//   this.rootNode && this.rootNode.querySelector(".xui-x-axis");
		// // Weird, the width of a group has an extremely large width,
		// // where the (negative) "x" offset actually equates to the width of the y-axis.
		// const yAxisWidth = yAxisNode ? Math.abs(yAxisNode.getBBox().x) : 0;
		// const yAxisWidth = 80;
		// const xAxisHeight = 40; // xAxisNode
		// ? chartHeight - Math.abs(yAxisNode.getBBox().y)
		// : 0;

		// console.log("getGroupPosition", getGroupPosition(this.rootNode, xAxisNode));

		// console.log(
		//   this.rootNode &&
		//     this.rootNode.querySelector(".xui-x-axis circle").getBBox()
		// );

		// console.log({
		//   calc: xAxisNode && `${chartHeight} - ${xAxisNode.getClientRects()[0].y}`,
		//   yAxisNode,
		//   xAxisNode,
		//   ySvg: yAxisNode && yAxisNode.getBBox(),
		//   xSvg: xAxisNode && xAxisNode.getBBox(),
		//   yRects: yAxisNode && yAxisNode.getClientRects(),
		//   xRects: xAxisNode && xAxisNode.getClientRects(),
		//   yBound: yAxisNode && yAxisNode.getBoundingClientRect(),
		//   xBound: xAxisNode && xAxisNode.getBoundingClientRect(),
		//   yAxisWidth
		//   // xAxisHeight
		// });

		const padding = {
			top: ap(30),
			bottom: ap(xAxisHeight + 20),
			left: ap(yAxisWidth + 20),
			right: ap(0)
		};
		const barWidth = (chartWidth - padding.left - padding.right) / bars.length;
		const addUpStacks = ({ y }) => y.reduce((acc, i) => acc + i, 0);
		const maxY = bars
			.map(addUpStacks)
			.sort()
			.reverse()[0];

		// console.log('chart "addUpStacks"', addUpStacks);
		// console.log('chart "maxY"', maxY);
		// console.log("chart height", chartHeight);
		// console.log("chart width", chartWidth);
		// console.log("chart padding", padding);

		// animate={}
		// barRatio={0.8}
		// style={{}}
		//
		return (
			<div>
				{title && <h2>{title}</h2>}
				{title && description && <p>{description}</p>}
				<div
					ref={node => (this.rootNode = node)}
					style={{
						// background: "gold",
						// These two styles are required for IE 11 where the SVG will not fill its
						// parent container correctly unless the height is explicitly stipulated. This
						// breaks that width:height ratio so an overflow:hidden is needed to tame the
						// beast.
						// NOTE: The overflow could cause problems with the tooltip down the line.
						height: `${ap(chartHeight)}px`,
						overflow: "hidden"
					}}
				>
					<VictoryChart
						// Y-axis can restrict maximim axis value like Sam wanted.
						// domain={{ x: [0, 5], y: [0, 5] }}

						// Push bars "middle" alignment back into the graph "bar" area.
						domainPadding={{ x: 0 }}
						// domainPadding={{ x: 133 / 3 }}
						// domainPadding={{ x: [30, 30] }}
						// Height of the graph (px).
						height={ap(chartHeight)} // Default = 300
						width={ap(chartWidth)}
						// The space around the "bar" area and the rest of the graph.
						// padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
						padding={padding}
						// Axis scale types e.g "linear", "time", "log", "sqrt".
						// scale={{ x: "linear", y: "linear" }} // Default = "linear"

						// Theme.
						// http://formidable.com/open-source/victory/guides/themes/
						// theme={VictoryTheme.material} // Default = VictoryTheme.grayscale
						// theme={theme}

						containerComponent={
							<VictoryContainer
								responsive={true}
								title={title}
								desc={description}
							/>
						}
					>
						<VictoryBar
							data={bars}
							dataComponent={
								<StackedBar
									barColors={barColors}
									barWidth={ap(barWidth)}
									activeColor={activeColor}
									xOffset={padding.left}
									updateToolTip={toolTipComponent && this.updateToolTip}
									// onMouseMove={() => console.log('OVER')}
									// onMouseLeave={() => console.log('LEAVE')}
								/>
							}
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

							groupComponent={<g className="xui-bars" />}
						/>

						<g>
							<VictoryAxis
								dependentAxis={true}
								orientation="left"
								// offsetX={30}
								// offsetY={30}
								scale={{ y: "linear" }}
								padding={padding}
								// y={1000}
								// domainPadding={{ x: [0, 0], y: [0, 0] }}
								// domainPadding={{ x: [30, 30], y: [30, 30] }}
								domain={[0, maxY]}
								// height={chartHeight}
								// tickCount={5}
								// tickValues={[2.11, 3.9, 6.1, 8.05]}
								containerComponent={<g className="xui-y-axis" />}
							/>
						</g>

						<g>
							<VictoryAxis
								dependentAxis={false}
								orientation="bottom"
								scale={{ x: "linear" }}
								padding={padding}
								domainPadding={{ x: barWidth * 0.5 }}
								// y={1000}
								// domain={[0, maxY]}
								// domain={"x"}
								// tickCount={5}
								width={chartWidth}
								tickValues={bars.map(({ x }) => x)}
								containerComponent={<g className="xui-x-axis" />}
								tickLabelComponent={<StackedLabel />}
							/>
						</g>
					</VictoryChart>
				</div>
				{hasToolTip && (
					<div
						style={{
							top: `${toolTipY + 10}px`,
							left: `${toolTipX + 10}px`,
							height: 0,
							width: 0,
							position: "absolute"
						}}
					>
						{toolTipComponent(toolTipData)}
					</div>
				)}
			</div>
		);
	};
}

export default XUIBarChart;

XUIBarChart.propTypes = {};
