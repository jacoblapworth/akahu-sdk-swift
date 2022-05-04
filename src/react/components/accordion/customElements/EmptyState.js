import React from 'react';
import PropTypes from 'prop-types';
import XUIIcon from '../../icon/XUIIcon';
import { ns } from '../../helpers/xuiClassNamespace';

const XUIAccordionItemEmptyState = ({ children, emptyIcon, qaHook }) => (
  <div className={`${ns}-accordion--emptystate`} data-automationid={qaHook}>
    <XUIIcon icon={emptyIcon} isBoxed size="large" />
    <div>{children}</div>
  </div>
);

export default XUIAccordionItemEmptyState;

XUIAccordionItemEmptyState.propTypes = {
  children: PropTypes.node,
  emptyIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
  qaHook: PropTypes.string,
};
