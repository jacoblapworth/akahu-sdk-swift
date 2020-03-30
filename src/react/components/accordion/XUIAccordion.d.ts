import * as React from 'react';

import { XUIIconData } from '../icon/XUIIcon';

interface BaseProps {
  children?: React.ReactNode;
  /**
   * Attached to the outer most element of the accordion component.
   */
  className?: string;
  qaHook?: string;
  /**
   * Accessibility label representing the `XUIAccordionItem` toggle functionality.
   *
   * Recommended English value: *Toggle*
   */
  toggleLabel: string;
}
interface EmptyStateMessageProps {
  /**
   * Customise the default "empty" icon path data.
   */
  emptyIcon?: XUIIconData;
  /**
   * The message to show if the accordion is empty.
   *
   * Recommended English value: *Nothing available to show*
   */
  emptyMessage: React.ReactNode;
}
interface EmptyStateComponentProps {
  /**
   * Override the default "empty" component.
   */
  emptyStateComponent: React.ReactNode;
}

type EmptyStateProps = EmptyStateComponentProps | EmptyStateMessageProps;
type Props = BaseProps & EmptyStateProps;

declare const XUIAccordion: React.FunctionComponent<Props>;
export default XUIAccordion;
