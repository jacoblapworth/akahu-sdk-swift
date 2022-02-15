import * as React from 'react';

interface BaseProps {
  /**
   * Content to go in the footer. Typically this will be a set of controls.
   */
  children?: React.ReactNode;
  /**
   * Classes to be applied to the filepreviewfooter element
   */
  className?: string;
  /**
   * Tag type for the filepreviewfooter element. Defaults to 'footer'
   */
  footerTag?: string;
  /**
   * Pagination component to be passed to the file preview footer.
   */
  pagination?: React.ReactNode;
  qaHook?: string;
}

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<React.HTMLAttributes<HTMLElement>, keyof BaseProps>;

type Props = BaseProps & SpreadProps;

declare const XUIFilePreviewFooter: React.FunctionComponent<Props>;
export default XUIFilePreviewFooter;
