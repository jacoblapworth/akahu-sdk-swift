import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaDetail from './XUIGridAreaDetail';
import XUIGridAreaMaster from './XUIGridAreaMaster';
import XUIGridAreaHeader from './XUIGridAreaHeader';

import baseCompositionClass, { buildLayoutClass, buildGlobalCompositionClasses } from './helpers';

const compositionName = 'masterdetailheader';

const XUICompositionMasterDetailHeader = ({
  className,
  detail,
  header,
  master,
  retainWidth,
  ...spreadProps
}) => {
  const compositionClasses = cn(
    buildGlobalCompositionClasses(spreadProps),
    buildLayoutClass({ retainWidth, compositionName }),
    `${baseCompositionClass}-${compositionName}`,
    className,
  );

  return (
    <div className={compositionClasses}>
      <XUIGridAreaHeader>{header}</XUIGridAreaHeader>
      <XUIGridAreaMaster>{master}</XUIGridAreaMaster>
      <XUIGridAreaDetail>{detail}</XUIGridAreaDetail>
    </div>
  );
};

export default XUICompositionMasterDetailHeader;

XUICompositionMasterDetailHeader.propTypes = {
  className: PropTypes.string,

  /**
   * Header content or component
   */
  header: PropTypes.element.isRequired,
  /**
   * Nav content or controls for detail content
   */
  master: PropTypes.element.isRequired,
  /**
   * Main content
   */
  detail: PropTypes.element.isRequired,
  /**
   * Determines whether the main content takes full width of page. Defaults to false.
   */
  isInfinite: PropTypes.bool,
  /**
   * Lets you set a retain width value so that the layout doesn't change when the
   * viewport is equal to or larger than the width specified
   */
  retainWidth: PropTypes.oneOf(['', 'small']),
  /**
   * Whether to apply a pre-set grid-gap between all grid areas. Defaults to true.
   */
  hasGridGap: PropTypes.bool,
  /**
   * Whether to apply pre-set spacing to the outside of the composition grid. Defaults to true.
   */
  hasAutoSpaceAround: PropTypes.bool,
  /**
   * Whether to apply pre-set widths to columsn of the composition grid. Defaults to true.
   */
  hasAutoColumnWidths: PropTypes.bool,
};

XUICompositionMasterDetailHeader.defaultProps = {
  hasGridGap: true,
  hasAutoSpaceAround: true,
  hasAutoColumnWidths: true,
};
