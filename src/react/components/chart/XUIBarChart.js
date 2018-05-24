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
			bars,
			isStacked,
			hasPagination,
			barColors,
			onBarClick,
			activeColor,
			createToolTipContent,
			maxVisibleItems
		} = this.props;
		const {
			chartWidth,
			yAxisWidth,
			xAxisHeight,
			toolTipPosition,
			toolTipData,
			currentPage
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
		const {
			barsWidth,
			barWidth,
			panelsTotal,
		} = createBarStats({ bars, maxVisibleItems, contentWidth, hasPagination });
		const addUpStacks = ({ y }) => y.reduce((acc, index) => acc + index, 0);
		const maxY = bars.map(addUpStacks).sort().reverse()[0];
		const chartClassName = cn('xui-chart', {
			[`xui-chart-has-pagination`]: hasPagination
		});

		return (
			<div className={chartClassName}>

				{title && <h2>{title}</h2>}
				{title && description && <p>{description}</p>}

				{ hasPagination && panelsTotal > 1 && (
					<ContentPagination
						currentPage={currentPage}
						updatePage={this.updatePage}
					/>
				) }

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
