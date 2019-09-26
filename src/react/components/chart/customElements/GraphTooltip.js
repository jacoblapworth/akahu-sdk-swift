import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XUITooltip from '../../tooltip/XUITooltip';
import { NAME_SPACE } from '../helpers/constants';

class GraphTooltip extends PureComponent {
  render = () => {
    const { qaHook, message, offset, left, top, width, height, preferred } = this.props;
    return (
      <div
        className={`${NAME_SPACE}-chart--tooltip`}
        style={{
          top,
          height,
          width,
          left: left - offset,
        }}
      >
        <XUITooltip
          isHidden={false}
          preferredPosition={preferred}
          qaHook={qaHook}
          trigger={<div style={{ width, height }} />}
          triggerOnBlur={false}
          triggerOnClick={false}
          triggerOnFocus={false}
          triggerOnHover={false}
        >
          {message}
        </XUITooltip>
      </div>
    );
  };
}

export default GraphTooltip;

GraphTooltip.propTypes = {
  qaHook: PropTypes.string,
  message: PropTypes.node,
  offset: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  preferred: PropTypes.string,
};

GraphTooltip.defaultProps = {
  preferred: 'top',
};
