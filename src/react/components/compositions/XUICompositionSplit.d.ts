import React from 'react';

interface Props {
  className?: string;
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
   * Determines whether the main content takes full width of page.
   *
   * Defaults to `false`.
   */
  isInfinite?: boolean;
  /**
   * More recent or important content.
   */
  primary: React.ReactNode;
  /**
   * Lets you set a retain width value so that the layout doesn't change when the viewport is equal
   * to or larger than the width specified.
   */
  retainWidth?: '' | 'small';
  /**
   * Accompanying content.
   */
  secondary: React.ReactNode;
}

export default class XUICompositionSplit extends React.PureComponent<Props> {}
