import React from 'react';

interface Props {
  /**
   * Components or html to be right-aligned in the pageheading.
   */
  actions?: React.ReactNode;
  /**
   * Avatar to be displayed left of the title.
   */
  avatar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /**
   * CSS class(es) to add to the the `pageheading--content` element. `xui-page-width-standard` would
   * go here.
   */
  contentClassName?: string;
  /**
   * Applies default layout styling.
   */
  hasLayout?: boolean;
  /**
   * Applies fixed positioning so the isolation mode header scrolls with the page.
   */
  isPositionFixed?: boolean;
  /**
   * Navigation button. This is usually the cross button that takes the user back to where they came
   * from.
   */
  navigationButton: React.ReactNode;
  qaHook?: string;
  /**
   * Secondary title.
   */
  secondary?: React.ReactNode;
  /**
   * Array of `XUITag`s.
   */
  tags?: React.ReactElement[];
  /**
   * Title text or node.
   */
  title?: React.ReactNode;
}

declare const XUIIsolationHeader: React.FunctionComponent<Props>;
export default XUIIsolationHeader;
