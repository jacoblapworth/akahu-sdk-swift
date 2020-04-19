import * as React from 'react';

import { Location } from './helpers/positioning';

interface Props {
  /**
   * This component requires `children` to be a function. The function receives 2 arguments,
   * `location` and `isFullWidth`, and returns a React node.
   *
   * The `location` is where the content ended up being positioned, this will be the
   * `preferredLocation` or the next available location.
   *
   * The `isFullWidth` flag is `true` when the width of the content is narrower than the body when
   * taking the `pageGutter` into consideration. This is useful for switching to a full-width style
   * when there is not enough room to position the content correctly.
   */
  children: (location?: Location, isFullWidth?: boolean) => React.ReactNode;
  /**
   * How much space should be left between the edge of the page and the content to be positioned.
   */
  pageGutter?: number;
  /**
   * The preferred location for the content. If the preferred location is not available the opposite
   * side of the trigger will be checked, followed by the right and bottom sides, and finally the
   * left and top sides.
   */
  preferredLocation?: Location;
  /**
   * How much space should be left between the trigger and the content to be positioned.
   */
  triggerGap?: number;
  /**
   * The ref for the HTMLElement the content should be positioned around.
   */
  triggerRef: React.RefObject<HTMLElement>;
}

interface State {
  isFullWidth?: boolean;
  location?: Location;
  style?: React.CSSProperties;
}

export default class Positioning extends React.Component<Props, State> {}
