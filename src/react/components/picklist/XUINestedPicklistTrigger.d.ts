import * as React from 'react';

interface Props {
  /**
   * Specify an ARIA label for the trigger.
   *
   * Recommended English value: *Toggle submenu*
   */
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
  id: string;
  isHighlighted?: boolean;
  isSelected?: boolean;
  /**
   * Content to be added to the left of the pickitem.
   */
  leftElement?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
  secondaryProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export default class XUINestedPicklistTrigger extends React.PureComponent<Props> {
  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: React.RefObject<HTMLElement> | null;
}
