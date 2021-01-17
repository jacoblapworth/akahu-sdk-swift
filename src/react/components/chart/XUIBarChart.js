import React from 'react';
import PropTypes from 'prop-types';
import { CHART_HEIGHT, BAR_ACTIVE_COLOR } from './helpers/constants';
import ChartScaffold from './customElements/ChartScaffold';
import ChartLoader from './customElements/ChartLoader';
import ChartEmpty from './customElements/ChartEmpty';

const XUIBarChart = props => {
  const { barsData, isLoading } = props;
  const isEmpty = !barsData.length;

  switch (true) {
    case isLoading:
      return <ChartLoader {...props} />;
    case isEmpty:
      return <ChartEmpty {...props} />;
    default:
      return <ChartScaffold {...props} />;
  }
};

export default XUIBarChart;

XUIBarChart.propTypes = {
  /** Identifies active bars or individual bar stacks. */
  activeBars: PropTypes.object,

  /** Customise the default bar color with a style that can be injected into a "fill"
   * property e.g #000 */
  barColor: PropTypes.oneOfType([
    /** Single style for standard bar. */
    PropTypes.string,
    /** Multiple styles for stacked bar. */
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /** Customise the active colour with a style that can be injected into a "fill"
   * property e.g #000 */
  barColorActive: PropTypes.string,

  /** Bar data consisting of an x-axis label and y-axis value(s). */
  barsData: PropTypes.arrayOf(
    PropTypes.shape({
      /** Optional URL for a custom avatar image when the chart‘s `xAxisType` is `avatar`. */
      avatarUrl: PropTypes.string,

      /** Unique identifier for an individual bar. */
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

      /** X-axis label (in the correct format for the "xAxisType") */
      x: PropTypes.string,

      /** Y-axis value(s) */
      y: PropTypes.oneOfType([
        /** Single value for standard bar. */
        PropTypes.number,
        /** Multiple values for stacked bar. */
        PropTypes.arrayOf(PropTypes.number),
      ]),
    }),
  ),

  /** Chart description for enhanced accessibility. */
  chartDescription: PropTypes.string,

  /** Specify the charts height in pixels */
  chartHeight: PropTypes.number,

  /** Unique identifier for the chart. */
  chartId: PropTypes.string.isRequired,

  /** Chart title for presentation and / or accessibility purposes. */
  chartTitle: PropTypes.string.isRequired,

  /** Function to create a customised message for when a bar "hover" interaction occurs. */
  createBarToolTipMessage: PropTypes.func,

  /** Function to create a custom pagination message based on the charts "current" and "total"
   * pagination "panels". */
  createPaginationMessage: PropTypes.func,

  /** Function to create a custom representation of the y-axis labels. */
  createYAxisLabelFormat: PropTypes.func,

  /**
   * The message to show if the chart is empty.
   * <br />
   * Recommended English value: *There is no data to display*
   */
  emptyMessage: PropTypes.node,

  /** Override the default empty state component. */
  emptyStateComponent: PropTypes.element,

  /**
   * Optional prop for users to modify the empty chart state icon, if required for localisation.
   * Defaults to the chart icon, if no value is provided.
   */
  emptyStateIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),

  /** Override the native responsive scrolling behaviour for clickable pagination buttons. */
  hasPagination: PropTypes.bool,

  /** Identify if the bar made out of multiple smaller stacked bars. */
  isBarStacked: PropTypes.bool,

  /** Hide tooltip when referencing standard or stacked bars. */
  isBarToolTipHidden: PropTypes.bool,

  /** Hide title visually (still represented in HTML for accessibility). */
  isChartTitleHidden: PropTypes.bool,

  /** Show the charts "loading" state. */
  isLoading: PropTypes.bool,

  /** Hide tooltip when referencing components that reside in the x-axis */
  isXAxisToolTipHidden: PropTypes.bool,

  /** A text of representation of the bar or each bar stack. */
  keyLabel: PropTypes.oneOfType([
    /** Single label for standard bar. */
    PropTypes.string,
    /** Multiple labels for stacked bar. */
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * Key title inside the dropdown container.
   * <br />
   * Recommended English value: *Graph key*
   */
  keyTitle: PropTypes.string.isRequired,

  /**
   * Accessibility label for the `<XUILoader>`. This is required if the
   * `isLoading` prop is set to `true`.
   * <br />
   * Recommended English value: *Loading*
   */
  loadingAriaLabel: PropTypes.string,

  /** Handler for when a bar "click" interaction occurs. */
  onBarClick: PropTypes.func,

  /**
   * Accessibility title for pagination button.
   * This is required if `hasPagination` is true.
   * <br />
   * Recommended English value: *Next page*
   */
  paginationNextTitle(props, propName) {
    if (props.hasPagination && typeof props[propName] !== 'string') {
      return new Error(
        'XUIBarChart: `paginationNextTitle` is required when `hasPagination` is true.',
      );
    }
    return null;
  },

  /**
   * Accessibility title for pagination button.
   * This is required if `hasPagination` is true.
   * <br />
   * Recommended English value: *Previous page*
   */
  paginationPreviousTitle(props, propName) {
    if (props.hasPagination && typeof props[propName] !== 'string') {
      return new Error(
        'XUIBarChart: `paginationPreviousTitle` is required when `hasPagination` is true.',
      );
    }
    return null;
  },

  qaHook: PropTypes.string,

  /** Specify the charys x-axis label format. */
  xAxisType: PropTypes.oneOf(['abbreviation', 'avatar', 'standard']),

  /** The maximum numbers of bars to distribute in the x-axis */
  xAxisVisibleItems: PropTypes.number,

  /** The maximum number to place at the top of the y-axis */
  yAxisDefaultTopValue: PropTypes.number,
};

XUIBarChart.defaultProps = {
  barColorActive: BAR_ACTIVE_COLOR,
  barsData: [],
  chartHeight: CHART_HEIGHT,
  xAxisType: 'standard',
  yAxisDefaultTopValue: 0,
};
