import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { alwaysPositive } from '../helpers';
import { baseFontTheme } from '../helpers/theme';

const createStackedAvatar = ({ barWidth, barIndex, rawText, rawYOffset }) => {

	const avatarCircleRadius = 14;
	const avatarCircleDiameter = avatarCircleRadius * 2;
	const avatarCircleXOffset = (barWidth * barIndex) + (barWidth * 0.5);
	const avatarCircleYOffset = rawYOffset + avatarCircleRadius;
	const avatarTextXOffset = avatarCircleXOffset;
	const avatarTextYOffset = avatarCircleYOffset + 5;
	const avatarText = rawText.slice(0, 1).toUpperCase();

	return {
		avatarCircleRadius,
		avatarCircleDiameter,
		avatarCircleXOffset,
		avatarCircleYOffset,
		avatarTextXOffset,
		avatarTextYOffset,
		avatarText,
	};

};

const createStackedLabel = ({ rawText }, { avatarCircleDiameter, avatarCircleXOffset, avatarCircleYOffset }) => {

	const labelXOffset = avatarCircleXOffset;
	const labelYOffset = avatarCircleYOffset + avatarCircleDiameter + 5;
	const labelText = rawText;
	const labelStyle = baseFontTheme;
	const labelAnchor = 'middle';

	return {
		labelXOffset,
		labelYOffset,
		labelText,
		labelStyle,
		labelAnchor,
	};

};

const responsiveOptions = {

	0(params) {

		// .- - - .
		// |  ()  | <-- Avatar only
		// °- - - °

		return createStackedAvatar(params);

	},

	50(params) {

		// .- - - - - - - .
		// |      ()      | <-- Stacked / Small font
		// |  Label Text  |
		// °- - - - - - - °

		const avatar = createStackedAvatar(params);
		const label = createStackedLabel(params, avatar);
		// const { rawText } = params;
		// // const { avatarCircleXOffset, avatarCircleYOffset, avatarCircleRadius } = avatar;
		// // const labelXOffset = avatarCircleXOffset;
		// // const labelYOffset = avatarCircleYOffset + (avatarCircleRadius * 2) + 5;
		// // const labelText = rawText;

		return {
			...avatar,
			...label
		};

	},

	80(params) {

		// .- - - - - - - .
		// |      ()      | <-- Stacked / Large font
		// |  Label Text  |
		// °- - - - - - - °

		const avatar = createStackedAvatar(params);
		const label = createStackedLabel(params, avatar);
		const labelStyle = { ...baseFontTheme, fontSize: 15 };

		return {
			...avatar,
			...label,
			labelStyle
		};

	},

	100(params) {

		// .- - - - - - - - -.
		// |  () Label Text  | <-- Inline / Large font
		// °- - - - - - - - -°

		// const avatarCircleRadius = 14;
		// const avatarCircleDiameter = avatarCircleRadius * 2;
		// const avatarCircleXOffset = (barWidth * barIndex) + avatarCircleDiameter;
		// const avatarCircleYOffset = rawYOffset + avatarCircleRadius;
		// const avatarTextXOffset = avatarCircleXOffset;
		// const avatarTextYOffset = avatarCircleYOffset + 5;
		// const avatarText = rawText.slice(0, 1).toUpperCase();

		const { barWidth, barIndex } = params;
		const avatar = createStackedAvatar(params);
		const label = createStackedLabel(params, avatar);
		const { avatarCircleRadius, avatarCircleDiameter, avatarCircleYOffset } = avatar;
		const avatarCircleXOffset = (barWidth * barIndex) + avatarCircleDiameter;
		const avatarTextXOffset = avatarCircleXOffset;
		const labelXOffset = avatarCircleXOffset + avatarCircleRadius + 5;
		const labelYOffset = avatarCircleYOffset + 5;
		const labelStyle = { ...baseFontTheme, fontSize: 15 };
		const labelAnchor = 'left';

		return {
			...avatar,
			avatarCircleXOffset,
			avatarTextXOffset,
			...label,
			labelXOffset,
			labelYOffset,
			labelStyle,
			labelAnchor
		};

	},

};

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
			text: rawText,
			textAnchor,
			verticalAnchor,
			x: rawXOffset,
			y: rawYOffset
		} = this.props;
		const responsiveKeys = Object.keys(responsiveOptions);
		const responsiveKey = responsiveKeys.reduce((acc, option) => barWidth > parseInt(option, 10) ? option : acc, responsiveKeys[0]);
		const responsiveOption = responsiveOptions[responsiveKey];
		const responsiveParams = {
			barWidth,
			barIndex,
			rawText,
			rawYOffset,
		};

		const {
			avatarCircleXOffset,
			avatarCircleYOffset,
			avatarCircleRadius,
			avatarTextXOffset,
			avatarTextYOffset,
			avatarText,
			labelXOffset,
			labelYOffset,
			labelText,
			labelStyle, // = baseFontTheme,
			labelAnchor, // = textAnchor
		} = responsiveOption(responsiveParams);

		// console.log({ responsiveKeys, responsiveOption });

		return (
			<g>
				<circle
					className="xui-chart--measure"
					cx={avatarCircleXOffset}
					cy={avatarCircleYOffset}
					r={avatarCircleRadius}
					fill="lightgray"
				/>
				<text
					x={avatarTextXOffset}
					y={avatarTextYOffset}
					textAnchor={textAnchor}>
					<tspan style={baseFontTheme}>{avatarText}</tspan>
				</text>

				{ labelText && (
					<text
						className="xui-chart--measure"
						x={labelXOffset}
						y={labelYOffset}
						textAnchor={labelAnchor}>
						<tspan style={labelStyle}>{labelText}</tspan>
					</text>
				) }

			</g>
		);
	}
}

export default StackedLabel;
