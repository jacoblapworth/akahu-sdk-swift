import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { alwaysPositive } from '../helpers';

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
		const spacerXOffset = (barWidth * barIndex) + (barWidth * 0.5) + yAxisWidth;
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
          height={alwaysPositive(spacerYoffset)}
          width={alwaysPositive(spacerYoffset)}
          x={alwaysPositive(x)}
          y={alwaysPositive(y)}
          fill="transparent"
        />
        */}
        <circle
          className="xui-measure"
          cx={spacerXOffset}
          cy={circleYOffset}
          r={circleRadius}
          fill={"lightgray"}
        />
        <text
          className="xui-measure"
          x={spacerXOffset}
          y={textYOffset}
          textAnchor={textAnchor}>
          <tspan>{mainText}</tspan>
        </text>
				<text
					x={spacerXOffset}
					y={codeYOffset}
					textAnchor={textAnchor}>
          <tspan>{codeText}</tspan>
        </text>
      </g>
    );
  }
}

export default StackedLabel;
