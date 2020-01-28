import React from 'react';

import { modalSizes } from './constants';

interface Props {
  /**
   * ID for the element containing an appropriate description for screen readers.
   */
  ariaDescribedBy?: string;
  /**
   * ID for the element containing an appropriate label for screen readers.
   */
  ariaLabelledBy?: string;
  children?: React.ReactNode;
  className?: string;
  /**
   * Label to be applied to the modal close "X" button, for accessibility.
   *
   * Recommended English value: *Close*
   */
  closeButtonLabel: string;
  /**
   * Custom classes for the close button.
   */
  closeClassName?: string;
  /**
   * If the modal will use the default XUI style layout.
   */
  defaultLayout?: boolean;
  /**
   * If the modal will be hidden when the user presses the Esc key.
   */
  hideOnEsc?: boolean;
  /**
   * If the modal will be hidden when the user clicks the overlay.
   */
  hideOnOverlayClick?: boolean;
  id?: string;
  /**
   * Whether the modal wrapping element should be a `form` rather than a `section`. Allows the
   * enter key to activate the submit button inside native form controls.
   */
  isForm?: boolean;
  /**
   * Whether the modal is visible.
   */
  isOpen?: boolean;
  /**
   * Renders the modal to the bottom of the current document when `true`, otherwise it is rendered
   * inline.
   */
  isUsingPortal?: boolean;
  /**
   * The target that should listen to key presses. Defaults to the window.
   */
  keyListenerTarget?: HTMLElement;
  /**
   * Custom classes for the mask.
   */
  maskClassName?: string;
  /**
   * Bind a function to fire when the modal requests to be hidden.
   */
  onClose?: () => void;
  qaHook?: string;
  /**
   * Restricts focus to elements within the modal while it is open.
   */
  restrictFocus?: boolean;
  /**
   * The size (aka width) of this modal.
   */
  size?: keyof typeof modalSizes;
}

export default class XUIModal extends React.Component<Props> {}
