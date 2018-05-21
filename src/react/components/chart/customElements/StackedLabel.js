import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import { getAvatarColorClass, abbreviateAvatar } from '../../avatar/utils';
// import { alwaysPositive } from '../helpers';
import { baseFontTheme } from '../helpers/theme';

const createStackedAvatar = ({ barWidth, barIndex, rawText, rawYOffset }) => {

	const avatarCircleRadius = 12;
	const avatarCircleDiameter = avatarCircleRadius * 2;
	const avatarCircleXOffset = (barWidth * barIndex) + (barWidth * 0.5);
	const avatarCircleYOffset = rawYOffset + avatarCircleRadius;
	const avatarTextXOffset = avatarCircleXOffset;
	const avatarTextYOffset = avatarCircleYOffset + 4;
	const avatarText = abbreviateAvatar(rawText, 2); // rawText.slice(0, 1).toUpperCase();
	const avatarColor = getAvatarColorClass(rawText);

	// console.log({
	// 	rawText,
	// 	avatarText,
	// 	avatarClassName,
	// });

	return {
		avatarCircleRadius,
		avatarCircleDiameter,
		avatarCircleXOffset,
		avatarCircleYOffset,
		avatarTextXOffset,
		avatarTextYOffset,
		avatarText,
		avatarColor,
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
			avatarColor,
			labelXOffset,
			labelYOffset,
			labelText,
			labelStyle, // = baseFontTheme,
			labelAnchor, // = textAnchor
		} = responsiveOption(responsiveParams);
		const avatarClassName = cn('xui-chart--measure', avatarColor);
		const avatarStyle = { ...baseFontTheme, fill: 'white', fontSize: '10px', fontWeight: 'bold' };

		return (
			<g>
				<circle
					className={avatarClassName}
					cx={avatarCircleXOffset}
					cy={avatarCircleYOffset}
					r={avatarCircleRadius}
				/>
				<text
					x={avatarTextXOffset}
					y={avatarTextYOffset}
					textAnchor={textAnchor}>
					<tspan style={avatarStyle}>{avatarText}</tspan>
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
