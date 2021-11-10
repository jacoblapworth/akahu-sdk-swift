import '../helpers/xuiGlobalChecks';

import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUITooltip from '../tooltip/XUITooltip';
import { baseClass, sizes, variants } from './private/constants';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * @ignore
   * Dev / debug prop to show the tooltip initially on mount instead of based on a user event.
   */
  debugShowToolTip?: boolean;
  /**
   * Id for tooltip.
   */
  id?: string;
  qaHook?: string;
  /**
   * Size of tag to render.
   */
  size?: keyof typeof sizes;
  /**
   * Type of tag to render.
   */
  variant?: keyof typeof variants;
}

function tagTextOverflows(domElement: HTMLInputElement | null) {
  return domElement && domElement.clientWidth < domElement.scrollWidth;
}

const XUITag = ({ children, className, debugShowToolTip, id, qaHook, size, variant }: Props) => {
  const [tooltipIsAttached, setTooltipIsAttached] = React.useState(false);

  const _tooltip = React.useRef<XUITooltip>(null);
  const _tag = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
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
    <span className={cn(baseClass, className, variant && variants[variant], size && sizes[size])}>
      {componentNode}
    </span>
  );
};

export { XUITag as default, sizes, variants };

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
