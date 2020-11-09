import React from 'react';
import PropTypes from 'prop-types';
import search from '@xero/xui-icon/icons/search';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import { ns } from '../helpers/xuiClassNamespace';

const XUIAutocompleterEmptyState = ({
  className,
  qaHook,
  icon,
  iconComponent,
  iconProps,
  id,
  children,
}) => (
  <div
    className={cn(`${ns}-autocompleter--emptystate`, className)}
    data-automationid={qaHook}
    id={id}
  >
    {iconComponent ? (
      React.cloneElement(iconComponent, {
        className: cn(iconComponent.props.className),
      })
    ) : (
      <XUIIcon {...iconProps} icon={icon} isBoxed size="large" />
    )}
    {children}
  </div>
);

export default XUIAutocompleterEmptyState;

XUIAutocompleterEmptyState.propTypes = {
  qaHook: PropTypes.string,
  id: PropTypes.string,
  /** Used to specify a custom icon for the empty state. This will not be used if an `iconComponent` is supplied. */
  icon: PropTypes.object,
  /** An icon component. May be used instead of `iconProps` and `icon` */
  iconComponent: (props, propName) => {
    if (props[propName] && props.iconProps) {
      return new Error('Cannot accept `iconProps`, `icon` and an `iconComponent`');
    }
    return null;
  },
  /** Additional properties passed to the icon component. This will not be used if an `iconComponent` is supplied. */
  iconProps: PropTypes.object,
  /**
   * Content to be displayed with the icon
   * <br />
   * Recommended English value: *No results found*
   */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

XUIAutocompleterEmptyState.defaultProps = {
  icon: search,
};
