import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import XUIActions from '../../actions';
import SizeContext from '../../contexts/SizeContext';
import { baseClassName } from './private/constants';

const XUIPopoverFooter = ({ className, primaryAction, qaHook, secondaryAction }) => {
  return (
    <div className={cn(`${baseClassName}--footer`, className)} data-automationid={qaHook}>
      <SizeContext.Provider value="small">
        <XUIActions
          isLinear={Boolean(primaryAction && secondaryAction)}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
        />
      </SizeContext.Provider>
    </div>
  );
};

XUIPopoverFooter.propTypes = {
  className: PropTypes.string,
  /**
   * A `XUIButton` used for the primary action of the popover.
   */
  primaryAction: PropTypes.element,
  qaHook: PropTypes.string,
  /**
   * A `XUIButton` used for the secondary action of the popover.
   */
  secondaryAction: PropTypes.element,
};

export default XUIPopoverFooter;
