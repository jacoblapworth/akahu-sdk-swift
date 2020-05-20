import * as React from 'react';

import { XUIIconData } from '../icon/XUIIcon';

interface Props {
  /**
   * Specify an ARIA label for the trigger.
   *
   * Recommended English value: *Toggle submenu*
   */
  ariaLabel: string;
  children?: React.ReactNode;
  className?: string;
  /**
   * Optional prop for users to modify the Nested Picklist Trigger icon, if required for localisation.
   *
   * Defaults to the arrow icon, if no value is provided.
   */
  icon?: XUIIconData;
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

export default class NestedPicklistTrigger extends React.PureComponent<Props> {}
