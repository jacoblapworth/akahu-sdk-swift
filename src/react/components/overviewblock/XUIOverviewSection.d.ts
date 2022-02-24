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

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<React.HTMLAttributes<HTMLElement>, keyof BaseProps>;

type Props = BaseProps & SpreadProps;

declare const XUIOverviewSection: React.FunctionComponent<Props>;
export default XUIOverviewSection;
