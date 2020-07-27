import * as React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * When true checkboxes will be added to the layout of the child components.
   */
  isMultiselect?: boolean;
  qaHook?: string;
  secondaryProps?: React.HTMLAttributes<HTMLUListElement>;
  /**
   * Whether to truncate text instead of wrapping.
   */
  shouldTruncate?: boolean;
}

declare const XUINestedPicklist: React.FunctionComponent<Props>;
export default XUINestedPicklist;
