import * as React from 'react';

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
   * Nav content or controls for detail content.
   */
  master: React.ReactNode;
  /**
   * Lets you set a retain width value so that the layout doesn't change when the viewport is equal
   * to or larger than the width specified.
   */
  retainWidth?: '' | 'small';
}

export default class XUICompositionMasterDetailHeader extends React.PureComponent<Props> {}
