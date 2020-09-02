import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CHART_HEIGHT, BAR_ACTIVE_COLOR } from './helpers/constants';
import ChartScaffold from './customElements/ChartScaffold';
import ChartLoader from './customElements/ChartLoader';
import ChartEmpty from './customElements/ChartEmpty';

class XUIBarChart extends PureComponent {
  render = () => {
    const { props } = this;
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
}

export default XUIBarChart;

XUIBarChart.propTypes = {
  qaHook: PropTypes.string,

  /** Unique identifier for the chart. */
  chartId: PropTypes.string.isRequired,

  /** Chart title for presentation and / or accessibility purposes. */
  chartTitle: PropTypes.string.isRequired,

  /** Hide title visually (still represented in HTML for accessibility). */
  isChartTitleHidden: PropTypes.bool,

  /** Chart description for enhanced accessibility. */
  chartDescription: PropTypes.string,

  /** Specify the charts height in pixels */
  chartHeight: PropTypes.number,

  /** Identify if the bar made out of multiple smaller stacked bars. */
  isBarStacked: PropTypes.bool,

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

  /** Bar data consisting of an x-axis label and y-axis value(s). */
  barsData: PropTypes.arrayOf(
    PropTypes.shape({
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

      /** Optional URL for a custom avatar image when the chart‘s `xAxisType` is `avatar`. */
      avatarUrl: PropTypes.string,
    }),
  ),

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

  /** Handler for when a bar "click" interaction occurs. */
  onBarClick: PropTypes.func,

  /** Identifies active bars or individual bar stacks. */
  activeBars: PropTypes.object,

  /** Function to create a customised message for when a bar "hover" interaction occurs. */
  createBarToolTipMessage: PropTypes.func,

  /** Hide tooltip when referencing standard or stacked bars. */
  isBarToolTipHidden: PropTypes.bool,

  /** Hide tooltip when referencing components that reside in the x-axis */
  isXAxisToolTipHidden: PropTypes.bool,

  /** Specify the charys x-axis label format. */
  xAxisType: PropTypes.oneOf(['abbreviation', 'avatar', 'standard']),

  /** The maximum numbers of bars to distribute in the x-axis */
  xAxisVisibleItems: PropTypes.number,

  /** The maximum number to place at the top of the y-axis */
  yAxisDefaultTopValue: PropTypes.number,

  /** Function to create a custom representation of the y-axis labels. */
  createYAxisLabelFormat: PropTypes.func,

  /** Override the native responsive scrolling behaviour for clickable pagination buttons. */
  hasPagination: PropTypes.bool,

  /** Function to create a custom pagination message based on the charts "current" and "total"
   * pagination "panels". */
  createPaginationMessage: PropTypes.func,

  /**
   * Accessibility title for pagination button.
   * This is required if `hasPagination` is true.
   * <br />
   * Recommended English value: *Next page*
   */
  paginationNextTitle(props, propName) {
    // eslint-disable-next-line react/destructuring-assignment
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
    // eslint-disable-next-line react/destructuring-assignment
    if (props.hasPagination && typeof props[propName] !== 'string') {
      return new Error(
        'XUIBarChart: `paginationPreviousTitle` is required when `hasPagination` is true.',
      );
    }
    return null;
  },

  /**
   * The message to show if the chart is empty.
   * <br />
   * Recommended English value: *There is no data to display*
   */
  emptyMessage: PropTypes.node,

  /** Override the default empty state component. */
  emptyStateComponent: PropTypes.element,

  /** Show the charts "loading" state. */
  isLoading: PropTypes.bool,

  /**
   * Accessibility label for the `<XUILoader>`. This is required if the
   * `isLoading` prop is set to `true`.
   * <br />
   * Recommended English value: *Loading*
   */
  loadingLabel: PropTypes.string,

  /**
   * Optional prop for users to modify the empty chart state icon, if required for localisation.
   * Defaults to the chart icon, if no value is provided.
   */
  emptyStateIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),

  /**
   * Optional prop for users to modify the info key button icon, if required for localisation.
   * Defaults to the info icon, if no value is provided.
   */
  keyIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),

  /**
   * Optional prop for users to modify the pagination navigation icon, if required for localisation.
   * Defaults to the arrow icon, if no value is provided.
   */
  paginationIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
};

XUIBarChart.defaultProps = {
  chartHeight: CHART_HEIGHT,
  barsData: [],
  barColorActive: BAR_ACTIVE_COLOR,
  xAxisType: 'standard',
  yAxisDefaultTopValue: 0,
};
