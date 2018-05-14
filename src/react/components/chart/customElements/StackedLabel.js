import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ap } from '../helpers';

class StackedLabel extends Component {
  render() {
    const {
      angle,
      datum,
      index,
      polar,
      scale,
      style,
      text: mainText,
      textAnchor,
      verticalAnchor,
      x,
      y
    } = this.props;
    const spacerSize = 0;
    const circleRadius = 14;
    const circleYOffset = y + spacerSize + circleRadius;
    const textYOffset = circleYOffset + circleRadius * 2 + 5;
    const codeText = mainText.slice(0, 1).toUpperCase();
    const codeYOffset = circleYOffset + 5;
    // console.log(this.props);
    return (
      <g>
        {/*
        <rect
          className="xui-measure"
          height={ap(spacerSize)}
          width={ap(spacerSize)}
          x={ap(x)}
          y={ap(y)}
          fill="transparent"
        />
        */}
        <circle
          className="xui-measure"
          cx={ap(x)}
          cy={ap(circleYOffset)}
          r={ap(circleRadius)}
          fill={"lightgray"}
        />
        <text
          className="xui-measure"
          x={ap(x)}
          y={ap(textYOffset)}
          textAnchor={textAnchor}
        >
          {/*
            <tspan>{mainText}</tspan>
          */}
          {mainText}
        </text>
        <text x={ap(x)} y={ap(codeYOffset)} textAnchor={textAnchor}>
          <tspan>{codeText}</tspan>
        </text>
      </g>
    );
  }
}

export default StackedLabel;
