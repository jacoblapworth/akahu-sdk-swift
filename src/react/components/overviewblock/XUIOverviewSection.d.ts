import * as React from 'react';

import { overviewSentiments } from './private/constants';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Label for the section.
   */
  label?: React.ReactNode;
  qaHook?: string;
  /**
   * Sentiment for styling the value.
   *
   * Defaults to `standard`.
   */
  sentiment?: keyof typeof overviewSentiments;
  /**
   * How to align text in this section.
   *
   * Leave as `undefined` to inherit the alignment of the parent block.
   */
  textAlignment?: 'center' | 'left' | 'right';
  /**
   * Value to appear below the label.
   */
  value?: React.ReactNode;
}

type SpreadProps = React.HTMLAttributes<HTMLElement>;

type Props = BaseProps & Omit<SpreadProps, keyof BaseProps>;

declare const XUIOverviewSection: React.FunctionComponent<Props>;
export default XUIOverviewSection;
