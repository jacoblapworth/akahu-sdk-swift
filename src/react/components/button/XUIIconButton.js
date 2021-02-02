import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from './XUIButton';
import XUIIcon from '../icon/XUIIcon';
import XUITouchTarget from '../touchtarget/XUITouchTarget';
import {
  sizeClassNames,
  iconSizeClassNames,
  iconVariantClassNames,
  buttonTypes,
} from './private/constants';
import { colorClasses, wrapperSizeClasses, rotationClasses } from '../icon/private/constants';

export default class XUIIconButton extends PureComponent {
  rootNode = React.createRef();

  render() {
    const {
      ariaLabel,
      className,
      desc,
      icon,
      iconColor,
      iconSize,
      isInverted,
      role,
      rotation,
      size,
      ...otherProps
    } = this.props;

    const iconSizeClass = iconSizeClassNames[size || 'medium'];

    return (
      <XUIButton
        {...otherProps}
        aria-label={ariaLabel}
        className={cn(
          className,
          iconSizeClass,
          iconVariantClassNames[isInverted ? 'icon-inverted' : 'icon'],
        )}
        // NB: Passing up the rootNode ref of the XUIButton to be the rootNode ref of XUIIconButton
        ref={n => (this.rootNode = n?.rootNode)}
        variant="unstyled"
      >
        <XUIIcon
          color={iconColor}
          desc={desc}
          icon={icon}
          role={role}
          rotation={rotation}
          size={iconSize}
        />
        <XUITouchTarget />
      </XUIButton>
    );
  }
}

XUIIconButton.propTypes = {
  /** Required prop, providing the label to any assistive technologies */
  ariaLabel: PropTypes.string.isRequired,

  className: PropTypes.string,

  /** Description of the icon to be read by screen readers */
  desc: PropTypes.string,

  /** The `href` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
  href: PropTypes.string,

  /** Required prop, an object describing the path, width and height. */
  icon: PropTypes.shape({
    height: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,

  /** Adds a color modifier to the icon */
  iconColor: PropTypes.oneOf(Object.keys(colorClasses)),

  /** Adds a size modifier to the icon */
  iconSize: PropTypes.oneOf(Object.keys(wrapperSizeClasses)),

  /** Determines if the iconButton is disabled or not. */
  isDisabled: PropTypes.bool,

  /** If true, sets appropriate `rel` values to prevent new page from having access to
   * `window.opener`. Should be used for links pointing at external sites. * */
  isExternalLink: PropTypes.bool,

  /** Applies inverted styling */
  isInverted: PropTypes.bool,

  /** Whether or not to render this iconButton using an <a> tag */
  isLink: PropTypes.bool,

  /** Bind a function to fire when the iconButton is clicked */
  onClick: PropTypes.func,

  /** A keydown event handler for the iconButton */
  onKeyDown: PropTypes.func,

  qaHook: PropTypes.string,

  /** The `rel` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
  rel: PropTypes.string,

  /** Role to be applied to the icon SVG for screen readers */
  role: PropTypes.string,

  /** Adds a rotation modifier to the icon. Accepted values are 0 (default), 90, 180, 270 */
  rotation: PropTypes.oneOf([
    ...Object.keys(rotationClasses),
    ...Object.keys(rotationClasses).map(n => parseInt(n)),
  ]),

  /**
   * Modifier for the size of the iconButton. `medium`, `small`, or `xsmall`.
   */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),

  /** The HTML tabIndex attribute value */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The `target` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
  target: PropTypes.string,

  /** The `title` attribute */
  title: PropTypes.string,

  /** The type attribute of this iconButton. `submit`, `button`, or `reset`. */
  type: PropTypes.oneOf(Object.keys(buttonTypes).map(type => buttonTypes[type])),
};

XUIIconButton.defaultProps = {
  isDisabled: false,
  isExternalLink: false,
  isLink: false,
  tabIndex: 0,
  type: buttonTypes.button,
};
