import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import { getAvatarColorClass, abbreviateAvatar } from '../../avatar/utils';
import { baseFontTheme } from '../helpers/theme';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const LARGE_LABEL_FONT = { ...baseFontTheme, fontSize: 13 };

const createStackedAvatar = ({ labelWidth, textRaw }) => {
	const avatarCircleRadius = 12;
	const avatarCircleDiameter = avatarCircleRadius * 2;
	const avatarCircleLeft = labelWidth * 0.5;
	const avatarCircleTop = avatarCircleRadius + 10;
	const avatarTextLeft = avatarCircleLeft;
	const avatarTextTop = avatarCircleTop + 4;
	const avatarText = abbreviateAvatar(textRaw, 2);
	const avatarColor = getAvatarColorClass(textRaw);

	return {
		avatarCircleRadius,
		avatarCircleDiameter,
		avatarCircleLeft,
		avatarCircleTop,
		avatarTextLeft,
		avatarTextTop,
		avatarText,
		avatarColor,
	};
};

const createStackedTag = (
	{ textRaw, labelWidth },
	{ avatarCircleDiameter, avatarCircleLeft, avatarCircleTop }
) => {
	const tagLeft = avatarCircleLeft;
	const tagTop = avatarCircleTop + avatarCircleDiameter + 5;
	const tagText = textRaw;
	const tagStyle = baseFontTheme;
	const tagTextWidth = labelWidth;
	const tagAnchor = 'middle';

	return {
		tagLeft,
		tagTop,
		tagText,
		tagStyle,
		tagTextWidth,
		tagAnchor,
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
		const tag = createStackedTag(params, avatar);

		return { ...avatar, ...tag };
	},

	80(params) {
		// .- - - - - - - .
		// |      ()      | <-- Stacked / Large font
		// |  Label Text  |
		// °- - - - - - - °

		const avatar = createStackedAvatar(params);
		const tag = createStackedTag(params, avatar);
		const tagStyle = LARGE_LABEL_FONT;

		return { ...avatar, ...tag, tagStyle };
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
		const { labelWidth } = params;
		const avatar = createStackedAvatar(params);
		const tag = createStackedTag(params, avatar);
		const { avatarCircleRadius, avatarCircleDiameter, avatarCircleTop } = avatar;
		const avatarCircleLeft = avatarCircleRadius;
		const avatarTextLeft = avatarCircleLeft;
		const tagLeft = avatarCircleLeft + avatarCircleRadius + 5;
		const tagTop = avatarCircleTop + 5;
		const tagStyle = LARGE_LABEL_FONT;
		const tagAnchor = 'left';
		const tagTextWidth = labelWidth - avatarCircleDiameter - 5;

		return {
			shouldCalculateCenter,
			...avatar,
			avatarCircleLeft, avatarTextLeft,
			...tag,
			tagLeft, tagTop, tagStyle, tagAnchor, tagTextWidth,
		};
	},

};

// Select the responsive option that is most appropriate to the current x-axis
// segment size.
const getResponsiveOption = labelWidth => {
	const responsiveKeys = Object.keys(responsiveOptions);
	const responsiveKey = (
		responsiveKeys
			.reduce(
				(acc, option) => labelWidth > parseInt(option, 10) ? option : acc,
				responsiveKeys[0]
			)
	);

	return responsiveOptions[responsiveKey];
};

class StackedLabel extends Component {

	render() {
		const {
			labelWidth,
			labelTop,

			// Victory...
			index: labelIndex,
			text: textRaw,
			textAnchor,

		} = this.props;
		const responsiveOption = getResponsiveOption(labelWidth);
		const responsiveParams = { labelWidth, labelIndex, textRaw };
		const {
			avatarCircleLeft, avatarCircleTop, avatarCircleRadius, avatarTextLeft, avatarTextTop, avatarText, avatarColor,
			tagLeft, tagTop, tagText, tagStyle, tagAnchor, tagTextWidth,
			shouldCalculateCenter
		} = responsiveOption(responsiveParams);
		const avatarClassName = cn('xui-chart--measure', avatarColor);
		const avatarStyle = { ...baseFontTheme, fill: 'white', fontSize: '10px', fontWeight: 'bold' };

		return (
			<XAxisLabelWrapper
				shouldCalculateCenter={shouldCalculateCenter}
				labelLeft={labelWidth * labelIndex}
				labelTop={labelTop}
				labelWidth={labelWidth}
				labelHeight={100}>
				<g>
					<circle
						className={avatarClassName}
						cx={avatarCircleLeft}
						cy={avatarCircleTop}
						r={avatarCircleRadius}
					/>
					<text
						x={avatarTextLeft}
						y={avatarTextTop}
						textAnchor={textAnchor}>
						<tspan style={avatarStyle}>{avatarText}</tspan>
					</text>

					{ tagText && (
							<TruncatedText
								className="xui-chart--measure"
								x={tagLeft}
								y={tagTop}
								textAnchor={tagAnchor}
								style={tagStyle}
								maxWidth={tagTextWidth}>
								{tagText}
							</TruncatedText>
					) }
				</g>
			</XAxisLabelWrapper>
		);
	}
}

export default StackedLabel;
