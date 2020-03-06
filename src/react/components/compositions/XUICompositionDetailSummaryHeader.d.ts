import React from 'react';

interface Props {
  className?: string;
  /**
   * Main content.
   */
  detail: React.ReactNode;
  /**
   * Whether to apply pre-set widths to columns of the composition grid.
   *
   * Defaults to `true`.
   */
  hasAutoColumnWidths?: boolean;
  /**
   * Whether to apply pre-set spacing to the outside of the composition grid.
   *
   * Defaults to `true`.
   */
  hasAutoSpaceAround?: boolean;
  /**
   * Whether to apply a pre-set grid-gap between all grid areas.
   *
   * Defaults to `true`.
   */
  hasGridGap?: boolean;
  /**
   * Header content or component.
   */
  header: React.ReactNode;
  /**
   * Determines whether the main content takes full width of page.
   *
   * Defaults to `false`.
   */
  isInfinite?: boolean;
  /**
   * Lets you set a retain width value so that the layout doesn't change when the viewport is equal
   * to or larger than the width specified.
   */
  retainWidth?: '' | 'small';
  /**
   * Summary content or component.
   */
  summary: React.ReactNode;
}

export default class XUICompositionDetailSummaryHeader extends React.PureComponent<Props> {}
