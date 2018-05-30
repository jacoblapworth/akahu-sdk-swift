import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import { getAvatarColorClass, abbreviateAvatar } from '../../avatar/utils';
import { baseFontTheme } from '../helpers/theme';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const LARGE_LABEL_FONT = { ...baseFontTheme, fontSize: 13 };

const createStackedAvatar = ({ barWidth, rawText }) => {
	const avatarCircleRadius = 12;
	const avatarCircleDiameter = avatarCircleRadius * 2;
	const avatarCircleXOffset = barWidth * 0.5;
	const avatarCircleYOffset = avatarCircleRadius + 10;
	const avatarTextXOffset = avatarCircleXOffset;
	const avatarTextYOffset = avatarCircleYOffset + 4;
	const avatarText = abbreviateAvatar(rawText, 2);
	const avatarColor = getAvatarColorClass(rawText);

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

const createStackedLabel = (
	{ rawText, barWidth },
	{ avatarCircleDiameter, avatarCircleXOffset, avatarCircleYOffset }
) => {
	const labelXOffset = avatarCircleXOffset;
	const labelYOffset = avatarCircleYOffset + avatarCircleDiameter + 5;
	const labelText = rawText;
	const labelStyle = baseFontTheme;
	const labelTextWidth = barWidth;
	const labelAnchor = 'middle';

	return {
		labelXOffset,
		labelYOffset,
		labelText,
		labelStyle,
		labelTextWidth,
		labelAnchor,
	};
};

// const truncateText = (text, maxChars) => {
// 	const totalChars = text.length;
// 	const shouldTruncate = totalChars > maxChars;

// 	switch (true) {
// 		case shouldTruncate: {
// 			const elipsis = '...';
// 			const cutOff = maxChars - elipsis.length;
// 			const truncated = text.slice(0, cutOff).trim();
// 			return truncated + elipsis;
// 		}
// 		default: return text;
// 	}
// };

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

		// const { rawText, barWidth } = params;
		const avatar = createStackedAvatar(params);
		const label = createStackedLabel(params, avatar);

		return { ...avatar, ...label };
	},

	80(params) {
		// .- - - - - - - .
		// |      ()      | <-- Stacked / Large font
		// |  Label Text  |
		// °- - - - - - - °

		// const { rawText, barWidth } = params;
		const avatar = createStackedAvatar(params);
		const label = createStackedLabel(params, avatar);
		const labelStyle = LARGE_LABEL_FONT;

		return { ...avatar, ...label, labelStyle };
	},

	100(params) {
		// .- - - - - - - - -.
		// |  () Label Text  | <-- Inline / Large font
		// °- - - - - - - - -°

		// This "inline" version is significantly more complex than the "stacked"
		// format. We still need to center the label taking into context an arbitrary
		// length of text and the "avatar" sitting to the left at an unknown location.
		//
		// As a solution we are using the <XAxisLabelWrapper /> prop "shouldCalculateCenter"
		// to set the center value dynamically. In that regard we "left" align the
		// labels contents and let the component do the calculations.
		const shouldCalculateCenter = true;
		const { barWidth } = params;
		const avatar = createStackedAvatar(params);
		const label = createStackedLabel(params, avatar);
		const { avatarCircleRadius, avatarCircleDiameter, avatarCircleYOffset } = avatar;
		const avatarCircleXOffset = avatarCircleRadius;
		const avatarTextXOffset = avatarCircleXOffset;
		const labelXOffset = avatarCircleXOffset + avatarCircleRadius + 5;
		const labelYOffset = avatarCircleYOffset + 5;
		const labelStyle = LARGE_LABEL_FONT;
		const labelAnchor = 'left';
		const labelTextWidth = barWidth - avatarCircleDiameter - 5;

		return {
			shouldCalculateCenter,
			...avatar,
			avatarCircleXOffset,
			avatarTextXOffset,
			...label,
			labelXOffset,
			labelYOffset,
			labelStyle,
			labelAnchor,
			labelTextWidth
		};
	},

};

// Select the responsive option that is most appropriate to the current x-axis
// segment size.
const getResponsiveOption = width => {
	const responsiveKeys = Object.keys(responsiveOptions);
	const responsiveKey = (
		responsiveKeys
			.reduce(
				(acc, option) => width > parseInt(option, 10) ? option : acc,
				responsiveKeys[0]
			)
	);

	return responsiveOptions[responsiveKey];
};

class StackedLabel extends Component {

	render() {
		const {
			barWidth,
			yPos,
			index: barIndex,
			text: rawText,
			textAnchor,
			x: rawXOffset,
			y: rawYOffset
			// angle,
			// datum,
			// polar,
			// scale,
			// style,
			// verticalAnchor,
		} = this.props;
		const responsiveOption = getResponsiveOption(barWidth);
		const responsiveParams = { barWidth, barIndex, rawText, yPos };
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
			labelStyle,
			labelAnchor,
			labelTextWidth,
			shouldCalculateCenter
		} = responsiveOption(responsiveParams);
		const avatarClassName = cn('xui-chart--measure', avatarColor);
		const avatarStyle = { ...baseFontTheme, fill: 'white', fontSize: '10px', fontWeight: 'bold' };

		return (
			<XAxisLabelWrapper
				shouldCalculateCenter={shouldCalculateCenter}
				labelXOffset={barWidth * barIndex}
				labelYOffset={yPos}
				labelWidth={barWidth}
				labelHeight={100}>
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
							<TruncatedText
								className="xui-chart--measure"
								x={labelXOffset}
								y={labelYOffset}
								textAnchor={labelAnchor}
								style={labelStyle}
								maxWidth={labelTextWidth}>
								{labelText}
							</TruncatedText>
					) }
				</g>
			</XAxisLabelWrapper>
		);
	}
}

export default StackedLabel;
