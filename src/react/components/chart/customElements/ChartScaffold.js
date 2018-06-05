import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import cn from 'classnames';
import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryContainer,
	VictoryLabel,
	Line
} from 'victory';
import { barChartTheme } from '../helpers/theme';
import getGroupPosition, { testIsCloseEnough, createVictoryPadding } from '../helpers';
import { CHART_HEIGHT } from '../helpers/constants';
import { createFormatYAxisLabel, createYAxisTickValues } from '../helpers/yaxis';
import createBarStats, { createBarColorList } from '../helpers/bars';
import StackedBar from './StackedBar';
import StackedLabel from './StackedLabel';
import GroupWrapper from './GroupWrapper';
import GraphTooltip from './GraphTooltip';
import ContentPagination from './ContentPagination';
import ChartKey from './ChartKey';

class ChartScaffold extends Component {

	constructor() {
		super();
		this.updateChartWidth = this.updateChartWidth.bind(this);
		this.updateToolTip = this.updateToolTip.bind(this);
		this.updatePage = this.updatePage.bind(this);
	}

	rootNode = null;
	contentNode = null;

	state = {
		chartWidth: 0,
		yAxisWidth: 0,
		xAxisHeight: 0,
		toolTipPosition: [0, 0],
		toolTipData: { /* bar: {}, stack: {} */ },
		currentPage: 1,
	};

	componentDidMount = () => {
		const throttledResize = throttle(this.updateChartWidth, 1000);
		window.addEventListener('resize', throttledResize);
		this.throttledContentScroll = throttle(this.handleContentScroll, 100);
		this.updateChartWidth();
		this.updateYAxisWidth();
		this.updateXAxisHeight();
		this.handleContentScroll();
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
		this.handleContentScroll();
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
		const chartWidth = rootNode ? rootNode.offsetWidth : 0;
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

	handleContentScroll = () => {
		const { rootNode, contentNode, props: { hasPagination } } = this;
		const victoryNode = contentNode.querySelector('.VictoryContainer');
		const shouldUpdate = !hasPagination && rootNode && contentNode && victoryNode;

		if (shouldUpdate) {
			const scrollLeft = contentNode.scrollLeft;
			const contentWidth = contentNode.clientWidth;
			const victoryWidth = victoryNode.clientWidth;
			const hasLeftShadow = scrollLeft > 0;
			const hasRightShadow = (scrollLeft + contentWidth) < victoryWidth;
			const leftClassName = `xui-chart-has-left-shadow`;
			const rightClassName = `xui-chart-has-right-shadow`;

			if (hasLeftShadow) {
				rootNode.classList.add(leftClassName);
			} else {
				rootNode.classList.remove(leftClassName);
			}

			if (hasRightShadow) {
				rootNode.classList.add(rightClassName);
			} else {
				rootNode.classList.remove(rightClassName);
			}
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
		const { props, state } = this;
		const {
			id,
			title,
			description,
			keyLabel: keyLabelRaw,
			bars: barsRaw,
			barColor: barColorRaw,
			isStacked,
			hasPagination,
			onBarClick,
			activeColor,
			createToolTipContent,
			maxVisibleItems,
			maxYValue: customMaxYValue = 0,
			formatYAxisLabel: formatYAxisLabelRaw,
			createPaginationMessage,
			height: chartHeight = CHART_HEIGHT
		} = props;
		const {
			chartWidth,
			yAxisWidth,
			xAxisHeight,
			toolTipPosition,
			toolTipData,
			currentPage: currentPageRaw
		} = state;

		// We support both "plain" and "stacked" bar styles. The difference is that
		// stacks require arrays of data and plain a single value. Rather than create
		// two duplicate components we augment the plain data to mimic a stacked
		// scenario that has only a single stack.
		const bars = isStacked ? barsRaw : barsRaw.map(bar => ({ ...bar, y: [bar.y] }));
		const keyLabel = keyLabelRaw && (isStacked ? keyLabelRaw : [keyLabelRaw]);
		const barColor = barColorRaw && (isStacked ? barColorRaw : [barColorRaw]);

		console.log(title, { keyLabel, barColor });

		const [toolTipX, toolTipY] = toolTipPosition;
		const isChartNarrow = chartWidth <= 520;
		const colorList = createBarColorList({ bars, custom: barColor, base: barChartTheme.bar.colorScale});
		const hasToolTip = Boolean(createToolTipContent && toolTipX && toolTipY);
		const victoryPadding = createVictoryPadding({ xAxisHeight, yAxisWidth });
		const { top, right, bottom, left } = victoryPadding;
		const contentWidth = chartWidth - left - right;
		const { barsWidth, barWidth, panelsTotal } = createBarStats({ bars, maxVisibleItems, contentWidth, hasPagination });
		const addUpStacks = ({ y }) => y.reduce((acc, value) => acc + value, 0);
		const maxBarValue = bars.map(addUpStacks).reduce((acc, value) => Math.max(acc, value), 0);
		const maxYDomain = Math.max(customMaxYValue, maxBarValue);
		const yAxisHeight = chartHeight - top - bottom;
		const formatYAxisLabel = formatYAxisLabelRaw || createFormatYAxisLabel(maxYDomain);
		const yAxisTickValues = createYAxisTickValues({ maxYDomain, yAxisHeight });
		const chartClassName = cn('xui-chart', {
			[`xui-chart-has-pagination`]: hasPagination,
			[`xui-chart-has-multiline-header`]: hasPagination && createPaginationMessage && isChartNarrow
		});

		// If the user resizes the UI we can get into a situation where the current
		// pagination reference exceeds the available panels.
		const currentPage = Math.min(currentPageRaw, panelsTotal);

		return (
			<div className={chartClassName}>

				<div className="xui-chart--header">

					{title && <h2 className="xui-chart--title">{title}</h2>}

					{ hasPagination && panelsTotal > 1 && (
						<ContentPagination
							current={currentPage}
							total={panelsTotal}
							createMessage={createPaginationMessage}
							updatePage={this.updatePage}
						/>
					) }

					{ keyLabel && (
						<ChartKey
							labels={keyLabel}
							colors={colorList}
						/>
					) }

				</div>

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
						theme={barChartTheme}

						// Push bars "middle" alignment back into the graph "bar" area.
						// We are controlling this via bespoke components and therefore reset
						// everything back to zero.
						domainPadding={{ x: 0 }}

						// Height of the "svg" graph (px).
						height={chartHeight}
						width={chartWidth}

						// The space around the "bar" area and the rest of the graph.
						padding={victoryPadding}

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
							scale={{ y: 'linear' }}
							padding={victoryPadding}
							tickFormat={formatYAxisLabel}
							tickValues={yAxisTickValues}
							groupComponent={<GroupWrapper className="xui-chart--yaxis" />}
							tickLabelComponent={<VictoryLabel className="xui-chart--measure"/>}

							// Add the zero at the start of the axis (is hidden by default).
							crossAxis={false}
						/>

					</VictoryChart>

					<div
						className="xui-chart--shadows"
						style={{
							bottom: `${bottom}px`,
							left: `${left}px`,
							top: `${top}px`,
							width: `${contentWidth}px`
						}}
					/>

					<div
						className="xui-chart--content"
						ref={node => (this.contentNode = node)}
						style={{
							left: `${left}px`,
							width: `${contentWidth}px`
						}}
						onScroll={this.throttledContentScroll}>

						<div
							className="xui-chart--scroll"
							style={{
								...hasPagination && {
									transform: `translateX(-${(currentPage - 1) * 100}%)`
								}
							}}>

							<VictoryChart
								theme={barChartTheme}

								// Push bars "middle" alignment back into the graph "bar" area.
								// We are controlling this via bespoke components and therefore reset
								// everything back to zero.
								domainPadding={{ x: 0 }}

								// Height of the "svg" graph (px).
								height={chartHeight}
								width={barsWidth}

								// The space around the "bar" area and the rest of the graph.
								padding={victoryPadding}

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
									padding={victoryPadding}
									width={barsWidth}
									tickValues={bars.map(({ x }) => x)}

									groupComponent={<GroupWrapper className="xui-chart--xaxis" />}

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
									y={addUpStacks}

									groupComponent={<GroupWrapper className="xui-chart--bars" />}

									dataComponent={(
										<StackedBar
											id={id}
											maxYDomain={maxYDomain}
											axisHeight={yAxisHeight}
											barColor={colorList}
											onBarClick={onBarClick}
											barWidth={barWidth}
											activeColor={activeColor}
											updateToolTip={createToolTipContent && this.updateToolTip}
										/>
									)}
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

export default ChartScaffold;

ChartScaffold.propTypes = {};
