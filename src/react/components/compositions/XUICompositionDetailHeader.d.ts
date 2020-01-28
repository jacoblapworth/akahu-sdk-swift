import React from 'react';

interface Props {
  className?: string;
  /**
   * Main content.
   */
  detail: React.ReactNode;
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
}

export default class XUICompositionDetailHeader extends React.PureComponent<Props> {}
