import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaDetail from './XUIGridAreaDetail';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass, { buildGlobalCompositionClasses } from './helpers';

export default class XUICompositionDetailHeader extends PureComponent {
  render() {
    const { className, header, detail, ...spreadProps } = this.props;

    const compositionClasses = cn(
      buildGlobalCompositionClasses(spreadProps),
      `${baseCompositionClass}-detailheader`,
      className,
    );

    return (
      <div className={compositionClasses}>
        <XUIGridAreaHeader>{header}</XUIGridAreaHeader>
        <XUIGridAreaDetail>{detail}</XUIGridAreaDetail>
      </div>
    );
  }
}

XUICompositionDetailHeader.propTypes = {
  className: PropTypes.string,

  /**
   * Header content or component
   */
  header: PropTypes.element.isRequired,
  /**
   * Main content
   */
  detail: PropTypes.element.isRequired,
  /**
   * Determines whether the main content takes full width of page. Defaults to false.
   */
  isInfinite: PropTypes.bool,
  /**
   * Whether to apply a pre-set grid-gap between all grid areas. Defaults to true.
   */
  hasGridGap: PropTypes.bool,
  /**
   * Whether to apply pre-set spacing to the outside of the composition grid. Defaults to true.
   */
  hasAutoSpaceAround: PropTypes.bool,
};

XUICompositionDetailHeader.defaultProps = {
  hasGridGap: true,
  hasAutoSpaceAround: true,
};
