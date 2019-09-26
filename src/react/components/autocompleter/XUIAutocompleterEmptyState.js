import React from 'react';
import PropTypes from 'prop-types';
import search from '@xero/xui-icon/icons/search';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import { ns } from '../helpers/xuiClassNamespace';

const XUIAutocompleterEmptyState = props => (
  <div
    className={cn(`${ns}-autocompleter--emptystate`, props.className)}
    data-automationid={props.qaHook}
    id={props.id}
  >
    <XUIIcon icon={props.icon} isBoxed size="large" />
    {props.children}
  </div>
);

XUIAutocompleterEmptyState.propTypes = {
  qaHook: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};

XUIAutocompleterEmptyState.defaultProps = {
  children: 'No results found',
  icon: search,
};

export default XUIAutocompleterEmptyState;
