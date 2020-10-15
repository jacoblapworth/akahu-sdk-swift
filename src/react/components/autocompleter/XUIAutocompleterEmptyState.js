import React from 'react';
import PropTypes from 'prop-types';
import search from '@xero/xui-icon/icons/search';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import { ns } from '../helpers/xuiClassNamespace';

const XUIAutocompleterEmptyState = ({ children, className, icon, id, qaHook }) => (
  <div
    className={cn(`${ns}-autocompleter--emptystate`, className)}
    data-automationid={qaHook}
    id={id}
  >
    <XUIIcon icon={icon} isBoxed size="large" />
    {children}
  </div>
);

export default XUIAutocompleterEmptyState;

XUIAutocompleterEmptyState.propTypes = {
  qaHook: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.object,
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
