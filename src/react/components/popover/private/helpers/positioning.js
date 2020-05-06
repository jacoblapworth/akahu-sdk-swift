export default class PositioningHelper {
  preferredLocation;

  contentRect;
  triggerRect;

  pageGutter;
  triggerGap;

  /**
   * Map of the vertical/horizontal (top/left) axis for a side.
   */
  axisMap = {
    bottom: 'top',
    left: 'left',
    right: 'left',
    top: 'top',
  };

  /**
   * Map of the vertical/horizontal (top/left) axis adjacent to a side.
   */
  adjacentAxisMap = {
    bottom: 'left',
    left: 'top',
    right: 'top',
    top: 'left',
  };

  /**
   * Creates a helper for positioning content next to a trigger. Useful for elements like tooltips
   * and popovers.
   *
   * The helper needs to be instantiated with the correct information before calling `getLocation`
   * or `getPositionStyle`.
   *
   * @param preferredLocation Determines the side of the trigger that the content should be
   * displayed. If the preferred location is unavailable then a valid location will be chosen.
   * @param contentRect A [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)
   * representing the content to be positioned.
   * @param triggerRect A [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)
   * representing the trigger to position the content around.
   * @param triggerGap How much space should be left around the trigger.
   * @param pageGutter How close the content can get to the edge of the page.
   */
  constructor(
    preferredLocation = 'bottom',
    contentRect,
    triggerRect,
    triggerGap = 0,
    pageGutter = 0,
  ) {
    this.preferredLocation = preferredLocation;

    this.contentRect = contentRect;
    this.triggerRect = triggerRect;

    this.pageGutter = pageGutter;
    this.triggerGap = triggerGap;
  }

  /**
   * If the preferred location is not available the opposite side of the trigger will be checked,
   * followed by the right and bottom sides, and finally the left and top sides.
   *
   * @returns {string} The best available location.
   */
  getLocation() {
    const oppositeLocationMap = {
      bottom: 'top',
      left: 'right',
      right: 'left',
      top: 'bottom',
    };

    const validLocationMap = {
      left: this.getPosition('left') >= this.pageGutter,
      top: this.getPosition('top') >= this.pageGutter,
      bottom:
        this.getPosition('bottom') + this.contentRect.height <=
        document.body.clientHeight - this.pageGutter,
      right:
        this.getPosition('right') + this.contentRect.width <=
        document.body.clientWidth - this.pageGutter,
    };

    const preferredLocations = [
      this.preferredLocation,
      oppositeLocationMap[this.preferredLocation],
      'right',
      'bottom',
      'left',
      'top',
    ];

    const finalLocation = preferredLocations.filter(location => validLocationMap[location])[0];

    return finalLocation || 'bottom';
  }

  /**
   * Calculates the absolute position for the content based on the positions and sizes of the
   * trigger, content, and page.
   *
   * @returns {{left: number, top: number}} The absolute position for the content.
   */
  getPositionStyle() {
    const location = this.getLocation();
    const position = this.getPosition(location);
    const alignment = this.getAlignment(location);

    return {
      [this.axisMap[location]]: position,
      [this.adjacentAxisMap[location]]: alignment,
    };
  }

  /**
   * Calculates whether the content is narrower than the body. Useful for switching to a full-width
   * style.
   *
   * @returns {boolean} True if the content is as wide as or wider than the body.
   */
  isFullWidth() {
    return this.contentRect.width >= document.body.getBoundingClientRect().width;
  }

  getAlignment(location) {
    const axisSizeMap = {
      left: 'width',
      top: 'height',
    };

    const alignment =
      this.triggerRect[this.adjacentAxisMap[location]] +
      this.triggerRect[axisSizeMap[this.adjacentAxisMap[location]]] / 2 -
      this.contentRect[axisSizeMap[this.adjacentAxisMap[location]]] / 2 +
      this.getScrollOffset(this.adjacentAxisMap[location]);

    const axis = this.adjacentAxisMap[location];

    const clampedAlignment = Math.max(
      Math.min(
        alignment,
        document.body.getBoundingClientRect()[axisSizeMap[axis]] -
          this.pageGutter -
          this.contentRect[axisSizeMap[this.adjacentAxisMap[location]]],
      ),
      axis === 'top'
        ? this.pageGutter
        : Math.min(
            this.pageGutter,
            (document.body.getBoundingClientRect().width - this.contentRect.width) / 2,
          ),
    );

    return clampedAlignment;
  }

  getPosition(side) {
    const bufferMap = {
      bottom: this.triggerGap,
      left: -this.triggerGap,
      right: this.triggerGap,
      top: -this.triggerGap,
    };

    const positionOffsetMap = {
      bottom: this.triggerRect.height,
      left: -this.contentRect.width,
      right: this.triggerRect.width,
      top: -this.contentRect.height,
    };

    return (
      this.triggerRect[this.axisMap[side]] +
      positionOffsetMap[side] +
      bufferMap[side] +
      this.getScrollOffset(this.axisMap[side])
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getScrollOffset(axis) {
    return axis === 'left' ? window.pageXOffset : window.pageYOffset;
  }
}
