import * as React from 'react';

import { sizeClasses } from './private/constants';

interface Props {
  /**
   * The alternative text for the `img` element.
   *
   * Defaults to an empty string (`alt=""`) which indicates that this image is not a key part of the
   * content (decorative), and that non-visual browsers may omit it from rendering.
   *
   * For more information [visit the MDN page for the Image Embed
   * element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes).
   */
  alt?: string;
  className?: string;
  /**
   * We recommend using one of the provided sizes, but you can use the `height` prop if you need to
   * set a custom height.
   *
   * To set the height of the illustration, provide the desired height in pixels as a `number`, or
   * as a `string` with a CSS unit prefix.
   *
   * e.g. `100%`
   */
  height?: number | string;
  /**
   * The padding for the illustration.
   *
   * To set the padding for the illustration, provide the desired padding in pixels as a `number`,
   * or as a string with a CSS unit prefix (e.g. `10%`).
   */
  padding?: number | string;
  qaHook?: string;
  /**
   * The size of the illustration.
   */
  size?: keyof typeof sizeClasses;
  /**
   * The url for the illustration.
   *
   * You can find the link for your illustration in [the Illustration
   * repository](https://github.dev.xero.com/UXE/illustrations/tree/master/src/).
   */
  src: string;
  /**
   * Optional styles to be added to the `img` element. Styles built into the component will take
   * priority.
   */
  style?: React.CSSProperties;
}

declare const XUIIllustration: React.FunctionComponent<Props>;
export default XUIIllustration;
