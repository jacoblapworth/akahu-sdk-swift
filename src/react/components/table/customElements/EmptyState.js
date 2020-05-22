import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import tablePathData from '@xero/xui-icon/icons/table';
import cn from 'classnames';
import XUIIcon from '../../icon/XUIIcon';
import { ns } from '../../helpers/xuiClassNamespace';

export default class EmptyState extends PureComponent {
  render() {
    const { defaultLayout, className, children, icon } = this.props;

    return (
      <div className={cn(defaultLayout && `${ns}-table--emptystate`, className)}>
        <XUIIcon icon={icon} isBoxed size="large" />
        <div>{children}</div>
      </div>
    );
  }
}

EmptyState.propTypes = {
  children: PropTypes.node.isRequired,
  defaultLayout: PropTypes.bool,
  className: PropTypes.string,
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
