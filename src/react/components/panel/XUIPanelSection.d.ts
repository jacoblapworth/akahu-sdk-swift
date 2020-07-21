import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Classes to add to the `xui-panel--section-header` node.
   */
  headerClassName?: string;
  /**
   * Text or node to be placed in a `xui-panel--section-header` node.
   */
  heading?: React.ReactNode;
  qaHook?: string;
}

type Props = BaseProps & React.HTMLAttributes<HTMLDivElement>;

export default class XUIPanelSection extends React.PureComponent<Props> {}
