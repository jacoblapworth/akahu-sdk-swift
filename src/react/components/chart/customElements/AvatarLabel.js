import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getAvatarColorClass, abbreviateAvatar } from '../../avatar/utils';
import { xAxisFontTheme } from '../helpers/theme';
import getResponsiveOptions from '../helpers/xaxis';
import { NAME_SPACE, CHART_FONT_LARGE, AVATAR_RADIUS } from '../helpers/constants';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const getStackedAvatarDimensions = ({ labelWidth, textRaw, top = 10 }) => {
  const avatarCircleLeft = labelWidth * 0.5;
  const avatarCircleTop = AVATAR_RADIUS + top;

  return {
    avatarCircleLeft,
    avatarCircleTop,
    avatarTextLeft: avatarCircleLeft,
    avatarTextTop: avatarCircleTop + 4,
    avatarText: abbreviateAvatar(textRaw, 2),
    avatarClassName: cn(`${NAME_SPACE}-chart--measure`, getAvatarColorClass(textRaw)),
    avatarStyle: {
      ...xAxisFontTheme,
      fill: null, // Removing the Victory inline "fill" so that we can target via CSS.
      fontSize: '10px',
      fontWeight: 'bold',
    },
  };
};

const getStackedTagDimensions = (
  { textRaw, labelWidth },
  { avatarCircleLeft, avatarCircleTop },
) => ({
  tagLeft: avatarCircleLeft,
  tagTop: avatarCircleTop + AVATAR_RADIUS * 2 + 5,
  tagText: textRaw,
  tagStyle: xAxisFontTheme,
  tagTextWidth: labelWidth,
  tagAnchor: 'middle',
});

const responsiveOptions = {
  // .- - - .
  // |  ()  | <-- Avatar only
  // °- - - °
  0: params => getStackedAvatarDimensions(params),

  // .- - - - - - - .
  // |      ()      | <-- Stacked / Small font
  // |  Label Text  |
  // °- - - - - - - °
  50: params => {
    const avatar = getStackedAvatarDimensions(params);

    return {
      ...avatar,
      ...getStackedTagDimensions(params, avatar),
    };
  },

  // .- - - - - - - .
  // |      ()      | <-- Stacked / Large font
  // |  Label Text  |
  // °- - - - - - - °
  80: params => {
    const avatar = getStackedAvatarDimensions(params);

    return {
      ...avatar,
      ...getStackedTagDimensions(params, avatar),
      tagStyle: { ...xAxisFontTheme, fontSize: CHART_FONT_LARGE },
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
    const avatar = getStackedAvatarDimensions({ ...params, top: 20 });
    const { avatarCircleTop } = avatar;

    return {
      shouldCalculateCenter: true,
      ...avatar,
      avatarCircleLeft: AVATAR_RADIUS,
      avatarTextLeft: AVATAR_RADIUS,
      ...getStackedTagDimensions(params, avatar),
      tagLeft: AVATAR_RADIUS * 2 + 5,
      tagTop: avatarCircleTop + 5,
      tagStyle: { ...xAxisFontTheme, fontSize: CHART_FONT_LARGE },
      tagAnchor: 'left',
      tagTextWidth: params.labelWidth - AVATAR_RADIUS * 2 - 5,
      toolTipOffset: 14,
    };
  },
};

class AvatarLabel extends PureComponent {
  render = () => {
    const {
      isToolTipHidden,
      updateToolTip,
      labelWidth,
      labelTop,
      labelHeight,
      avatarImageUrlData,
      barsData,
      // Victory...
      index: labelIndex,
      text: textRaw,
      // Unused Victory references...
      // scale, style, fontFamily, fontSize, letterSpacing, padding, fill, stroke, x,
      // y, verticalAnchor, textAnchor, datum
    } = this.props;
    const {
      // Avatar...
      avatarCircleLeft,
      avatarCircleTop,
      avatarTextLeft,
      avatarTextTop,
      avatarText,
      avatarClassName,
      avatarStyle,
      // Tag...
      shouldCalculateCenter,
      tagLeft,
      tagTop,
      tagText,
      tagStyle,
      tagAnchor,
      tagTextWidth,
      // ToolTip...
      toolTipOffset,
    } = getResponsiveOptions(responsiveOptions, { labelWidth, labelIndex, textRaw });

    let avatarUrl;

    if (avatarImageUrlData) {
      const avatarImageObject = avatarImageUrlData.find(
        avatarItemUrlData => avatarItemUrlData.id === barsData[labelIndex].id,
      );

      if (avatarImageObject) {
        avatarUrl = avatarImageObject.url;
      }
    }

    return (
      <XAxisLabelWrapper
        shouldCalculateCenter={shouldCalculateCenter}
        toolTipMessage={textRaw}
        toolTipOffset={toolTipOffset}
        isToolTipHidden={isToolTipHidden}
        updateToolTip={updateToolTip}
        labelLeft={labelWidth * labelIndex}
        labelTop={labelTop}
        labelWidth={labelWidth}
        labelHeight={labelHeight}
      >
        <g>
          <circle
            className={avatarClassName}
            cx={avatarCircleLeft}
            cy={avatarCircleTop}
            r={AVATAR_RADIUS}
          />
          <text x={avatarTextLeft} y={avatarTextTop} textAnchor="middle">
            <tspan style={avatarStyle}>{avatarText}</tspan>
          </text>
          {avatarImageUrlData && avatarUrl && (
            <image
              transform={`translate(-${AVATAR_RADIUS},-${AVATAR_RADIUS})`}
              x={avatarCircleLeft}
              y={avatarCircleTop}
              width={AVATAR_RADIUS * 2}
              height={AVATAR_RADIUS * 2}
              href={avatarUrl}
              clipPath='circle(50% at 50% 50%)'
            />
          )}
          {tagText && (
            <TruncatedText
              className={`${NAME_SPACE}-chart--measure`}
              x={tagLeft}
              y={tagTop}
              textAnchor={tagAnchor}
              style={tagStyle}
              maxWidth={tagTextWidth}
            >
              {tagText}
            </TruncatedText>
          )}
        </g>
      </XAxisLabelWrapper>
    );
  };
}

export default AvatarLabel;

AvatarLabel.propTypes = {
  updateToolTip: PropTypes.func,
  isToolTipHidden: PropTypes.bool,
  labelHeight: PropTypes.number,
  labelWidth: PropTypes.number,
  labelTop: PropTypes.number,
  index: PropTypes.number,
  text: PropTypes.string,
  avatarImageUrlData: PropTypes.array,
  barsData: PropTypes.array,
};
