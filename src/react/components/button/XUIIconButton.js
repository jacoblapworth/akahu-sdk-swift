import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from './XUIButton';
import XUIIcon from '../icon/XUIIcon';
import {
  sizeClassNames,
  iconSizeClassNames,
  variantClassNames,
  buttonTypes,
} from './private/constants';
import { colorClasses, wrapperSizeClasses, rotationClasses } from '../icon/private/constants';

export default class XUIIconButton extends PureComponent {
  render() {
    const {
      className,
      icon,
      ariaLabel,
      size,
      isInverted,
      iconSize,
      desc,
      role,
      rotation,
      iconColor,
      ...otherProps
    } = this.props;

    const iconSizeClass = iconSizeClassNames[size || 'medium'];

    return (
      <XUIButton
        ref={n => (this.rootNode = n && n.rootNode)}
        variant="unstyled"
        className={cn(
          className,
          iconSizeClass,
          variantClassNames[isInverted ? 'icon-inverted' : 'icon'],
        )}
        aria-label={ariaLabel}
        {...otherProps}
      >
        <XUIIcon
          icon={icon}
          size={iconSize}
          desc={desc}
          role={role}
          rotation={rotation}
          color={iconColor}
        />
      </XUIButton>
    );
  }
}

XUIIconButton.propTypes = {
  className: PropTypes.string,

  /** Required prop, an object describing the path, width and height. */
  icon: PropTypes.shape({
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,

  /** Required prop, providing the label to any assistive technologies */
  ariaLabel: PropTypes.string.isRequired,

  /** Determines if the iconButton is disabled or not. */
  isDisabled: PropTypes.bool,

  /** If true, sets appropriate `rel` values to prevent new page from having access to
   * `window.opener`. Should be used for links pointing at external sites. * */
  isExternalLink: PropTypes.bool,

  /** A keydown event handler for the iconButton */
  onKeyDown: PropTypes.func,

  /** Bind a function to fire when the iconButton is clicked */
  onClick: PropTypes.func,

  /**
   * Modifier for the size of the iconButton. `medium`, `small`, or `xsmall`.
   */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),

  /** Whether or not to render this iconButton using an <a> tag */
  isLink: PropTypes.bool,

  /** The type attribute of this iconButton. `submit`, `button`, or `reset`. */
  type: PropTypes.oneOf(Object.keys(buttonTypes).map(type => buttonTypes[type])),

  /** The `href` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
  href: PropTypes.string,

  /** The `rel` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
  rel: PropTypes.string,

  /** The HTML tabIndex attribute value */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The `target` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
  target: PropTypes.string,

  /** The `title` attribute */
  title: PropTypes.string,

  /** Adds a size modifier to the icon */
  iconSize: PropTypes.oneOf(Object.keys(wrapperSizeClasses)),

  /** Description of the icon to be read by screen readers */
  desc: PropTypes.string,

  /** Role to be applied to the icon SVG for screen readers */
  role: PropTypes.string,

  /** Adds a rotation modifier to the icon. Accepted values are 0 (default), 90, 180, 270 */
  rotation: PropTypes.oneOf([
    ...Object.keys(rotationClasses),
    ...Object.keys(rotationClasses).map(n => parseInt(n)),
  ]),

  /** Adds a color modifier to the icon */
  iconColor: PropTypes.oneOf(Object.keys(colorClasses)),

  /** Applies inverted styling */
  isInverted: PropTypes.bool,

  qaHook: PropTypes.string,
};

XUIIconButton.defaultProps = {
  tabIndex: 0,
  type: buttonTypes.button,
  isLink: false,
  isDisabled: false,
  isExternalLink: false,
};
