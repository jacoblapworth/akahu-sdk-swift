import React from 'react';
import PropTypes from 'prop-types';
import tablePathData from '@xero/xui-icon/icons/table';
import cn from 'classnames';
import XUIIcon from '../../icon/XUIIcon';
import { ns } from '../../helpers/xuiClassNamespace';

const EmptyState = ({ children, className, defaultLayout, icon }) => (
  <div className={cn(defaultLayout && `${ns}-table--emptystate`, className)}>
    <XUIIcon icon={icon} isBoxed size="large" />
    <div>{children}</div>
  </div>
);

export default EmptyState;

EmptyState.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  defaultLayout: PropTypes.bool,
  icon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
};

EmptyState.defaultProps = {
  defaultLayout: true,
  icon: tablePathData,
};
