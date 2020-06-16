import * as React from 'react';

import { XUIIconData } from '../icon/XUIIcon';

interface BarData {
  /**
   * Optional URL for a custom avatar image when the chart‘s `xAxisType` is `avatar`.
   */
  avatarUrl?: string;
  /**
   * Unique identifier for an individual bar.
   */
  id: number | string;
  /**
   * X-axis label (in the correct format for the "xAxisType").
   */
  x: string;
  /**
   * Y-axis value(s). Provide a single value for standard bar, or an array of values for a stacked
   * bar.
   */
  y: number | number[];
}

type BarsData = BarData[];

interface InteractionParams extends BarData {
  stackIndex?: number;
}

type InteractionEvent = React.MouseEvent | React.KeyboardEvent;

interface BaseProps {
  /**
   * Identifies active bars or individual bar stacks.
   */
  activeBars?: {
    [x: number]: boolean | number[];
    [x: string]: boolean | number[];
  };
  /**
   * Customise the default bar color with a style that can be injected into a "fill" property.
   *
   * e.g. `#000`
   *
   * Provide a single style for standard bar, or an array of values fora stacked bar.
   */
  barColor?: string | string[];
  /**
   * Customise the active colour with a style that can be injected into a "fill" property.
   *
   * e.g `#000`
   */
  barColorActive?: string;
  /**
   * Bar data consisting of an x-axis label and y-axis value(s).
   */
  barsData?: BarsData;
  /**
   * Chart description for enhanced accessibility.
   */
  chartDescription?: string;
  /**
   * Specify the chart's height in pixels.
   */
  chartHeight?: number;
  /**
   * Unique identifier for the chart.
   */
  chartId: string;
  /**
   * Chart title for presentation and / or accessibility purposes.
   */
  chartTitle: string;
  /**
   * Function to create a customised message for when a bar "hover" interaction occurs.
   */
  createBarToolTipMessage?: (data: InteractionParams) => React.ReactNode;
  /**
   * Function to create a custom pagination message based on the charts "current" and "total"
   * pagination "panels".
   */
  createPaginationMessage?: (current: string, total: number) => React.ReactNode;
  /**
   * Function to create a custom representation of the y-axis labels.
   */
  createYAxisLabelFormat?: (y: number) => number | string;
  /**
   * Optional prop for users to modify the empty chart state icon, if required for localisation.
   *
   * Defaults to the chart icon, if no value is provided.
   */
  emptyStateIcon?: XUIIconData;
  /**
   * Override the native responsive scrolling behaviour for clickable pagination buttons.
   */
  hasPagination?: boolean;
  /**
   * Identify if the bar made out of multiple smaller stacked bars.
   */
  isBarStacked?: boolean;
  /**
   * Hide tooltip when referencing standard or stacked bars.
   */
  isBarToolTipHidden?: boolean;
  /**
   * Hide title visually (still represented in HTML for accessibility).
   */
  isChartTitleHidden?: boolean;
  /**
   * Show the chart's "loading" state.
   */
  isLoading?: boolean;
  /**
   * Hide tooltip when referencing components that reside in the x-axis.
   */
  isXAxisToolTipHidden?: boolean;
  /**
   * A text of representation of the bar or each bar stack.
   *
   * Provide a single value for standard bar, or an array of values for a stacked
   * bar.
   */
  keyLabel?: string | string[];
  /**
   * Key title inside the dropdown container.
   *
   * Recommended English value: *Graph key*
   */
  keyTitle: string;
  /**
   * Accessibility label for the `XUILoader`. This is required if the `isLoading` prop is set to
   * `true`.
   *
   * Recommended English value: *Loading*
   */
  loadingLabel?: string;
  /**
   * Handler for when a bar "click" interaction occurs.
   */
  onBarClick?: (event: InteractionEvent, item: InteractionParams) => void;
  /**
   * Accessibility title for pagination button. This is required if `hasPagination` is `true`.
   *
   * Recommended English value: *Next page*
   */
  paginationNextTitle?: string;
  /**
   * Accessibility title for pagination button This is required if `hasPagination` is `true`.
   *
   * Recommended English value: *Previous page*
   */
  paginationPreviousTitle?: string;
  qaHook?: string;
  /**
   * Specify the charys x-axis label format.
   */
  xAxisType?: 'abbreviation' | 'avatar' | 'standard';
  /**
   * The maximum numbers of bars to distribute in the x-axis.
   */
  xAxisVisibleItems?: number;
  /**
   * The maximum number to place at the top of the y-axis.
   */
  yAxisDefaultTopValue?: number;
}
interface EmptyStateMessageProps {
  /**
   * The message to show if the chart is empty.
   *
   * Recommended English value: *There is no data to display*
   */
  emptyMessage: React.ReactNode;
}
interface EmptyStateComponentProps {
  /**
   * Override the default empty component.
   */
  emptyStateComponent: React.ReactNode;
}

type EmptyStateProps = EmptyStateMessageProps | EmptyStateComponentProps;
type Props = BaseProps & EmptyStateProps;

export default class XUIBarChart extends React.PureComponent<Props> {}
