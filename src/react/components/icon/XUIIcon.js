import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import {
  baseClass,
  wrapperClass,
  wrapperSizeClasses,
  rotationClasses,
  colorClasses,
  iconSizeMultipliers,
} from './private/constants';

const XUIIcon = React.forwardRef((props, ref) => {
  const { className, qaHook, size, title, desc, role, rotation, color, icon, isBoxed } = props;

  const svgClasses = cn(
    baseClass,
    colorClasses[color],
    rotationClasses[rotation],
    !isBoxed && className, // If no wrapper is needed, apply custom classes directly on the SVG
  );

  const optionalTitle = title ? <title>{title}</title> : null;
  const optionalDescription = desc ? <desc>{desc}</desc> : null;
  const sizeMultiplier = iconSizeMultipliers[size] || 1;

  const svgElement = (
    <svg
      className={svgClasses}
      data-automationid={qaHook}
      focusable="false"
      height={icon.height * sizeMultiplier}
      ref={ref}
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      width={icon.width * sizeMultiplier}
    >
      {optionalTitle}
      {optionalDescription}
      <path d={icon.path} role={role} />
    </svg>
  );

  return !isBoxed ? (
    svgElement
  ) : (
    <div
      className={cn(className, wrapperClass, wrapperSizeClasses[size])}
      data-automationid={qaHook && `${qaHook}-wrapper`}
    >
      {svgElement}
    </div>
  );
});

XUIIcon.propTypes = {
  className: PropTypes.string,
  /** Adds a color modifier to the icon */
  color: PropTypes.oneOf(Object.keys(colorClasses)),
  /** Description to be read by screen readers */
  desc: PropTypes.string,
  /** An object describing the path, width and height. */
  icon: PropTypes.shape({
    height: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  /** Whether the icon should be wrapped in a wrapper with a set size */
  isBoxed: PropTypes.bool,
  qaHook: PropTypes.string,
  /** Role to be applied to the SVG for screen readers */
  role: PropTypes.string,
  /** Adds a rotation modifier to the icon. Accepted values are 0 (default), 90, 180, 270 */
  rotation: PropTypes.oneOf([
    ...Object.keys(rotationClasses),
    ...Object.keys(rotationClasses).map(n => parseInt(n)),
  ]),
  /** Adds a size modifier to the icon */
  size: PropTypes.oneOf(Object.keys(wrapperSizeClasses)),
  /** Title to be read by screen readers */
  title: PropTypes.string,
};

XUIIcon.defaultProps = {
  role: 'presentation',
  size: 'medium',
};

export default XUIIcon;
