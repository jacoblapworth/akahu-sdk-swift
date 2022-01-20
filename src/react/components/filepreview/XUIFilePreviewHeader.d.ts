import * as React from 'react';

interface BaseProps {
  /**
   * Components or html to be right-aligned in the filepreviewheader
   */
  actions?: React.ReactNode;
  /**
   * Content to go in the header. It's unlikely that you will need to use this.
   */
  children?: React.ReactNode;
  /**
   * Classes to be applied to the filepreviewheader element
   */
  className?: string;
  /**
   * Tag type for the filepreviewheader element. Defaults to 'header'
   */
  headerTag?: string;
  /**
   * The level of heading that should be assigned to the title. Defaults to 2 (<h2>).
   */
  headingLevel?: number;
  /**
   * Navigation button to appear to the left of the heading. Used to close/minimise the preview.
   */
  navigationButton?: React.ReactNode;
  qaHook?: string;
  /**
   * Secondary title
   */
  secondary?: React.ReactNode;
  /**
   * Title text or node. Required.
   */
  title: React.ReactNode;
}

type Props = BaseProps & React.HTMLAttributes<HTMLElement>;

declare const XUIFilePreviewHeader: React.FunctionComponent<Props>;
export default XUIFilePreviewHeader;
