import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIGridAreaPrimary from './XUIGridAreaPrimary';
import XUIGridAreaDetail from './XUIGridAreaDetail';

import baseCompositionClass, { buildLayoutClass, buildGlobalCompositionClasses } from './helpers';

const compositionName = 'split';
const rootClass = `${baseCompositionClass}-${compositionName}`;

const XUICompositionSplit = ({
  className,
  hasPrimaryBelowAtSmall,
  primary,
  retainWidth,
  secondary,
  ...spreadProps
}) => {
  const compositionClasses = cn(
    buildGlobalCompositionClasses(spreadProps),
    buildLayoutClass({ retainWidth, compositionName }),
    rootClass,
    hasPrimaryBelowAtSmall && `${rootClass}-primarybelow`,
    className,
  );

  return (
    <div className={compositionClasses}>
      <XUIGridAreaPrimary>{primary}</XUIGridAreaPrimary>
      <XUIGridAreaDetail>{secondary}</XUIGridAreaDetail>
    </div>
  );
};

export default XUICompositionSplit;

XUICompositionSplit.propTypes = {
  className: PropTypes.string,
  /**
   * Whether to apply pre-set spacing to the outside of the composition grid. Defaults to true.
   */
  hasAutoSpaceAround: PropTypes.bool,
  /**
   * Whether to apply a pre-set grid-gap between all grid areas. Defaults to true.
   */
  hasGridGap: PropTypes.bool,
  /**
   * In the stacked layout, whether to put primary content below the secondary content. Defaults to false.
   */
  hasPrimaryBelowAtSmall: PropTypes.bool,
  /**
   * Determines whether the main content takes full width of page. Defaults to false.
   */
  isInfinite: PropTypes.bool,
  /**
   * More recent or important content
   */
  primary: PropTypes.element.isRequired,
  /**
   * Lets you set a retain width value so that the layout doesn't change when the
   * viewport is equal to or larger than the width specified
   */
  retainWidth: PropTypes.oneOf(['', 'small']),
  /**
   * Accompanying content
   */
  secondary: PropTypes.element.isRequired,
};

XUICompositionSplit.defaultProps = {
  hasAutoSpaceAround: true,
  hasGridGap: true,
};
