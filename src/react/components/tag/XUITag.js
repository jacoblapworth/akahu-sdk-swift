import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../helpers/xuiGlobalChecks';
import { baseClass, variants, sizes } from './private/constants';

import XUITooltip from '../tooltip/XUITooltip';

function tagTextOverflows(domElement) {
  return domElement && domElement.clientWidth < domElement.scrollWidth;
}

class XUITag extends PureComponent {
  state = {
    tooltipIsAttached: false,
  };

  _tooltip = React.createRef();
  _tag = React.createRef();

  componentDidMount() {
    const tagElement = this._tag && this._tag.current;

    if (this.state.tooltipIsAttached === false && tagTextOverflows(tagElement)) {
      this.setState({
        tooltipIsAttached: true,
      });
    }
  }

  render() {
    const { className, variant, qaHook, children, size, debugShowToolTip, id } = this.props;

    const tagNode = (
      <span
        className={cn(
          `${baseClass}content`,
          this.state.tooltipIsAttached && `${baseClass}-is-block`,
        )}
        data-automationid={qaHook}
        ref={this._tag}
        role="status"
      >
        {children}
      </span>
    );

    let componentNode;

    if (this.state.tooltipIsAttached || debugShowToolTip) {
      componentNode = (
        <XUITooltip
          id={id}
          isHidden={!debugShowToolTip}
          limitWidth
          ref={this._tooltip}
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
  }
}

XUITag.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,
  /** Id for tooltip */
  id: PropTypes.string,
  className: PropTypes.string,
  /** Variant of tag to render */
  variant: PropTypes.oneOf(Object.keys(variants)),
  /** Size of tag to render */
  size: PropTypes.oneOf(Object.keys(sizes)),
  /**
   * @ignore
   * Dev / debug prop to show the tooltip initially on mount instead of based on a user event */
  debugShowToolTip: PropTypes.bool,
};

XUITag.defaultProps = {
  variant: 'standard',
  size: 'medium',
};

export { XUITag as default, variants, sizes };
