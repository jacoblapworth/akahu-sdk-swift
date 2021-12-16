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

type Props = BaseProps & React.HTMLAttributes<HTMLElement>;

declare const XUIFilePreview: React.FunctionComponent<Props>;
export default XUIFilePreview;
