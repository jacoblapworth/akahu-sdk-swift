import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import chart from '@xero/xui-icon/icons/chart';
import XUIIcon from '../../icon/XUIIcon';
import { NAME_SPACE } from '../helpers/constants';

class ChartEmpty extends PureComponent {
  render = () => {
    const { qaHook, emptyStateComponent, emptyMessage, chartHeight } = this.props;
    const emptyHeight = chartHeight * 0.75;
    const chartClassName = cn(`${NAME_SPACE}-chart`, `${NAME_SPACE}-chart-is-empty`);

    return (
      <div
        className={chartClassName}
        data-automationid={qaHook && `${qaHook}--empty`}
        style={{ minHeight: `${emptyHeight}px` }}
      >
        {emptyStateComponent || (
          <div className={`${NAME_SPACE}-chart--empty`}>
            <XUIIcon icon={chart} isBoxed size="large" />
            <div>{emptyMessage}</div>
          </div>
        )}
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
