import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import cn from 'classnames';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryContainer,
  VictoryLabel,
  Line,
} from 'victory';
import { barChartTheme } from '../helpers/theme';
import { testIsCloseEnough, pause } from '../helpers/utilities';
import getGroupPosition from '../helpers/groupposition';
import { NAME_SPACE, CHART_WIDTH, X_AXIS_HEIGHT, Y_AXIS_WIDTH } from '../helpers/constants';
import { enrichParams } from '../helpers/bars';
import StackedBar from './StackedBar';
import GraphTooltip from './GraphTooltip';
import ContentPagination from './ContentPagination';
import ChartKey from './ChartKey';

class ChartScaffold extends PureComponent {
  constructor() {
    super();
    this.testIsChartMounted = this.testIsChartMounted.bind(this);
    this.updateChartWidth = this.updateChartWidth.bind(this);
    this.updateToolTip = this.updateToolTip.bind(this);
    this.updatePanel = this.updatePanel.bind(this);
  }

  rootNode;
  contentNode;
  throttledAction;

  state = {
    chartWidth: CHART_WIDTH,
    yAxisWidth: Y_AXIS_WIDTH,
    xAxisHeight: X_AXIS_HEIGHT,
    toolTipPosition: {
      /* left: 0, right: 0, width, 0, height: 0 */
    },
    toolTipMessage: null,
    panelCurrent: 1,
    hasXAxisCalculated: false,
    hasYAxisCalculated: false,
  };

  // We utilise a "pause" system to ensure the various DOM elements update before
  // measuring them. This intentional millisecond latency can create an edge case
  // where if the component is unmounted between this time then the reference DOM
  // nodes are no longer relevant. In that regard we have a hook to check that the
  // component is still mounted before continuing with the render sequence.
  isChartMounted = false;
  testIsChartMounted = () => this.isChartMounted;

  componentDidMount = () => {
    this.isChartMounted = true;
    const throttledResize = throttle(this.updateChartWidth, 1000);
    window.addEventListener('resize', throttledResize);
    this.throttledContentScroll = throttle(this.handleContentScroll, 100);
    this.updateChartWidth();
    this.updateYAxisWidth();
    this.updateXAxisHeight();
    this.handleContentScroll();
  };

  componentWillUnmount = () => {
    this.isChartMounted = false;

    if (this.throttledAction) {
      this.throttledAction.cancel();
      window.removeEventListener('resize', this.throttledAction);
    }
  };

  componentDidUpdate = () => {
    const shouldUpdate = this.testIsChartMounted();

    if (shouldUpdate) {
      this.updateChartWidth();
      this.updateYAxisWidth();
      this.updateXAxisHeight();
      this.handleContentScroll();
    }
  };

  updateToolTip = (nextPosition = {}, toolTipMessage = null) => {
    const { left: nextLeft, top: nextTop, width: nextWidth, height: nextHeight } = nextPosition;
    const {
      left: prevLeft,
      top: prevTop,
      width: prevWidth,
      height: prevHeight,
    } = this.state.toolTipPosition;
    const shouldUpdate =
      nextLeft !== prevLeft ||
      nextTop !== prevTop ||
      nextWidth !== prevWidth ||
      nextHeight !== prevHeight;

    if (shouldUpdate) {
      this.setState({
        toolTipPosition: nextPosition,
        toolTipMessage,
      });
    }
  };

  updateChartWidth = () => {
    const { rootNode, state } = this;
    const chartWidth = rootNode && rootNode.offsetWidth;
    const shouldUpdate = !testIsCloseEnough(chartWidth || CHART_WIDTH, state.chartWidth);

    if (shouldUpdate) {
      this.setState({ chartWidth });
    }
  };

  updateXAxisHeight = () =>
    pause(this.testIsChartMounted, this.props.barsData, () => {
      const { rootNode, state } = this;
      const xAxisNode = rootNode && rootNode.querySelector(`.${NAME_SPACE}-chart--xaxis`);
      const xAxisHeight = xAxisNode && getGroupPosition(xAxisNode).height;
      const shouldUpdate = !testIsCloseEnough(xAxisHeight || X_AXIS_HEIGHT, state.xAxisHeight);

      if (shouldUpdate) {
        this.setState({ xAxisHeight });
      } else {
        this.setState({ hasXAxisCalculated: true });
      }
    });

  updateYAxisWidth = () =>
    pause(this.testIsChartMounted, this.props.barsData, () => {
      const { rootNode, state } = this;
      const yAxisNode = rootNode && rootNode.querySelector(`.${NAME_SPACE}-chart--yaxis`);
      const yAxisWidth = yAxisNode && getGroupPosition(yAxisNode).width;
      const shouldUpdate = !testIsCloseEnough(yAxisWidth || Y_AXIS_WIDTH, state.yAxisWidth);

      if (shouldUpdate) {
        this.setState({ yAxisWidth });
      } else {
        this.setState({ hasYAxisCalculated: true });
      }
    });

  handleContentScroll = () => {
    const {
      rootNode,
      contentNode,
      props: { hasPagination },
    } = this;
    const victoryNode = contentNode && contentNode.querySelector('.VictoryContainer');
    const shouldUpdate = !hasPagination && rootNode && contentNode && victoryNode;

    if (shouldUpdate) {
      const { scrollLeft } = contentNode;
      const panelWidth = contentNode.clientWidth;
      const victoryWidth = victoryNode.clientWidth;
      const hasLeftShadow = scrollLeft > 0;
      const hasRightShadow = scrollLeft + panelWidth < victoryWidth;
      const leftClassName = `${NAME_SPACE}-chart-has-left-shadow`;
      const rightClassName = `${NAME_SPACE}-chart-has-right-shadow`;

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
    const maxPage = props.barsData.length;
    const sanitisedPage = panelCurrent < minPage ? minPage : Math.min(panelCurrent, maxPage);
    const shouldUpdate = sanitisedPage !== state.panelCurrent;

    if (shouldUpdate) {
      this.setState({ panelCurrent: sanitisedPage });
    }
  };

  findScrollOffset = ({ hasPagination, panelWidth, panelCurrent }) =>
    hasPagination
      ? (panelCurrent - 1) * panelWidth
      : (this.contentNode && this.contentNode.scrollLeft) || 0;

  render() {
    const { props, state } = this;
    // Linter can't detect the use of the state properties unless the state is spread.
    const params = enrichParams({ ...state }, props, barChartTheme);
    const {
      qaHook,

      // Chart...
      chartId,
      isBarStacked,
      hasChartHeader,
      chartTitle,
      hasChartTitle,
      chartDescription,
      chartClassName,
      chartTheme,
      chartHeight,
      chartWidth,
      chartPadding,
      chartTop,
      chartBottom,
      chartLeft,

      // Panels...
      panelWidth,
      panelCurrent,
      panelsTotal,

      // Bars...
      barsData,
      barsWidth,
      barWidth,
      onBarClick,
      activeBars,
      barColorActive,
      barColorStacks,

      // Pagination...
      hasPagination,
      createPaginationMessage,
      paginationLabel,
      paginationNextTitle,
      paginationPreviousTitle,

      // Tooltip...
      hasToolTip,
      isBarToolTipHidden,
      isXAxisToolTipHidden,
      toolTipMessage,
      toolTipPosition,
      createBarToolTipMessage,

      // Y-Axis...
      yAxisHeight,
      yAxisTickValues,
      createYAxisLabelFormat,

      // X-Axis...
      xAxisTickValues,
      XAxisLabel,

      // Key...
      hasKey,
      keyTitle,
      keyLabel,
    } = params;

    return (
      <div data-automationid={qaHook} className={chartClassName}>
        {hasChartHeader && (
          <div className={`${NAME_SPACE}-chart--header`}>
            {hasChartTitle && (
              <h2
                data-automationid={qaHook && `${qaHook}--title`}
                className={`${NAME_SPACE}-chart--title`}
              >
                {chartTitle}
              </h2>
            )}

            {hasPagination && (
              <ContentPagination
                qaHook={qaHook && `${qaHook}--pagination`}
                current={panelCurrent}
                total={panelsTotal}
                createMessage={createPaginationMessage}
                updatePanel={this.updatePanel}
                paginationLabel={paginationLabel}
                paginationNextTitle={paginationNextTitle}
                paginationPreviousTitle={paginationPreviousTitle}
              />
            )}

            {hasKey && (
              <ChartKey
                qaHook={qaHook && `${qaHook}--key`}
                title={keyTitle}
                labels={keyLabel}
                colors={barColorStacks}
              />
            )}
          </div>
        )}

        <div
          className={cn(
            `${NAME_SPACE}-chart--position`,
            (!this.state.hasXAxisCalculated || !this.state.hasYAxisCalculated) &&
              `${NAME_SPACE}-u-hidden-content`,
          )}
        >
          <div
            className={`${NAME_SPACE}-chart--base`}
            ref={node => (this.rootNode = node)}
            style={{
              // These two styles are required for IE 11 where the SVG will not fill
              // its parent container correctly unless the height is explicitly
              // stipulated. This breaks that width:height ratio so an overflow:hidden
              // is needed to tame the beast.
              // NOTE: The overflow could cause problems with the tooltip down the
              // line.
              height: `${chartHeight}px`,
              overflow: 'hidden',
            }}
          >
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
              containerComponent={
                <VictoryContainer responsive title={chartTitle} desc={chartDescription} />
              }
            >
              <VictoryAxis
                dependentAxis
                orientation="left"
                scale={{ y: 'linear' }}
                padding={chartPadding}
                tickFormat={createYAxisLabelFormat}
                tickValues={yAxisTickValues}
                groupComponent={
                  <g
                    data-automationid={qaHook && `${qaHook}--yaxis`}
                    className={`${NAME_SPACE}-chart--yaxis`}
                  />
                }
                tickLabelComponent={<VictoryLabel className={`${NAME_SPACE}-chart--measure`} />}
                // Add the zero at the start of the axis (is hidden by default).
                crossAxis={false}
              />
            </VictoryChart>

            <div
              className={`${NAME_SPACE}-chart--shadows`}
              style={{
                bottom: `${chartBottom}px`,
                left: `${chartLeft}px`,
                top: `${chartTop}px`,
                width: `${panelWidth}px`,
              }}
            />

            <div
              className={`${NAME_SPACE}-chart--content`}
              ref={node => (this.contentNode = node)}
              style={{
                left: `${chartLeft}px`,
                width: `${panelWidth}px`,
              }}
              onScroll={this.throttledContentScroll}
            >
              <div
                className={`${NAME_SPACE}-chart--scroll`}
                style={{
                  ...(hasPagination && {
                    transform: `translateX(-${(panelCurrent - 1) * 100}%)`,
                  }),
                }}
              >
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
                  containerComponent={
                    <VictoryContainer
                      // We want the content to spill out of the charting bounds
                      // (due to our responsive scrolling system). In that regard
                      // we turn off then "responsive" flag which removes the
                      // { height: 100%; width: 100%; } overides and instead rely
                      // on our static sizes that we measure.
                      responsive={false}
                      title={chartTitle}
                      desc={chartDescription}
                    />
                  }
                >
                  <VictoryAxis
                    dependentAxis={false}
                    orientation="bottom"
                    scale={{ x: 'linear' }}
                    padding={chartPadding}
                    width={barsWidth}
                    tickValues={xAxisTickValues}
                    groupComponent={
                      <g
                        data-automationid={qaHook && `${qaHook}--xaxis`}
                        className={`${NAME_SPACE}-chart--xaxis`}
                      />
                    }
                    gridComponent={
                      <Line
                        type="grid"
                        style={{
                          stroke: 'transparent',
                          strokeWidth: 0,
                        }}
                      />
                    }
                    tickLabelComponent={
                      <XAxisLabel
                        labelWidth={barWidth}
                        labelTop={chartHeight - chartBottom}
                        labelHeight={chartBottom}
                        isToolTipHidden={isXAxisToolTipHidden}
                        updateToolTip={this.updateToolTip}
                        barsData={barsData}
                      />
                    }
                  />

                  <VictoryBar
                    data={barsData}
                    groupComponent={
                      <g
                        data-automationid={qaHook && `${qaHook}--bars`}
                        className={`${NAME_SPACE}-chart--bars`}
                      />
                    }
                    dataComponent={
                      <StackedBar
                        chartId={chartId}
                        isBarStacked={isBarStacked}
                        yAxisTickValues={yAxisTickValues}
                        yAxisHeight={yAxisHeight}
                        colorStacks={barColorStacks}
                        colorActive={barColorActive}
                        onBarClick={onBarClick}
                        activeBars={activeBars}
                        barWidth={barWidth}
                        padding={chartPadding}
                        isToolTipHidden={isBarToolTipHidden}
                        createToolTipMessage={createBarToolTipMessage}
                        updateToolTip={this.updateToolTip}
                      />
                    }
                  />
                </VictoryChart>
              </div>
            </div>
          </div>

          {hasToolTip && (
            <GraphTooltip
              {...toolTipPosition}
              qaHook={qaHook}
              message={toolTipMessage}
              // Describes the current state of the contents horizontal scroll for
              // either a native or pagination system. This is needed to get an
              // accurate representation of the tooltip HTML trigger that needs
              // to rest overtop of the nested SVG element. We unfortunately cannot
              // place the tooltip inside the scrolling container as there are
              // overflow edge cases that are frequently encountered on each edge
              // of the wrapping container.
              offset={this.findScrollOffset(params) - chartLeft}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ChartScaffold;

ChartScaffold.propTypes = {
  qaHook: PropTypes.string,
  chartId: PropTypes.string.isRequired,
  chartTitle: PropTypes.string.isRequired,
  isChartTitleHidden: PropTypes.bool,
  chartDescription: PropTypes.string,
  chartHeight: PropTypes.number,
  keyTitle: PropTypes.string,
  keyLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  barsData: PropTypes.array,
  barColor: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  isBarStacked: PropTypes.bool,
  onBarClick: PropTypes.func,
  activeBars: PropTypes.object,
  barColorActive: PropTypes.string,
  createBarToolTipMessage: PropTypes.func,
  isBarToolTipHidden: PropTypes.bool,
  isXAxisToolTipHidden: PropTypes.bool,
  xAxisType: PropTypes.string,
  xAxisVisibleItems: PropTypes.number,
  yAxisDefaultTopValue: PropTypes.number,
  createYAxisLabelFormat: PropTypes.func,
  hasPagination: PropTypes.bool,
  paginationLabel: PropTypes.string,
  paginationNextTitle: PropTypes.string,
  paginationPreviousTitle: PropTypes.string,
  createPaginationMessage: PropTypes.func,
};
