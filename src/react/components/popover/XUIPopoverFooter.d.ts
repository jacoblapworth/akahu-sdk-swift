import * as React from 'react';

interface Props {
  className?: string;
  /**
   * A `XUIButton` used for the primary action of the popover.
   */
  primaryAction?: React.ReactElement;
  qaHook?: string;
  /**
   * A `XUIButton` used for the secondary action of the popover.
   */
  secondaryAction?: React.ReactElement;
}

declare const XUIPopoverFooter: React.FunctionComponent<Props>;

export default XUIPopoverFooter;
