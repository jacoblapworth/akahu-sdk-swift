import * as React from 'react';

import XUIIcon, { XUIIconData } from '../icon/XUIIcon';

interface BaseProps {
  /**
   * Content to be displayed with the icon.
   *
   * Recommended English value: *No results found*
   */
  children: React.ReactNode;
  className?: string;
  id?: string;
  qaHook?: string;
}

type IconProps =
  | {
      /** An icon to be used for empty state. Can't be used with `iconComponent`. Passing `iconComponent` will ignore this property. */
      icon?: XUIIconData;
      /** Additional properties passed to an icon component. Can't be used with `iconComponent`. Passing `iconComponent` will ignore this property. */
      iconProps?: React.ComponentProps<typeof XUIIcon>;
    }
  | {
      /** An icon component. May be used instead of `iconProps` and `icon` */
      iconComponent?: React.ReactNode;
    };

type Props = BaseProps & IconProps;

declare const XUIAutocompleterEmptyState: React.FunctionComponent<Props>;
export default XUIAutocompleterEmptyState;
