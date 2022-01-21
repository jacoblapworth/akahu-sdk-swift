import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import IdContext from './contexts/IdContext';
import { baseClassName, sizeClassNames } from './private/constants';
import getFocusableElement from '../helpers/PortalFocusHelper/helpers/getFocusableElement';
import PortalFocusHelper from '../helpers/PortalFocusHelper/PortalFocusHelper';
import Positioning from './private/Positioning';
import getTriggerElementRef from '../helpers/getTriggerElementRef';

const BORDER_SHADOW_SIZE = 1;
const ARROW_SIZE = 8 + BORDER_SHADOW_SIZE;

export default class XUIPopover extends React.Component {
  wrapperRef = React.createRef();

  state = {};

  componentDidMount() {
    this.addEventListeners();
  }

  componentDidUpdate() {
    this.removeEventListeners();
    this.addEventListeners();
  }

  componentWillUnmount() {
    this.removeEventListeners();

    if (this.wrapperRef.current && this.wrapperRef.current.contains(document.activeElement)) {
      this.focusOnTheTrigger();
    }
  }

  render() {
    const { className, children, id, onClickOutside, preferredPosition, qaHook, width } =
      this.props;

    const bodyId = `${id}-body`;

    const triggerRef = getTriggerElementRef(this.props.triggerRef);

    return (
      <>
        <Positioning
          pageGutter={ARROW_SIZE}
          preferredLocation={preferredPosition}
          triggerGap={ARROW_SIZE}
          triggerRef={triggerRef}
        >
          {(location, isFullWidth) => (
            <>
              <div
                aria-describedby={bodyId}
                aria-labelledby={this.state.titleId}
                className={cn(
                  `${baseClassName}`,
                  `${baseClassName}-wrapper`,
                  isFullWidth && `${baseClassName}-fullwidth`,
                  /**
                   * We only want to apply the size class when the width is a string because a
                   * number would indicate that a custom width should be used.
                   */
                  typeof width === 'string' && sizeClassNames[width],
                  className,
                )}
                data-automationid={qaHook}
                id={id}
                ref={this.wrapperRef}
                role="dialog"
                style={{ maxWidth: typeof width === 'number' ? `${width}px` : undefined }}
              >
                <PortalFocusHelper focusPortalRef={triggerRef} onReturnFocus={onClickOutside}>
                  <IdContext.Provider value={{ bodyId, getTitleId: this.getTitleId }}>
                    {children}
                  </IdContext.Provider>
                </PortalFocusHelper>
              </div>
              <Positioning preferredLocation={location} triggerRef={triggerRef}>
                {() => <div className={cn(`${baseClassName}--arrow-${location}`)} />}
              </Positioning>
            </>
          )}
        </Positioning>
      </>
    );
  }

  addEventListeners = () => {
    document.addEventListener('click', this.handleClickOutside);
  };

  removeEventListeners = () => {
    document.removeEventListener('click', this.handleClickOutside);
  };

  handleClickOutside = event => {
    const { onClickOutside } = this.props;
    const triggerRef = getTriggerElementRef(this.props.triggerRef);

    if (
      event.target &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target)
    ) {
      onClickOutside?.();
    }
  };

  focusOnTheTrigger = () => {
    const triggerRef = getTriggerElementRef(this.props.triggerRef);

    if (!triggerRef.current) {
      return;
    }

    const focusableElement = getFocusableElement(triggerRef.current);

    if (!focusableElement) {
      return;
    }

    focusableElement.focus();
  };

  getTitleId = () => {
    const { id } = this.props;
    const titleId = `${id}-title`;

    if (this.state.titleId !== titleId) {
      this.setState({ titleId });
    }

    return titleId;
  };
}

XUIPopover.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * The id for the popover. This must also be added as the `aria-owns` attribute for the trigger
   * element to ensure assistive technologies know where the popover is on the page.
   */
  id: PropTypes.string.isRequired,
  /**
   * A callback to be called when the user clicks outside the popover or uses the keyboard to
   * navigate outside the popover.
   */
  onClickOutside: PropTypes.func,
  /**
   * The preferred position for the popover. If the preferred position is not available the opposite
   * side of the trigger will be checked, followed by the right and bottom sides, and finally the
   * left and top sides.
   */
  preferredPosition: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
  qaHook: PropTypes.string,
  /**
   * The ref for the element the popover should be positioned around.
   */
  triggerRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  /**
   * The maximum width of the popover. Can be `small` (200px), `medium` (300px), `large` (400px), or
   * a custom `number` that represents the size of the popover in pixels.
   */
  width: PropTypes.oneOfType([PropTypes.oneOf(Object.keys(sizeClassNames)), PropTypes.number]),
};

XUIPopover.defaultProps = {
  width: 'medium',
};
