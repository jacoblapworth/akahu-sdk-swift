import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ap } from '../helpers';

class StackedLabel extends Component {
  render() {
    const {
			barWidth,
			yAxisWidth,
      angle,
      datum,
      index: barIndex,
      polar,
      scale,
      style,
      text: mainText,
      textAnchor,
      verticalAnchor,
      x,
      y
    } = this.props;
		const spacerYoffset = 0;
		const spacerXOffset = ap((barWidth * barIndex) + (barWidth * 0.5) + yAxisWidth);
    const circleRadius = 14;
    const circleYOffset = y + spacerYoffset + circleRadius;
    const textYOffset = circleYOffset + circleRadius * 2 + 5;
    const codeText = mainText.slice(0, 1).toUpperCase();
    const codeYOffset = circleYOffset + 5;
    // console.log(this.props);
    return (
      <g>
        {/*
        <rect
          className="xui-measure"
          height={ap(spacerYoffset)}
          width={ap(spacerYoffset)}
          x={ap(x)}
          y={ap(y)}
          fill="transparent"
        />
        */}
        <circle
          className="xui-measure"
          cx={spacerXOffset}
          cy={ap(circleYOffset)}
          r={ap(circleRadius)}
          fill={"lightgray"}
        />
        <text
          className="xui-measure"
          x={spacerXOffset}
          y={ap(textYOffset)}
          textAnchor={textAnchor}
        >
          {/*
            <tspan>{mainText}</tspan>
          */}
          {mainText}
        </text>
        <text x={spacerXOffset} y={ap(codeYOffset)} textAnchor={textAnchor}>
          <tspan>{codeText}</tspan>
        </text>
      </g>
    );
  }
}

export default StackedLabel;
