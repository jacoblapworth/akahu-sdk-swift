import * as React from 'react';

interface Props {
  className?: string;
  /**
   * The main content.
   */
  detail: React.ReactNode;
  /**
   * Whether to apply pre-set spacing to the outside of the composition grid.
   *
   * Defaults to `true`.
   */
  hasAutoSpaceAround?: boolean;
  /**
   * Determines whether the main content takes full width of page.
   *
   * Defaults to `false`.
   */
  isInfinite?: boolean;
}

export default class XUICompositionDetail extends React.PureComponent<Props> {}
