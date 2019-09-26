import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import crossSmall from '@xero/xui-icon/icons/cross-small';

import XUIIconButton from '../button/XUIIconButton';
import XUIInnerPill from './XUIInnerPill';
import XUITooltip from '../tooltip/XUITooltip';
import { baseClass, sizeClasses } from './private/constants';
import SizeContext from '../../contexts/SizeContext';

function shouldShowTooltip(domElement) {
  return domElement && domElement.clientWidth < domElement.scrollWidth;
}

export default class XUIPill extends PureComponent {
  state = {
    isFocused: false,
    hasTooltip: false,
  };

  _innerPill = React.createRef();
  _tooltip = React.createRef();

  componentDidMount() {
    const innerPillElement = this._innerPill && this._innerPill.current;
    const shouldHaveToolTip =
      this.state.hasTooltip === false && shouldShowTooltip(innerPillElement);

    if (shouldHaveToolTip) {
      this.setState({
        hasTooltip: true,
      });
    }
  }

  toggleFocus = () => {
    this.setState(
      prevState => ({
        isFocused: !prevState.isFocused,
      }),
      () => {
        if (this.state.isFocused && this.state.hasTooltip) {
          this._tooltip.current.openTooltip();
        } else if (this.state.hasTooltip) {
          this._tooltip.current.closeTooltip();
        }
      },
    );
  };

  hoverHandler = () => {
    if (this.state.hasTooltip) {
      this._tooltip.current.openTooltip();
    }
  };

  blurHandler = () => {
    if (this.state.hasTooltip) {
      this._tooltip.current.closeTooltip();
    }
  };

  render() {
    return (
      <SizeContext.Consumer>
        {inheritedSize => {
          const {
            avatarProps,
            className,
            deleteButtonLabel,
            href,
            isInvalid,
            onClick,
            onDeleteClick,
            qaHook,
            secondaryText,
            target,
            title,
            value,
            isLimitedWidth,
            debugShowToolTip,
            avatar,
          } = this.props;

          const { isFocused, hasTooltip } = this.state;

          const defaultSize = 'medium';
          const size = this.props.size || inheritedSize || defaultSize;

          const pillClasses = cn(
            className,
            baseClass,
            isLimitedWidth && `${baseClass}-maxwidth`,
            size && sizeClasses[size],
            isInvalid && `${baseClass}-is-invalid`,
            isFocused && `${baseClass}-is-focused`,
            onDeleteClick && `${baseClass}-is-deletable`,
            (avatarProps != null || isInvalid) && `${baseClass}-has-avatar`,
            avatar && `${baseClass}-has-avatar`,
            (href || onClick) && `${baseClass}-interactive`,
          );

          const deleteButton = onDeleteClick && (
            <XUIIconButton
              ariaLabel={deleteButtonLabel}
              className={`${baseClass}--button-icon`}
              icon={crossSmall}
              isInverted={isInvalid}
              onClick={onDeleteClick}
              qaHook={qaHook && `${qaHook}--delete`}
              size={size}
              title={deleteButtonLabel}
            />
          );

          const content = (
            <div
              className={pillClasses}
              data-automationid={qaHook}
              onBlur={this.toggleFocus}
              onFocus={this.toggleFocus}
              onMouseEnter={this.hoverHandler}
              onMouseLeave={this.blurHandler}
            >
              <XUIInnerPill
                innerPillRef={this._innerPill}
                {...{
                  avatarProps,
                  avatar,
                  href,
                  isInvalid,
                  onClick,
                  qaHook,
                  secondaryText,
                  target,
                  title,
                  value,
                  size,
                }}
              />
              {deleteButton}
            </div>
          );

          if (hasTooltip || debugShowToolTip) {
            return (
              <XUITooltip
                id={debugShowToolTip && 'tooltipDebugId'}
                isHidden={!debugShowToolTip}
                ref={this._tooltip}
                // Extra wrapping div required because tooltip has CSS that stomps on first child
                trigger={<div>{content}</div>}
                useInlineFlex
              >
                {secondaryText}
                {secondaryText && value ? <br /> : null}
                {value}
              </XUITooltip>
            );
          }

          return content;
        }}
      </SizeContext.Consumer>
    );
  }
}

XUIPill.defaultProps = {
  deleteButtonLabel: 'Delete',
};

XUIPill.propTypes = {
  /** Props for the avatar to be displayed, must adhere to the XUIAvatar component API described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing props will omit the avatar entirely. */
  avatarProps: PropTypes.object,
  /** An avatar component. May be used instead of avatarProps */
  avatar(props, propName) {
    if (props[propName] && props.avatarProps) {
      return new Error('Cannot accept both avatarProps and an avatar component');
    }
    return null;
  },
  /** Apply classes to the outer Pill `div` element. */
  className: PropTypes.string,
  /** Specify an alternate label attribute for the delete button, defaults to 'Delete'. */
  deleteButtonLabel: PropTypes.string,
  /** This will make the value an `anchor` element instead of a `span` element and adds the
   * href as the link. */
  href: PropTypes.string,
  /** When invalid, displays the text in a red colour. */
  isInvalid: PropTypes.bool,
  /** Callback to fire when the main pill content is clicked. */
  onClick: PropTypes.func,
  /** Callback to fire when the delete pill button is clicked. When omitted, the delete button
   * is also ommitted from the view. */
  onDeleteClick: PropTypes.func,
  /** add a qahook to the component */
  qaHook: PropTypes.string,
  /** When an `href` is supplied, adds a target attribute, else is ignored. */
  target: PropTypes.string,
  /** The title attribute to apply on the pill. */
  title: PropTypes.string,
  /** Adds a muted secondary text for the pill, appears before the main value. */
  secondaryText: PropTypes.node,
  /** The text to display inside the pill. */
  value: PropTypes.node,
  /** Whether the pill should have a max-width of 200px */
  isLimitedWidth: PropTypes.bool,
  /** The size of the pill to render */
  size: PropTypes.oneOf(Object.keys(sizeClasses)),
  /**
   * @ignore
   * Dev / debug prop to show the tooltip initially on mount instead of based on a user event */
  debugShowToolTip: PropTypes.bool,
};
