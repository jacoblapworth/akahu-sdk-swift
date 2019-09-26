import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XUIIcon from '../../icon/XUIIcon';
import { ns } from '../../helpers/xuiClassNamespace';

export default class XUIAccordionItemEmptyState extends PureComponent {
  render() {
    const { children, qaHook, emptyIcon } = this.props;

    return (
      <div className={`${ns}-accordion--emptystate`} data-automationid={qaHook}>
        <XUIIcon icon={emptyIcon} isBoxed size="large" />
        <div>{children}</div>
      </div>
    );
  }
}

XUIAccordionItemEmptyState.propTypes = {
  qaHook: PropTypes.string,
  emptyIcon: PropTypes.object,
  children: PropTypes.node,
};
