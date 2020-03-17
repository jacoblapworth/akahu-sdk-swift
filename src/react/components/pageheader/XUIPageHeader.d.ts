import * as React from 'react';

interface BaseProps {
  /**
   * Components or html to be right-aligned in the pageheading.
   */
  actions?: React.ReactNode;
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
  qaHook?: string;
  /**
   * Secondary title.
   */
  secondary?: string;
  /**
   * Horizontal picklist to act as tabs. `XUIPicklist`
   */
  tabs?: React.ReactElement;
  /**
   * Array of `XUITags`.
   */
  tags?: React.ReactNode[];
}

type BreadcrumbProps =
  | {
      /**
       * Instantiated breadcrumb component. Use in conjunction with a title.
       */
      breadcrumb: React.ReactElement;
      /**
       * Title text or node. Should almost certainly be present.
       */
      title: React.ReactNode;
    }
  | {
      /**
       * Title text or node. Should almost certainly be present.
       */
      title?: React.ReactNode;
    };

type Props = BaseProps & React.HTMLAttributes<HTMLElement>;

export default class XUIPageHeader extends React.PureComponent<Props> {}
