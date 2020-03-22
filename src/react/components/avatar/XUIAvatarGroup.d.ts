import * as React from 'react';

import { sizeClassNames } from './constants';

interface Props {
  /**
   * The size to apply to all avatars contained within the group. This will override any individual
   * avatar's size settings.
   */
  avatarSize?: keyof typeof sizeClassNames;
  children?: React.ReactNode;
  className?: string;
  /**
   * The maximum number of avatars to show.
   */
  maxAvatars?: number;
  qaHook?: string;
}

export default class XUIAvatarGroup extends React.PureComponent<Props> {}
