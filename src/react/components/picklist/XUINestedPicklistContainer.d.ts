import * as React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  id: string;
  /**
   * _Uncontrolled only_: Whether the container is open or closed by default.
   */
  isDefaultOpen?: boolean;
  /**
   * When true checkboxes will be added to the layout of the child components.
   */
  isMultiselect?: boolean;
  /**
   * _Controlled only_: Whether the container is open or closed.
   */
  isOpen?: boolean;
  /**
   * Callback when the container is closed.
   */
  onClose?: () => void;
  /**
   * Callback when the container is opened.
   */
  onOpen?: () => void;
  qaHook?: string;
  secondaryProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Whether to truncate text instead of wrapping.
   */
  shouldTruncate?: boolean;
}

export default class XUINestedPicklistContainer extends React.PureComponent<Props> {
  /**
   * Check if the the container is open.
   */
  isOpen(): boolean;

  /**
   * Open the container.
   */
  open(): void;

  /**
   * Close the container.
   */
  close(): void;

  /**
   * A convenience method to toggle the open/close of the container.
   */
  toggle(): void;
}
