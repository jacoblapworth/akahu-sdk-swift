import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../helpers/xuiGlobalChecks';
import { baseClass, variants, sizes } from './private/constants';

import XUITooltip from '../tooltip/XUITooltip';

function tagTextOverflows(domElement) {
  return domElement && domElement.clientWidth < domElement.scrollWidth;
}

const XUITag = ({ children, className, debugShowToolTip, id, qaHook, size, variant }) => {
  const [tooltipIsAttached, setTooltipIsAttached] = useState(false);

  const _tooltip = useRef();
  const _tag = useRef();

  useEffect(() => {
    if (tooltipIsAttached === false && tagTextOverflows(_tag.current)) {
      setTooltipIsAttached(true);
    }
  }, [tooltipIsAttached]);

  const tagNode = (
    <span
      className={cn(`${baseClass}content`, tooltipIsAttached && `${baseClass}-is-block`)}
      data-automationid={qaHook}
      ref={_tag}
    >
      {children}
    </span>
  );

  let componentNode;

  if (tooltipIsAttached || debugShowToolTip) {
    componentNode = (
      <XUITooltip
        hasLimitedWidth
        id={id}
        isHidden={!debugShowToolTip}
        ref={_tooltip}
        trigger={tagNode}
      >
        {children}
      </XUITooltip>
    );
  } else {
    componentNode = tagNode;
  }

  return (
    <span className={cn(baseClass, className, variants[variant], sizes[size])}>
      {componentNode}
    </span>
  );
};

export { XUITag as default, variants, sizes };

XUITag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * @ignore
   * Dev / debug prop to show the tooltip initially on mount instead of based on a user event */
  debugShowToolTip: PropTypes.bool,
  /** Id for tooltip */
  id: PropTypes.string,
  qaHook: PropTypes.string,
  /** Size of tag to render */
  size: PropTypes.oneOf(Object.keys(sizes)),
  /** Variant of tag to render */
  variant: PropTypes.oneOf(Object.keys(variants)),
};

XUITag.defaultProps = {
  size: 'medium',
  variant: 'standard',
};
