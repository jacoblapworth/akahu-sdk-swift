import * as React from 'react';

interface Props {
  children?: React.ReactNode;
  /**
   * An element that is focusable or has focusable children. Used as an entry point into the Portal.
   * Pressing `Tab` while it is focused will send the focus to the Portal. When the focus needs to
   * return back to the page, it will use this element to figure out where the focus should return
   * to.
   */
  focusPortalRef: React.RefObject<HTMLElement>;
  /**
   * An optional function to be called whenever the focus leaves the portal and is returned to the
   * page.
   */
  onReturnFocus?: () => void;
}

export default class PortalFocusHelper extends React.Component<Props> {}
