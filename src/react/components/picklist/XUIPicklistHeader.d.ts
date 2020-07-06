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

export default class XUIPicklistHeader extends React.PureComponent<Props> {}
