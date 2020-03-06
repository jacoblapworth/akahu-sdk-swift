import React from 'react';

import { userBreakpoints } from '../helpers/breakpoints';

interface Props {
  /**
   * Array of objects or nodes from which to build breadcrumbs.
   */
  breadcrumbs?: Array<
    | React.ReactNode
    | {
        href?: string;
        label: string;
      }
  >;
  className?: string;
  qaHook?: string;
  /**
   * If a breadcrumb trail is more than two items long, items other than the last will be condensed
   * into a dropdown below this breakpoint. Functionality relies on breadcrumbs appearing in
   * `PageHeader` or another `WidthContext` provider.
   */
  swapAtBreakpoint?: keyof typeof userBreakpoints;
}

declare const XUIBreadcrumbTrail: React.FunctionComponent<Props>;
export default XUIBreadcrumbTrail;
