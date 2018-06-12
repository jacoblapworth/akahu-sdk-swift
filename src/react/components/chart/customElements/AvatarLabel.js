import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import {getAvatarColorClass, abbreviateAvatar} from '../../avatar/utils';
import {baseFontTheme} from '../helpers/theme';
import getTargetPosition from '../helpers/targetposition';
import getResponsiveOption from '../helpers/xaxis';
import {NAME_SPACE} from '../helpers/constants';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const LARGE_LABEL_FONT = {...baseFontTheme, fontSize: 13};

const createStackedAvatar = ({labelWidth, textRaw, top = 10}) => {
	const avatarCircleRadius = 12;
	const avatarCircleDiameter = avatarCircleRadius * 2;
	const avatarCircleLeft = labelWidth * 0.5;
	const avatarCircleTop = avatarCircleRadius + top;
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
	{textRaw, labelWidth},
	{avatarCircleDiameter, avatarCircleLeft, avatarCircleTop}
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

		const avatar = createStackedAvatar(params);
		const hasTooltip = true;

		return {hasTooltip, ...avatar};
	},

	50(params) {
		// .- - - - - - - .
		// |      ()      | <-- Stacked / Small font
		// |  Label Text  |
		// °- - - - - - - °

		const avatar = createStackedAvatar(params);
		const tag = createStackedTag(params, avatar);

		return {...avatar, ...tag};
	},

	80(params) {
		// .- - - - - - - .
		// |      ()      | <-- Stacked / Large font
		// |  Label Text  |
		// °- - - - - - - °

		const avatar = createStackedAvatar(params);
		const tag = createStackedTag(params, avatar);
		const tagStyle = LARGE_LABEL_FONT;

		return {...avatar, ...tag, tagStyle};
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
		const {labelWidth} = params;
		const avatar = createStackedAvatar({...params, top: 20});
		const tag = createStackedTag(params, avatar);
		const {avatarCircleRadius, avatarCircleDiameter, avatarCircleTop} = avatar;
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

class AvatarLabel extends Component {
	handleToolTipShow = (event, message) => {
		const preferred = 'bottom';
		const position = { ...getTargetPosition(event), preferred };
		this.props.updateToolTip(position, message)
	};

	handleToolTipHide = () => this.props.updateToolTip();

	render() {
		const {
			padding,
			labelWidth,
			labelTop,

			// Victory...
			index: labelIndex,
			text: textRaw,
		} = this.props;
		const labelLeft = labelWidth * labelIndex;
		const labelHeight = padding.bottom;
		const responsiveOption = getResponsiveOption(responsiveOptions, labelWidth);
		const responsiveParams = {labelWidth, labelIndex, textRaw};
		const {
			hasTooltip, shouldCalculateCenter,
			avatarCircleLeft, avatarCircleTop, avatarCircleRadius, avatarTextLeft, avatarTextTop, avatarText, avatarColor,
			tagLeft, tagTop, tagText, tagStyle, tagAnchor, tagTextWidth,
		} = responsiveOption(responsiveParams);
		const avatarClassName = cn(`${NAME_SPACE}-chart--measure`, avatarColor);
		const avatarStyle = {...baseFontTheme, fill: 'white', fontSize: '10px', fontWeight: 'bold'};

		return (
			<g>
				<XAxisLabelWrapper
					shouldCalculateCenter={shouldCalculateCenter}
					labelLeft={labelLeft}
					labelTop={labelTop}
					labelWidth={labelWidth}
					labelHeight={labelHeight}>
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
							textAnchor="middle">
							<tspan style={avatarStyle}>{avatarText}</tspan>
						</text>

						{tagText && (
							<TruncatedText
								className={`${NAME_SPACE}-chart--measure`}
								x={tagLeft}
								y={tagTop}
								textAnchor={tagAnchor}
								style={tagStyle}
								maxWidth={tagTextWidth}>
								{tagText}
							</TruncatedText>
						)}
					</g>
				</XAxisLabelWrapper>

				{hasTooltip && (
					<rect
						x={labelLeft}
						y={labelTop}
						width={labelWidth}
						height={labelHeight - 20}
						fill="transparent"
						onMouseEnter={event => this.handleToolTipShow(event, textRaw)}
						onMouseLeave={this.handleToolTipHide}
					/>
				)}
			</g>
		);
	}
}

export default AvatarLabel;
