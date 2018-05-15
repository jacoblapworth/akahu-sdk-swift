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
import GroupWrapper from './customElements/GroupWrapper';
import GraphTooltip from './customElements/GraphTooltip';
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
		toolTipData: { /* bar: {}, stack: {} */ }
	};

	componentDidMount = () => {
		const throttledAction = throttle(this.updateChartWidth, 1000);
		window.addEventListener("resize", throttledAction);
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
		const xAxisNode = rootNode && rootNode.querySelector(".xui-x-axis");
		const nodes = xAxisNode ? Array.from(xAxisNode.querySelectorAll(".xui-measure")) : [];
		const xAxisHeight = nodes.length ? getGroupPosition(nodes).height : 0;
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
		const yAxisNode = rootNode && rootNode.querySelector(".xui-y-axis");
		const nodes = yAxisNode ? Array.from(yAxisNode.querySelectorAll("text")) : [];
		const yAxisWidth = nodes.length ? getGroupPosition(nodes).width : 0;
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
		const chartHeight = 300;
		const [toolTipX, toolTipY] = toolTipPosition;
		const hasToolTip = Boolean(createToolTipContent && toolTipX && toolTipY);
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

		return (
			<div className="xui-chart">
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

						// standalone={false}

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
                  updateToolTip={createToolTipContent && this.updateToolTip}
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

              groupComponent={<GroupWrapper className="xui-bars" />}
              // containerComponent={<GroupWrapper className="xui-bars" />}
            />

						{/* <g> */}
						{/* <GroupWrapper> */}
              <VictoryAxis
                dependentAxis={true}
                orientation="left"
                // offsetX={30}
                // offsetY={30}
                scale={{ y: "linear" }}
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
              />
						{/* </GroupWrapper> */}
            {/* </g> */}

						{/* <g> */}
							{/* {console.log('domainPadding', barWidth, barWidth * 0.5)} */}
              <VictoryAxis
                dependentAxis={false}
                orientation="bottom"
                scale={{ x: "linear" }}
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
                tickLabelComponent={<StackedLabel {...{barWidth, yAxisWidth}}/>}
              />
            {/* </g> */}
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
