type Axis = 'left' | 'top';
type AxisSize = 'height' | 'width';
export type Location = 'bottom' | 'left' | 'right' | 'top';

export default class PositioningHelper {
  preferredLocation: Location;

  contentRect: DOMRect;
  triggerRect: DOMRect;

  pageGutter: number;
  triggerGap: number;

  /**
   * Map of the vertical/horizontal (top/left) axis for a side.
   */
  axisMap: {
    [index: string]: Axis;
  };

  /**
   * Map of the vertical/horizontal (top/left) axis adjacent to a side.
   */
  adjacentAxisMap: {
    [index: string]: Axis;
  };

  /**
   * If the preferred location is not available the opposite side of the trigger will be checked,
   * followed by the right and bottom sides, and finally the left and top sides.
   *
   * @returns The best available location.
   */
  public getLocation(): Location;

  /**
   * Calculates the absolute position for the content based on the positions and sizes of the
   * trigger, content, and page.
   *
   * @returns The absolute position for the content.
   */
  public getPositionStyle(): { left: number; top: number };

  /**
   * Calculates whether the content is narrower than the body. Useful for switching to a full-width
   * style.
   *
   * @returns True if the content is as wide as or wider than the body.
   */
  public isFullWidth(): boolean;

  private getAlignment(location: Location): number;

  private getPosition(side: Location): number;

  private getScrollOffset(axis?: Axis): number;
}
