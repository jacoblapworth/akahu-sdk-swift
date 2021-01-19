import React from 'react';
import PropTypes from 'prop-types';
import XUITooltip from '../../tooltip/XUITooltip';
import { NAME_SPACE } from '../helpers/constants';

const GraphTooltip = ({ height, left, message, offset, preferred, qaHook, top, width }) => (
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

export default GraphTooltip;

GraphTooltip.propTypes = {
  height: PropTypes.number,
  left: PropTypes.number,
  message: PropTypes.node,
  offset: PropTypes.number,
  preferred: PropTypes.string,
  qaHook: PropTypes.string,
  top: PropTypes.number,
  width: PropTypes.number,
};

GraphTooltip.defaultProps = {
  preferred: 'top',
};
