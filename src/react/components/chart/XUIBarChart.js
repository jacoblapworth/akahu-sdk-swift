import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import cn from 'classnames';
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
import ContentPagination from './customElements/ContentPagination';
import ChartKey from './customElements/ChartKey';
import getGroupPosition, { testIsCloseEnough } from './helpers';
import { barChartTheme } from './helpers/theme';

const createBarStats = ({ bars, maxVisibleItems, contentWidth, hasPagination }) => {

	const minWidth = 34;
	const maxWidth = 200;
	const barsTotal = bars.length;
	const limitWithLowerThreshold = baseWidth => Math.max(baseWidth, minWidth);
	const limitWithUpperAndLowerThreshold = baseWidth => baseWidth > maxWidth
		? maxWidth
		: limitWithLowerThreshold(baseWidth)
	const isConstrainedWidth = Boolean(maxVisibleItems);

	// What is an "initial" rough estimate of how many bars are going to fit on a
	// single panel.
	const sanitisedWidth = isConstrainedWidth
		// When requesting a "custom" distribution scenario we don't know exactly what
		// the width is going to be just yet so lets take the raw division for now but
		// still making sure that we do not let the width get too small (e.g if the
		// user requested to fit 1000 items on a panel).
		? limitWithLowerThreshold(contentWidth / maxVisibleItems)
		// In a "standard" scenario we limit the bar widths against the static upper
		// and lower thresholds.
		: limitWithUpperAndLowerThreshold(contentWidth / barsTotal)

	// Now that we have a rough idea of the quantity / width of the bars on a panel
	// we need to make sure all of the dedicated panel content area is filled up.
	//    . - - - - - - .
	//    |    _     ///|
	//    |  _|o|  _ ///| <--- Wasted space that needs to be
	//    | |+|o|_|o|///|      distributed among visible bars.
	//    | |+|o|+|o|///|
	//    ° - - - - - - °
	const wholeBarsPerPanel = Math.floor(contentWidth / sanitisedWidth);
	const hasMultiplePanels = barsTotal > wholeBarsPerPanel;
	const totalBarsPerPanel = hasPagination || !hasMultiplePanels
		? Math.min(wholeBarsPerPanel, barsTotal)
		// When there is an overflow with the native scrolling UI we need to make sure
		// to show "half" of the next panels bar as an aesthetic way to convey hidden
		// content to the user.
		: wholeBarsPerPanel + 0.5;
	const panelsTotal = Math.ceil(barsTotal / totalBarsPerPanel);
	const barWidth = hasMultiplePanels || isConstrainedWidth
		? contentWidth / totalBarsPerPanel
		: sanitisedWidth;
	const barsWidth = barWidth * barsTotal;

	return { barsWidth, barWidth, panelsTotal };

};

class XUIBarChart extends Component {

	constructor() {
		super();
		this.updateChartWidth = this.updateChartWidth.bind(this);
		this.updateToolTip = this.updateToolTip.bind(this);
		this.updatePage = this.updatePage.bind(this);
	}

	rootNode = null;

	state = {
		chartWidth: 100,
		yAxisWidth: 0,
		xAxisHeight: 0,
		toolTipPosition: [0, 0],
		toolTipData: { /* bar: {}, stack: {} */ },
		currentPage: 1,
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
		if (this.throttledAction) {
			this.throttledAction.cancel();
		}
	};

	componentDidUpdate = () => {
		this.updateChartWidth();
		this.updateYAxisWidth();
		this.updateXAxisHeight();
	};

	updateToolTip = (nextPosition = [], toolTipData = {}) => {
		const [nextX = 0, nextY = 0] = nextPosition;
		const [prevX, prevY] = this.state.toolTipPosition;
		const shouldUpdate = nextX !== prevX && nextY !== prevY;

		if (shouldUpdate) {
			this.setState({
				...this.state,
				toolTipPosition: [nextX, nextY],
				toolTipData
			});
		}
	};

	updateChartWidth = () => {
		const { rootNode, state } = this;
		const chartWidth = rootNode ? rootNode.offsetWidth : 100;
		const shouldUpdate = !testIsCloseEnough(chartWidth, state.chartWidth);

		if (shouldUpdate) {
			this.setState({ ...state, chartWidth });
		}
	};

	updateXAxisHeight = () => {
		const { rootNode, state } = this;
		const xAxisNode = rootNode && rootNode.querySelector('.xui-chart--xaxis');
		const xAxisHeight = xAxisNode ? getGroupPosition(xAxisNode).height : 0;
		const shouldUpdate = !testIsCloseEnough(xAxisHeight, state.xAxisHeight);

		if (shouldUpdate) {
			this.setState({ ...state, xAxisHeight });
		}
	};

	updateYAxisWidth = () => {
		const { rootNode, state } = this;
		const yAxisNode = rootNode && rootNode.querySelector('.xui-chart--yaxis');
		const yAxisWidth = yAxisNode ? getGroupPosition(yAxisNode).width : 0;
		const shouldUpdate = !testIsCloseEnough(yAxisWidth, state.yAxisWidth);

		if (shouldUpdate) {
			this.setState({ ...state, yAxisWidth });
		}
	};

	updatePage = currentPage => {
		const minPage = 1;
		const { state, props } = this;
		const maxPage = props.bars.length;
		const sanitisedPage = currentPage < minPage ? minPage : Math.min(currentPage, maxPage);
		const shouldUpdate = sanitisedPage !== state.currentPage;
		if (shouldUpdate) {
			this.setState({
				...state,
				currentPage: sanitisedPage
			});
		}
	};

	render = () => {
		const {
			id,
			title,
			description,
			bars: barsRaw,
			isStacked,
			hasPagination,
			barColors,
			onBarClick,
			activeColor,
			createToolTipContent,
			maxVisibleItems,
			maxYValue: customMaxYValue = 0,
			formatYAxisLabel: customFormatYAxisLabel,
			createPaginationMessage,
		} = this.props;
		const {
			chartWidth,
			yAxisWidth,
			xAxisHeight,
			toolTipPosition,
			toolTipData,
			currentPage
		} = this.state;

		const chartHeight = 400;
		const bars = barsRaw; // barsRaw.map(bar =>  ({...bar, y: bar.y.length ? bar.y : [0.0]}));

		const hasNoXValues = false;


		const [toolTipX, toolTipY] = toolTipPosition;
		const hasToolTip = Boolean(createToolTipContent && toolTipX && toolTipY);
		const padding = {
			// Allow room for y-axis text to be entered on the axis line but not bleed
			// over the viewbox.
			top: 10,
			// Gap between x-axis line + label height + bottom (with room for scroll bars).
			bottom: 20 + xAxisHeight + 20,
			// Gap between y-axis line + label width.
			left: yAxisWidth + 20,
			// A gap threshold to safegaurd against overflow.
			right: 2
		};
		const { top, right, bottom, left } = padding;
		const contentWidth = chartWidth - left - right;
		const {
			barsWidth,
			barWidth,
			panelsTotal,
		} = createBarStats({ bars, maxVisibleItems, contentWidth, hasPagination });
		const addUpStacks = ({ y }) => y.reduce((acc, value) => acc + value, 0);
		const maxBarValue = bars.map(addUpStacks).reduce((acc, value) => Math.max(acc, value), 0);
		const hasPositiveYValue = Boolean(maxBarValue);
		const maxYDomain = Math.max(customMaxYValue, maxBarValue);
		const chartClassName = cn('xui-chart', {
			[`xui-chart-has-pagination`]: hasPagination
		});
		const yAxisHeight = chartHeight - top - bottom;
		const formatYAxisLabel = customFormatYAxisLabel || (() => {
			const decimalPoints = `${maxYDomain}`.split('.')[1] || 0;

			return (rawLabel) => {
				const factor = Math.pow(10, decimalPoints + 1);
  			return Math.round(rawLabel * factor) / factor;
			};
		})();
		const seperateYAxisLabels = (() => {
			const minimumGap = 100;
			const totalLabels = Math.floor(yAxisHeight / minimumGap);
			const increment = hasPositiveYValue || customMaxYValue
				? maxYDomain / totalLabels
				// When there are no y-axis values the domain is [0, 0, 0] by default.
				// This blows up Victory so as a fallback (when there is no data and no
				// custom y-axis value) we simply count up by "1".
				: 1;

			return (
				new Array(totalLabels + 1)
					.fill(0)
					.map((_, index) => increment * index)
			);
		})();

		console.log('CHART', {
			seperateYAxisLabels,
			barsWidth,
			barWidth,
			panelsTotal,
			maxVisibleItems,
			contentWidth,
			maxBarValue,
			maxYDomain,
			yAxisHeight,
		});

		return (
			<div className={chartClassName}>

				<div className="xui-chart--header">

					{title && <h2 className="xui-chart--title">{title}</h2>}

					{ hasPagination && panelsTotal > 1 && (
						<div>
							<ContentPagination
								current={currentPage}
								total={panelsTotal}
								createMessage={createPaginationMessage}
								updatePage={this.updatePage}
							/>
						</div>
					) }

					<div>
						<ChartKey>
							Hello
						</ChartKey>
					</div>

				</div>


				{/*title && description && <p>{description}</p> */}



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

							tickFormat={formatYAxisLabel}
							// tickValues={[0, 2.11, 3.9, 6.1, 8.05]}
							tickValues={seperateYAxisLabels}
							// tickValues={false}

							// domainPadding={{ x: [0, 0], y: [0, 0] }}
							// domainPadding={{ x: [30, 30], y: [30, 30] }}
							// domain={[0, maxYDomain]}
							// domain={[0, 0]}
							// tickCount={3}
							// tickCount={(() => {

							// 	const yAxisHeight = chartHeight - top - bottom;
							// 	const minimumGap = 100;
							// 	const totalLabels = Math.floor(yAxisHeight / minimumGap);

							// 	return totalLabels;

							// })()}

							groupComponent={<GroupWrapper className="xui-chart--yaxis" />}
							tickLabelComponent={<VictoryLabel className="xui-chart--measure"/>}
						/>

					</VictoryChart>

					<div
						className="xui-chart--content"
						style={{
							left: `${left}px`,
							width: `${contentWidth}px`
						}}>

						<div
							className="xui-chart--scroll"
							style={{
								...hasPagination && {
									transform: `translateX(-${(currentPage - 1) * 100}%)`
								}
							}}>

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
										<StackedLabel
											barWidth={barWidth}
											yPos={chartHeight - bottom}
										/>
									)}
								/>

								<VictoryBar
									data={bars}
									dataComponent={(
										<StackedBar
											id={id}
											maxYDomain={maxYDomain}
											axisHeight={yAxisHeight}
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
