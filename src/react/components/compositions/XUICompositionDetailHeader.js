import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaDetail from './XUIGridAreaDetail';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass, { buildGlobalCompositionClasses } from './helpers';

const XUICompositionDetailHeader = ({ className, detail, header, ...spreadProps }) => {
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
};

export default XUICompositionDetailHeader;

XUICompositionDetailHeader.propTypes = {
  className: PropTypes.string,
  /**
   * Main content
   */
  detail: PropTypes.element.isRequired,
  /**
   * Whether to apply pre-set spacing to the outside of the composition grid. Defaults to true.
   */
  hasAutoSpaceAround: PropTypes.bool,
  /**
   * Whether to apply a pre-set grid-gap between all grid areas. Defaults to true.
   */
  hasGridGap: PropTypes.bool,
  /**
   * Header content or component
   */
  header: PropTypes.element.isRequired,
  /**
   * Determines whether the main content takes full width of page. Defaults to false.
   */
  isInfinite: PropTypes.bool,
};

XUICompositionDetailHeader.defaultProps = {
  hasAutoSpaceAround: true,
  hasGridGap: true,
};
