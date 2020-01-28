import React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether the block should have a solid background.
   *
   * Defaults to `true`.
   */
  hasBackground?: boolean;
  /**
   * Whether to show wrapping border on the entire block.
   *
   * Defaults to `true`.
   */
  hasBorder?: boolean;
  /**
   * Applies default layout styling.
   */
  hasLayout?: boolean;
  qaHook?: string;
  /**
   * How to align text, generally, across all sections.
   */
  textAlignment?: 'center' | 'left' | 'right';
}

type Props = BaseProps & React.HTMLAttributes<HTMLDivElement>;

export default class XUIOverviewBlock extends React.PureComponent<Props> {}
