import * as React from 'react';

import { sizeClassNames, variantClassNames } from './constants';

export interface Props {
  className?: string;
  /**
   * A unique string that will be used to generate the color of the avatar if color is not provided.
   * If this is not set then value is used as the identifier.
   */
  identifier?: string;
  /**
   * The image the component should render. Initials rendered otherwise.
   */
  imageUrl?: string;
  /**
   * Error handler if the avatar image fails to load.
   */
  onError?: React.ReactEventHandler<HTMLElement>;
  qaHook?: string;
  /**
   * The size of the avatar.
   */
  size?: keyof typeof sizeClassNames;
  /**
   * The text to display in the avatar.
   */
  value: string;
  /**
   * The avatar variant.
   */
  variant?: keyof typeof variantClassNames;
}

export default class XUIAvatar extends React.PureComponent<Props> {
  /**
   * onError handler for the image element
   */
  onError(e: Error): void;
}
