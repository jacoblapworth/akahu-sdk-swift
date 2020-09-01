import React from 'react';
import XUITooltip from '../../../../tooltip';
import XUIButton from '../../../../button';

class TooltipWrapper extends React.Component {
  render() {
    const { buttonContent, tipContent, triggers, size } = this.props;
    const sizeSuffix = size === 'medium' ? '' : `-${size}`;
    return (
      <XUITooltip
        trigger={<XUIButton size={size}>{buttonContent}</XUIButton>}
        triggerOnClick={triggers.indexOf('click') > -1}
        triggerOnFocus={triggers.indexOf('focus') > -1}
        triggerOnHover={triggers.indexOf('hover') > -1}
        wrapperClassName={`xui-margin-right${sizeSuffix} xui-margin-bottom${sizeSuffix}`}
      >
        {tipContent}
      </XUITooltip>
    );
  }
}

export default TooltipWrapper;
