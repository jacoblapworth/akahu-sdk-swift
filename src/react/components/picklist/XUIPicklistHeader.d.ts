import * as React from 'react';

interface Props {
  /**
   * ARIA attribute defining what purpose this item serves.
   */
  ariaRole?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

declare const XUIPicklistHeader: React.FunctionComponent<Props>;
export default XUIPicklistHeader;
