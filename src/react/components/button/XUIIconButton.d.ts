import React from 'react';

import { colorClasses, rotationClasses, wrapperSizeClasses } from '../icon/private/constants';
import { XUIIconData } from '../icon/XUIIcon';
import { Props as XUIButtonProps } from './XUIButton';

interface BaseProps {
  /**
   * Required prop, providing the label to any assistive technologies.
   */
  ariaLabel: string;
  /**
   * Description of the icon to be read by screen readers.
   */
  desc?: string;
  /**
   * Required prop, an object describing the path, width and height.
   */
  icon: XUIIconData;
  /**
   * Adds a color modifier to the icon.
   */
  iconColor?: keyof typeof colorClasses;
  /**
   * Adds a size modifier to the icon.
   */
  iconSize?: keyof typeof wrapperSizeClasses;
  /**
   * Role to be applied to the icon SVG for screen readers.
   */
  role?: string;
  /**
   * Adds a rotation modifier to the icon.
   *
   * Defaults to `0`.
   */
  rotation?: keyof typeof rotationClasses | 0 | '0' | '90' | '180' | '270';
}

type DerivedProps = Omit<
  XUIButtonProps,
  | 'fullWidth'
  | 'isGrouped'
  | 'isLoading'
  | 'loadingLabel'
  | 'minLoaderWidth'
  | 'retainLayout'
  | 'variant'
>;
type Props = BaseProps & DerivedProps;

export default class XUIIconButton extends React.PureComponent<Props> {}
