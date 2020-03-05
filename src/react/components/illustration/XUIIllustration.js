import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { baseClass, sizeClasses } from './private/constants';

const XUIIllustration = ({
  alt,
  className,
  height,
  padding,
  size,
  qaHook,
  style,
  ...spreadProps
}) => {
  const classes = cn(className, baseClass, size && sizeClasses[size]);

  const composedStyle = {
    ...style,
    height: typeof height === 'number' ? `${height}px` : height,
    padding: typeof padding === 'number' ? `${padding}px` : padding,
  };

  return (
    <img
      {...spreadProps}
      alt={alt}
      className={classes}
      data-automationid={qaHook}
      style={composedStyle}
    />
  );
};

XUIIllustration.propTypes = {
  /**
   * The alternative text for the `img` element.
   *
   * Defaults to an empty string (`alt=""`) which indicates that this image is not a key part of the
   * content (decorative), and that non-visual browsers may omit it from rendering.
   *
   * For more information [visit the MDN page for the Image Embed
   * element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes).
   */
  alt: PropTypes.string,
  className: PropTypes.string,
  /**
   * We recommend using one of the provided sizes, but you can use the `height` prop if you need to
   * set a custom height.
   *
   * To set the height of the illustration, provide the desired height in pixels as a `number`, or
   * as a `string` with a CSS unit prefix.
   *
   * e.g. `100%`
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The padding for the illustration.
   *
   * To set the padding for the illustration, provide the desired padding in pixels as a `number`,
   * or as a string with a CSS unit prefix (e.g. `10%`).
   */
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  qaHook: PropTypes.string,
  /**
   * The size of the illustration.
   *
   * The available sizes are `small`, `medium`, and `large`.
   */
  size: PropTypes.oneOf(Object.keys(sizeClasses)),
  /**
   * The url for the illustration.
   *
   * You can find the link for your illustration in [the Illustration
   * repository](https://github.dev.xero.com/UXE/illustrations/tree/master/src/).
   */
  src: PropTypes.string.isRequired,
  /**
   * Optional styles to be added to the `img` element. Styles built into the component will take
   * priority.
   */
  style: PropTypes.object,
};

XUIIllustration.defaultProps = {
  alt: '',
};

export default XUIIllustration;
