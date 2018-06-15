import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {getAvatarColorClass, abbreviateAvatar} from '../../avatar/utils';
import {baseFontTheme} from '../helpers/theme';
import getResponsiveOptions from '../helpers/xaxis';
import {NAME_SPACE} from '../helpers/constants';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const LARGE_LABEL_FONT = {...baseFontTheme, fontSize: 13};

const createStackedAvatar = ({labelWidth, textRaw, top = 10}) => {
	const avatarCircleRadius = 12;
	const avatarCircleLeft = labelWidth * 0.5;
	const avatarCircleTop = avatarCircleRadius + top;

	return {
		avatarCircleRadius: 12,
		avatarCircleDiameter: avatarCircleRadius * 2,
		avatarCircleLeft: labelWidth * 0.5,
		avatarCircleTop: avatarCircleRadius + top,
		avatarTextLeft: avatarCircleLeft,
		avatarTextTop: avatarCircleTop + 4,
		avatarText: abbreviateAvatar(textRaw, 2),
		avatarClassName: cn(`${NAME_SPACE}-chart--measure`, getAvatarColorClass(textRaw)),
		avatarStyle: {...baseFontTheme, fill: 'white', fontSize: '10px', fontWeight: 'bold'},
	};
};

const createStackedTag = (
	{textRaw, labelWidth},
	{avatarCircleDiameter, avatarCircleLeft, avatarCircleTop}
) => ({
	tagLeft: avatarCircleLeft,
	tagTop: avatarCircleTop + avatarCircleDiameter + 5,
	tagText: textRaw,
	tagStyle: baseFontTheme,
	tagTextWidth: labelWidth,
	tagAnchor: 'middle',
});

const responsiveOptions = {

	// .- - - .
	// |  ()  | <-- Avatar only
	// °- - - °
	0: params => createStackedAvatar(params),

	// .- - - - - - - .
	// |      ()      | <-- Stacked / Small font
	// |  Label Text  |
	// °- - - - - - - °
	50: params => {
		const avatar = createStackedAvatar(params);

		return {
			...avatar,
			...createStackedTag(params, avatar),
		};
	},

	// .- - - - - - - .
	// |      ()      | <-- Stacked / Large font
	// |  Label Text  |
	// °- - - - - - - °
	80: params => {
		const avatar = createStackedAvatar(params);

		return {
			...avatar,
			...createStackedTag(params, avatar),
			tagStyle: LARGE_LABEL_FONT,
		};
	},

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
	100: params => {
		const avatar = createStackedAvatar({...params, top: 20});
		const {avatarCircleRadius, avatarCircleDiameter, avatarCircleTop} = avatar;

		return {
			shouldCalculateCenter: true,
			...avatar,
			avatarCircleLeft: avatarCircleRadius,
			avatarTextLeft: avatarCircleRadius,
			...createStackedTag(params, avatar),
			tagLeft: avatarCircleDiameter + 5,
			tagTop: avatarCircleTop + 5,
			tagStyle: LARGE_LABEL_FONT,
			tagAnchor: 'left',
			tagTextWidth: params.labelWidth - avatarCircleDiameter - 5,
			toolTipOffset: 14,
		};
	},
};

class AvatarLabel extends PureComponent {
	render = () => {
		const {
			updateToolTip, labelWidth, labelTop, labelHeight,
			// Victory...
			index: labelIndex, text: textRaw,
		} = this.props;
		const {
			// Avatar...
			avatarCircleLeft, avatarCircleTop, avatarCircleRadius, avatarTextLeft,
			avatarTextTop, avatarText, avatarClassName, avatarStyle,
			// Tag...
			shouldCalculateCenter, tagLeft, tagTop, tagText, tagStyle, tagAnchor, tagTextWidth,
			// ToolTip...
			toolTipOffset,
		} = getResponsiveOptions(responsiveOptions, {labelWidth, labelIndex, textRaw});

		return (
			<XAxisLabelWrapper
				shouldCalculateCenter={shouldCalculateCenter}
				toolTipMessage={textRaw}
				toolTipOffset={toolTipOffset}
				updateToolTip={updateToolTip}
				labelLeft={labelWidth * labelIndex}
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
		);
	}
}

export default AvatarLabel;

AvatarLabel.propTypes = {
	labelHeight: PropTypes.number,
	labelWidth: PropTypes.number,
	labelTop: PropTypes.number,
	updateToolTip: PropTypes.func,
	index: PropTypes.number,
	text: PropTypes.string,
};
