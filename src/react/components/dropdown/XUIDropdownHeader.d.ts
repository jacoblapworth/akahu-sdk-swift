import * as React from 'react';

interface Props {
  /**
   * The `aria-label` attribute for the back button.
   *
   * Recommended English value: *Back*
   */
  backButtonAriaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether the primary button is disabled.
   */
  isPrimaryButtonDisabled?: boolean;
  /**
   * Whether the secondary button is disabled.
   */
  isSecondaryButtonDisabled?: boolean;
  /**
   * Content to be added on the left side of the header, will come after the back button if one is
   * present.
   */
  leftContent?: React.ReactNode;
  /**
   * Callback for when the back button is pressed (back button will not be rendered if this is not
   * provided).
   */
  onBackButtonClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Callback for when the primary button is clicked.
   */
  onPrimaryButtonClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Callback for when the secondary button is clicked.
   */
  onSecondaryButtonClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Whether the header should only be shown at mobile sizes.
   */
  onlyShowForMobile?: boolean;
  /**
   * Content to render within the primary button.
   */
  primaryButtonContent?: React.ReactNode;
  qaHook?: string;
  /**
   * Content to be added on the right side of the header, will come before the primary/secondary
   * button present.
   */
  rightContent?: React.ReactNode;
  /**
   * Content to render within the secondary button.
   */
  secondaryButtonContent?: React.ReactNode;
  /**
   * If present, is used in the header.
   */
  title?: React.ReactNode;
}

export default class XUIDropdownHeader extends React.PureComponent<Props> {
  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: HTMLElement | null;
}
