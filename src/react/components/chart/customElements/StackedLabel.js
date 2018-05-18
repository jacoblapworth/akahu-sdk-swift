import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { alwaysPositive } from '../helpers';
import { baseFontTheme } from '../helpers/theme';

class StackedLabel extends Component {
	render() {
		const {
			barWidth,
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
		const spacerXOffset = (barWidth * barIndex) + (barWidth * 0.5);
		const circleRadius = 14;
		const circleYOffset = y + spacerYoffset + circleRadius;
		const textYOffset = circleYOffset + (circleRadius * 2) + 5;
		const codeText = mainText.slice(0, 1).toUpperCase();
		const codeYOffset = circleYOffset + 5;

		return (
			<g>
				<circle
					className="xui-chart--measure"
					cx={spacerXOffset}
					cy={circleYOffset}
					r={circleRadius}
					fill="lightgray"
				/>
				<text
					x={spacerXOffset}
					y={codeYOffset}
					textAnchor={textAnchor}>
					<tspan style={baseFontTheme}>{codeText}</tspan>
				</text>
				<text
					className="xui-chart--measure"
					x={spacerXOffset}
					y={textYOffset}
					textAnchor={textAnchor}>
					<tspan style={baseFontTheme}>{mainText}</tspan>
				</text>
			</g>
		);
	}
}

export default StackedLabel;
