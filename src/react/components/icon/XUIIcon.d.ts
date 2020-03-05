import { colorClasses, rotationClasses, wrapperSizeClasses } from './private/constants';

export interface XUIIconData {
  height: number;
  path: string;
  width: number;
}

export interface Props {
  className?: string;
  /**
   * Adds a color modifier to the icon.
   */
  color?: keyof typeof colorClasses;
  /**
   * Description to be read by screen readers.
   */
  desc?: string;
  /**
   * An object describing the path, width and height.
   */
  icon: XUIIconData;
  /**
   * Whether the icon should be wrapped in a wrapper with a set size.
   */
  isBoxed?: boolean;
  qaHook?: string;
  /**
   * Role to be applied to the SVG for screen readers.
   */
  role?: string;
  /**
   * Adds a rotation modifier to the icon.
   *
   * Defaults to `0`.
   */
  rotation?: keyof typeof rotationClasses | 0 | '0' | '90' | '180' | '270';
  /**
   * Adds a size modifier to the icon.
   */
  size?: keyof typeof wrapperSizeClasses;
  /**
   * Title to be read by screen readers.
   */
  title?: string;
}

declare const XUIIcon: React.FunctionComponent<Props>;
export default XUIIcon;
