import * as React from 'react';

interface Props {
  children?: React.ReactNode;
  /**
   * Target a tab by its index in the `tabs` array and set it to its "active" state (index is zero
   * based).
   */
  currentStep: number;
  /**
   * Set the tab buttons to have a "stacked" layout (only applicable in the "inline" layout).
   */
  hasStackedButtons?: boolean;
  /**
   * A unique ID that is used to generate Aria references.
   */
  id: string;
  /**
   * Whether step names and description truncate or wrap.
   *
   * Defaults to `true`.
   */
  isTruncated?: boolean;
  /**
   * Lock the Stepper to only use a single layout style (the Stepper will augment its layout
   * automatically by default). Setting to `vertical` will render as either a sidebar or stacked
   * depending on the space available.
   */
  lockLayout?: 'stacked' | 'sidebar' | 'inline' | 'vertical';
  qaHook?: string;
  /**
   * The group of Stepper tabs.
   */
  tabs: Array<{
    currentProgress?: number;
    description?: React.ReactNode;
    isComplete?: boolean;
    isDisabled?: boolean;
    isError?: boolean;
    isProgress?: boolean;
    name: string;
    totalProgress?: number;
  }>;
  /**
   * A callback that receives an `index` value relating to the clicked `currentStep`.
   */
  updateCurrentStep?: (index: number) => void;
}

export default class XUIStepper extends React.Component<Props> {}
