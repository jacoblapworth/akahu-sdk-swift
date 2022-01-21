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

type Props = BaseProps & React.HTMLAttributes<HTMLElement>;

declare const XUIFilePreviewFooter: React.FunctionComponent<Props>;
export default XUIFilePreviewFooter;
