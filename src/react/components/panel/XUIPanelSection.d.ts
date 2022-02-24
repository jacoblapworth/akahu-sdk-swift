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

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProps>;

type Props = BaseProps & SpreadProps;

declare const XUIPanelSection: React.FunctionComponent<Props>;
export default XUIPanelSection;
