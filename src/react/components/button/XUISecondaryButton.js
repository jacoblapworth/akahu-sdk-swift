import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import caret from '@xero/xui-icon/icons/caret';

import XUIButton from './XUIButton';
import { buttonTypes, sizeClassNames, standardVariantClassNames } from './private/constants';
import { ns } from '../helpers/xuiClassNamespace';
import XUIIcon from '../icon/XUIIcon';

export default class XUISplitButton extends PureComponent {
  render() {
    const { className, ...spreadProps } = this.props;
    spreadProps.children = null;
    return (
      <XUIButton {...spreadProps} className={cn(`${ns}-button-split`, className)} isGrouped>
        <XUIIcon icon={caret} />
      </XUIButton>
    );
  }
}

XUISplitButton.propTypes = {
  className: PropTypes.string,

  /** The `href` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
  href: PropTypes.string,

  /** Determines if the button is disabled or not. */
  isDisabled: PropTypes.bool,

  /** If true, sets appropriate `rel` values to prevent new page from having access to
   * `window.opener`. Should be used for links pointing at external sites. * */
  isExternalLink: PropTypes.bool,

  /** If this button is part of a parent button group */
  isGrouped: PropTypes.bool,

  /** Whether or not to render this button using an <a> tag */
  isLink: PropTypes.bool,

  /** If true, shows a loader inside the button and also disables the button to prevent
   * clicking. Can be used in conjunction with isDisabled (which also provides a disabled class)  */
  isLoading: PropTypes.bool,

  /**
   * Accessibility label for the `<XUILoader>`. This is required if the
   * `isLoading` prop is set to `true`.
   */
  loadingAriaLabel: PropTypes.string,

  /** Bind a function to fire when the button is clicked */
  onClick: PropTypes.func,

  /** A keydown event handler for the button */
  onKeyDown: PropTypes.func,

  qaHook: PropTypes.string,

  /** The `rel` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
  rel: PropTypes.string,

  /** Modifier for the size of the button. `xsmall`, `small`, or `medium`. */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),

  /** The HTML tabIndex property to put on the component */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** The `target` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
  target: PropTypes.string,

  /** The `title` attribute for this button */
  title: PropTypes.string,

  /** The type attribute of this button. `submit`, `button`, or `reset`. */
  type: PropTypes.oneOf(Object.keys(buttonTypes).map(type => buttonTypes[type])),

  /**
   * Determines the styling variation to apply: `standard`, `main`, `create`, or `negative`.
   */
  variant: PropTypes.oneOf(Object.keys(standardVariantClassNames)),
};

XUISplitButton.defaultProps = {
  isDisabled: false,
  isExternalLink: false,
  isGrouped: false,
  isLink: false,
  isLoading: false,
  tabIndex: 0,
  type: buttonTypes.button,
  variant: 'standard',
};
