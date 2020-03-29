import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * The footer for a panel. We recommend `XUIPanelFooter`.
   */
  footer?: React.ReactNode;
  /**
   * The header for a panel. We recommend `XUIPanelHeading`.
   */
  heading?: React.ReactNode;
  qaHook?: string;
  /**
   * A node which will be wrapped and rendered as a panel sidebar.
   */
  sidebar?: React.ReactNode;
  /**
   * Main element tag type, for semantic purposes (eg. `main` or `aside`).
   *
   * Defaults to `div`.
   */
  tagName?: string;
}

type Props = BaseProps & React.HTMLAttributes<HTMLElement>;

export default class XUIPanel extends React.PureComponent<Props> {}
