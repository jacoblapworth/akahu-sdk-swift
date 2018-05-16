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
import baseChartTheme, { barChartTheme } from './helpers/theme';

console.log({
	material: VictoryTheme.material,
	grayscale: VictoryTheme.grayscale,
	baseChartTheme,
	barChartTheme
});

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

	componentDidUpdate = () => {
		this.updateChartWidth();
		this.updateYAxisWidth();
		this.updateXAxisHeight();
	};

	updateToolTip = (toolTipPosition = [0, 0], toolTipData = {}) => {

		this.setState({
			...this.state,
			toolTipPosition,
			toolTipData
		});
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
		const xAxisNode = rootNode && rootNode.querySelector('.xui-x-axis');
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
		const yAxisNode = rootNode && rootNode.querySelector('.xui-y-axis');
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
			title,
			description,
			bars,
			isStacked,
			barColors,
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

		// Ensure things stay positive =)
		// const chartWidth = this.props.xxxxxx

		// const xAxisHeight = this.state.xxxxxx
		// const yAxisWidth = this.state.xxxxxx


		const chartHeight = 300;
		const [toolTipX, toolTipY] = toolTipPosition;
		const hasToolTip = Boolean(createToolTipContent && toolTipX && toolTipY);
		const padding = {
			top: 30,
			bottom: xAxisHeight + 20,
			left: yAxisWidth + 20,
			right: 0
		};
		const barsWidth = chartWidth - padding.left - padding.right;
		const barWidth = barsWidth / bars.length;
		const addUpStacks = ({ y }) => y.reduce((acc, i) => acc + i, 0);
		const maxY = bars.map(addUpStacks).sort().reverse()[0];

		return (
			<div className="xui-chart">
				{title && <h2>{title}</h2>}
				{title && description && <p>{description}</p>}
				<div
					ref={node => (this.rootNode = node)}
					style={{
						// background: 'pink',
						// These two styles are required for IE 11 where the SVG will not fill its
						// parent container correctly unless the height is explicitly stipulated. This
						// breaks that width:height ratio so an overflow:hidden is needed to tame the
						// beast.
						// NOTE: The overflow could cause problems with the tooltip down the line.
						height: `${chartHeight}px`,
						overflow: 'hidden'
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
						height={chartHeight} // Default = 300
						width={chartWidth}
						// The space around the "bar" area and the rest of the graph.
						// padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
						padding={padding}
						// Axis scale types e.g "linear", "time", "log", "sqrt".
						// scale={{ x: "linear", y: "linear" }} // Default = "linear"

						// Theme.
						// http://formidable.com/open-source/victory/guides/themes/
						// theme={VictoryTheme.material} // Default = VictoryTheme.grayscale
						// theme={VictoryTheme.theme} // Default = VictoryTheme.grayscale
						// theme={theme}
						theme={barChartTheme}

						// standalone={false}

						containerComponent={(
							<VictoryContainer
								responsive={true}
								title={title}
								desc={description}
							/>
						)}
					>

						<VictoryAxis
							dependentAxis={true}
							orientation="left"
							// offsetX={30}
							// offsetY={30}
							scale={{ y: 'linear' }}
							padding={padding}

							// xAxisHeight={xAxisHeight}
							// y={1000}
							// domainPadding={{ x: [0, 0], y: [0, 0] }}
							// domainPadding={{ x: [30, 30], y: [30, 30] }}
							domain={[0, maxY]}
							// height={chartHeight}
							// tickCount={5}
							// tickValues={[2.11, 3.9, 6.1, 8.05]}
							groupComponent={<GroupWrapper className="xui-y-axis" />}
							// containerComponent={<GroupWrapper className="xui-y-axis" />}
							// className="myLabel"
							// axisLabelComponent={<VictoryLabel className="xXxXxXxXx"/>}
							axisComponent={(
								<Line
									type="axis"
									style={{
										stroke: 'transparent',
										strokeWidth: 0
									}}
								/>
							)}

							tickLabelComponent={<VictoryLabel className="xui-measure"/>}
						/>

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
							width={chartWidth}
							// width={barWidth * bars.length}
							tickValues={bars.map(({ x }) => x)}
							groupComponent={<GroupWrapper className="xui-x-axis" />}
							// containerComponent={<GroupWrapper className="xui-x-axis" />}

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
								<StackedLabel
									barWidth={barWidth}
									leftOffset={padding.left}
								/>
							)}
						/>

						<VictoryBar
							data={bars}
							dataComponent={(
								<StackedBar
									barColors={barColors}
									barWidth={barWidth}
									activeColor={activeColor}
									xOffset={padding.left}
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

							groupComponent={<GroupWrapper className="xui-bars" />}
							// containerComponent={<GroupWrapper className="xui-bars" />}
						/>

					</VictoryChart>
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



/*

.- - -.- - - - - - - - - - - - - - - -.
¦  y  ¦                               ¦
¦  .  ¦                               ¦
¦  a  ¦            b a r s            ¦
¦  x  ¦                               ¦
¦  i  ¦                               ¦
¦  s  ¦                               ¦
¦ - - ¦ - - - - - - - - - - - - - - - ¦
¦ /// ¦          x . a x i s          ¦
°- - -°- - - - - - - - - - - - - - - -°

*/
