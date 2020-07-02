import * as React from 'react';

import { sizeClassNames } from './private/constants';
import { Location } from './private/helpers/positioning';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * The id for the popover. This must also be added as the `aria-owns` attribute for the trigger
   * element to ensure assistive technologies know where the popover is on the page.
   */
  id: string;
  /**
   * A callback to be called when the user clicks outside the popover or uses the keyboard to
   * navigate outside the popover.
   */
  onClickOutside?: () => void;
  /**
   * The preferred position for the popover. If the preferred position is not available the opposite
   * side of the trigger will be checked, followed by the right and bottom sides, and finally the
   * left and top sides.
   */
  preferredPosition?: Location;
  qaHook?: string;
  /**
   * The ref for the element the popover should be positioned around.
   */
  triggerRef: React.RefObject<
    | HTMLElement
    | {
        rootNode: HTMLElement | React.RefObject<HTMLElement> | null;
      }
  >;
  /**
   * The maximum width of the popover. Can be `small` (200px), `medium` (300px), `large` (400px), or
   * a custom `number` that represents the size of the popover in pixels.
   */
  width?: keyof typeof sizeClassNames | number;
}

export default class XUIPopover extends React.Component<Props> {}
