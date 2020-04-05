import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUILoader from '../../loader/XUILoader';
import { NAME_SPACE } from '../helpers/constants';

class ChartLoader extends PureComponent {
  render = () => {
    const { qaHook, chartHeight, loadingAriaLabel } = this.props;
    const chartClassName = cn(`${NAME_SPACE}-chart`, `${NAME_SPACE}-chart-is-loading`);

    return (
      <div
        className={chartClassName}
        data-automationid={qaHook && `${qaHook}--loader`}
        style={{ height: `${chartHeight}px` }}
      >
        <XUILoader ariaLabel={loadingAriaLabel} />
      </div>
    );
  };
}

export default ChartLoader;

ChartLoader.propTypes = {
  qaHook: PropTypes.string,
  chartHeight: PropTypes.number,
  /** Accessibility label for the `<XUILoader>` */
  loadingAriaLabel: PropTypes.string.isRequired,
};
