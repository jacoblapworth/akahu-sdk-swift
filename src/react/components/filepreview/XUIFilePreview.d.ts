import * as React from 'react';

interface BaseProps {
  /**
   * Content to go in the grey body area
   */
  children?: React.ReactNode;
  /**
   * Classes to be applied to the filepreview wrapping element
   */
  className?: string;
  /**
   * Footer component
   */
  footer?: React.ReactNode;
  /**
   * Header component
   */
  header?: React.ReactNode;
  qaHook?: string;
}

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<React.HTMLAttributes<HTMLElement>, keyof BaseProps>;

type Props = BaseProps & SpreadProps;

declare const XUIFilePreview: React.FunctionComponent<Props>;
export default XUIFilePreview;
