import React, { PureComponent } from 'react';
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
const ChartEmptyState = ({ emptyMessage }) => (
  <div className={`${NAME_SPACE}-chart--empty`}>
    <XUIIcon icon={chart} size="large" isBoxed />
    <div>{emptyMessage}</div>
  </div>
);

ChartEmptyState.propTypes = {
  emptyMessage: PropTypes.node.isRequired,
};

class ChartEmpty extends PureComponent {
  render = () => {
    const { qaHook, emptyStateComponent, emptyMessage, chartHeight } = this.props;
    const emptyHeight = chartHeight * 0.75;
    const chartClassName = cn(`${NAME_SPACE}-chart`, `${NAME_SPACE}-chart-is-empty`);

    return (
      <div
        data-automationid={qaHook && `${qaHook}--empty`}
        className={chartClassName}
        style={{ minHeight: `${emptyHeight}px` }}
      >
        {emptyStateComponent || <ChartEmptyState emptyMessage={emptyMessage} />}
      </div>
    );
  };
}

export default ChartEmpty;

ChartEmpty.propTypes = {
  qaHook: PropTypes.string,
  emptyStateComponent: PropTypes.element,
  emptyMessage: PropTypes.node,
  chartHeight: PropTypes.number,
};
