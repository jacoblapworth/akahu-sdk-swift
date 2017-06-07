import React from 'react';
import PropTypes from 'prop-types';
import XUIIcon from '../icon/XUIIcon';

const EmptyState = props => (
  <div
    className="xui-u-flex xui-justify-center xui-u-flex-verticalalign-center xui-u-flex-row ac-emptystate"
    data-automationid={props.qaHook}
    id={props.id}
    >
    <XUIIcon icon={props.icon} size="large"/>
    {props.children}
  </div>
);

EmptyState.propTypes = {
  qaHook: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node
}

EmptyState.defaultProps = {
  children: ('No results found'),
  icon: 'search'
}

export default EmptyState;
