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
import getGroupPosition, { testIsCloseEnough, createChartPadding } from '../helpers';
import { CHART_HEIGHT } from '../helpers/constants';
import { createYAxisLabelFormatThunk, createYAxisTickValues } from '../helpers/yaxis';
import createBarStats, { createBarColorStacks, findMaxTotalBarStacks, enrichParams } from '../helpers/bars';
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
		this.updatePanel = this.updatePanel.bind(this);
	}

	rootNode = null;
	contentNode = null;

	state = {
		chartWidth: 0,
		yAxisWidth: 0,
		xAxisHeight: 0,
		toolTipPosition: { /* left: 0, right: 0, width, 0, height: 0 */ },
		toolTipData: { /* bar: {}, stack: {} */ },
		panelCurrent: 1,
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

	updateToolTip = (nextPosition = {}, toolTipData = {}) => {
		// const [nextX = 0, nextY = 0] = nextPosition;
		const {left: nextLeft = 0, top: nextTop = 0, width: nextWidth = 0, height: nextHeight = 0} = nextPosition;
		const {left: prevLeft = 0, top: prevTop = 0, width: prevWidth = 0, height: prevHeight = 0} = this.state.toolTipPosition;
		const shouldUpdate = (
			nextLeft !== prevLeft || nextTop !== prevTop ||
			nextWidth !== prevWidth || nextHeight !== prevHeight
		);

		if (shouldUpdate) {
			this.setState({
				...this.state,
				toolTipPosition: nextPosition,
				toolTipData
			});
		}
	};

	// updateToolTip = (nextPosition = [], toolTipData = {}) => {
	// 	const [nextX = 0, nextY = 0] = nextPosition;
	// 	const [prevX, prevY] = this.state.toolTipPosition;
	// 	const shouldUpdate = nextX !== prevX && nextY !== prevY;

	// 	if (shouldUpdate) {
	// 		this.setState({
	// 			...this.state,
	// 			toolTipPosition: [nextX, nextY],
	// 			toolTipData
	// 		});
	// 	}
	// };

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
			const panelWidth = contentNode.clientWidth;
			const victoryWidth = victoryNode.clientWidth;
			const hasLeftShadow = scrollLeft > 0;
			const hasRightShadow = (scrollLeft + panelWidth) < victoryWidth;
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

	updatePanel = panelCurrent => {
		const minPage = 1;
		const { state, props } = this;
		const maxPage = props.bars.length;
		const sanitisedPage = panelCurrent < minPage ? minPage : Math.min(panelCurrent, maxPage);
		const shouldUpdate = sanitisedPage !== state.panelCurrent;
		if (shouldUpdate) {
			this.setState({
				...state,
				panelCurrent: sanitisedPage
			});
		}
	};

	render = () => {
		const { props, state } = this;
		const params = enrichParams(state, props, barChartTheme);
		const {

			// Chart...
			chartId, chartTitle, chartDescription, chartTheme, chartHeight, chartWidth,
			chartPadding, chartTop, chartBottom, chartLeft, chartClassName,

			// Panels...
			panelWidth, panelCurrent, panelsTotal,

			// Bars...
			barsData, barsWidth, barWidth, onBarClick,

			// Pagination...
			hasPagination, createPaginationMessage,

			// Tooltip...
			toolTipData, toolTipPosition, hasToolTip, createToolTipMessage,

			// Colors...
			colorActive, colorStacks,

			// Y-Axis...
			yAxisMaxValue, yAxisHeight, yAxisTickValues, createYAxisLabelFormat,

			// X-Axis...
			xAxisTickValues,

			// Label...
			keyLabel,

		} = params;

		return (
			<div className={chartClassName}>

				<div className="xui-chart--header">

					{chartTitle && <h2 className="xui-chart--title">{chartTitle}</h2>}

					{ hasPagination && panelsTotal > 1 && (
						<ContentPagination
							current={panelCurrent}
							total={panelsTotal}
							createMessage={createPaginationMessage}
							updatePanel={this.updatePanel}
						/>
					) }

					{ keyLabel && (
						<ChartKey
							labels={keyLabel}
							colors={colorStacks}
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
						// overflow: 'hidden'
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
						theme={chartTheme}

						// Push bars "middle" alignment back into the graph "bar" area.
						// We are controlling this via bespoke components and therefore reset
						// everything back to zero.
						domainPadding={{ x: 0 }}

						// Height of the "svg" graph (px).
						height={chartHeight}
						width={chartWidth}

						// The space around the "bar" area and the rest of the graph.
						padding={chartPadding}

						containerComponent={(
							<VictoryContainer
								responsive
								title={chartTitle}
								desc={chartDescription}
							/>
						)}>

						<VictoryAxis
							dependentAxis
							orientation="left"
							scale={{ y: 'linear' }}
							padding={chartPadding}
							tickFormat={createYAxisLabelFormat}
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
							bottom: `${chartBottom}px`,
							left: `${chartLeft}px`,
							top: `${chartTop}px`,
							width: `${panelWidth}px`
						}}
					/>

					<div
						className="xui-chart--content"
						ref={node => (this.contentNode = node)}
						style={{
							left: `${chartLeft}px`,
							width: `${panelWidth}px`
						}}
						onScroll={this.throttledContentScroll}>

						<div
							className="xui-chart--scroll"
							style={{
								...hasPagination && {
									transform: `translateX(-${(panelCurrent - 1) * 100}%)`
								}
							}}>

							<VictoryChart
								theme={chartTheme}

								// Push bars "middle" alignment back into the graph "bar" area.
								// We are controlling this via bespoke components and therefore reset
								// everything back to zero.
								domainPadding={{ x: 0 }}

								// Height of the "svg" graph (px).
								height={chartHeight}
								width={barsWidth}

								// The space around the "bar" area and the rest of the graph.
								padding={chartPadding}

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
									padding={chartPadding}
									width={barsWidth}
									tickValues={xAxisTickValues}

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
											labelWidth={barWidth}
											labelTop={chartHeight - chartBottom}
										/>
									)}
								/>

								<VictoryBar
									data={barsData}
									y={findMaxTotalBarStacks}

									groupComponent={<GroupWrapper className="xui-chart--bars" />}

									dataComponent={(
										<StackedBar
											chartId={chartId}
											padding={chartPadding}
											yAxisMaxValue={yAxisMaxValue}
											yAxisHeight={yAxisHeight}
											colorStacks={colorStacks}
											onBarClick={onBarClick}
											colorActive={colorActive}
											barWidth={barWidth}
											updateToolTip={createToolTipMessage && this.updateToolTip}
										/>
									)}
								/>

							</VictoryChart>
						</div>
					</div>

					{hasToolTip && (
						<GraphTooltip
							createMessage={createToolTipMessage(toolTipData)}
							toolTipPosition={toolTipPosition}
							// toolTipY={toolTipY}
							// toolTipX={toolTipX}
						/>
					)}

				</div>
			</div>
		);
	};
}

export default ChartScaffold;

ChartScaffold.propTypes = {};
