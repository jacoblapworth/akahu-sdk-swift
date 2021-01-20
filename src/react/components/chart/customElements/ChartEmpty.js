import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import chart from '@xero/xui-icon/icons/chart';
import XUIIcon from '../../icon/XUIIcon';
import { NAME_SPACE } from '../helpers/constants';

/**
 * We broke this out so we can require `emptyMessage` if an
 * `emptyStateComponent` is not provided. This is similar to how we do it in
 * `XUIAccordion` and `XUIAutocompleter`. (Custom `PropTypes` validators can
 * only check for basic JS types, not React nodes, so using one wasn’t an option
 * here.)
 *
 * TODO: Move this component out so we can use this pattern globally.
 */
const ChartEmptyState = ({ emptyMessage, icon }) => (
  <div className={`${NAME_SPACE}-chart--empty`}>
    <XUIIcon icon={icon} isBoxed size="large" />
    <div>{emptyMessage}</div>
  </div>
);

ChartEmptyState.propTypes = {
  emptyMessage: PropTypes.node.isRequired,
  icon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
};

const ChartEmpty = ({
  chartHeight,
  emptyMessage,
  emptyStateComponent,
  emptyStateIcon = chart,
  qaHook,
}) => {
  const emptyHeight = chartHeight * 0.75;
  const chartClassName = cn(`${NAME_SPACE}-chart`, `${NAME_SPACE}-chart-is-empty`);

  return (
    <div
      className={chartClassName}
      data-automationid={qaHook && `${qaHook}--empty`}
      style={{ minHeight: `${emptyHeight}px` }}
    >
      {emptyStateComponent || <ChartEmptyState emptyMessage={emptyMessage} icon={emptyStateIcon} />}
    </div>
  );
};

export default ChartEmpty;

ChartEmpty.propTypes = {
  chartHeight: PropTypes.number,
  emptyMessage: PropTypes.node,
  emptyStateComponent: PropTypes.element,
  /**
   * Optional prop for users to modify the empty chart state icon, if required for localisation.
   * Defaults to the chart icon, if no value is provided.
   */
  emptyStateIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
  qaHook: PropTypes.string,
};
