import * as React from 'react';

import { XUIIconButton } from '../../button';

interface Props {
  className?: string;
  /**
   * Props to be spread onto the close button. This must include an `ariaLabel` to help assistive
   * technologies communicate the purpose of the icon button. See XUIIconButton's documentation for
   * more details.
   */
  closeButtonProps: Omit<React.ComponentProps<typeof XUIIconButton>, 'icon' | 'size'> &
    Partial<Pick<React.ComponentProps<typeof XUIIconButton>, 'size'>>;
  /**
   * Callback to be called when the close button is clicked. If provided along with
   * `closeButtonProps.onClick`, both will be called.
   */
  onClose?: React.MouseEventHandler;
  qaHook?: string;
  /**
   * An optional subtitle for the popover. This is useful for conveying progress during an
   * onboarding experience, for example "Step 1/3".
   */
  subtitle?: React.ReactNode;
  /**
   * The title for the popover. This is required when using this component.
   */
  title: React.ReactNode;
}

declare const XUIPopoverHeader: React.FunctionComponent<Props>;

export default XUIPopoverHeader;
