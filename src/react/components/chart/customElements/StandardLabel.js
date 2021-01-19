import React from 'react';
import PropTypes from 'prop-types';
import { xAxisFontTheme } from '../helpers/theme';
import getResponsiveOptions from '../helpers/xaxis';
import { NAME_SPACE, CHART_FONT_LARGE } from '../helpers/constants';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const getInlineTagDimensions = ({ labelWidth, textRaw }) => ({
  tagLeft: labelWidth / 2,
  tagTop: 26,
  tagText: textRaw,
  tagStyle: xAxisFontTheme,
  tagTextWidth: labelWidth - 10,
  tagAnchor: 'middle',
});

const responsiveOptions = {
  0: params => getInlineTagDimensions(params),

  50: params => getInlineTagDimensions(params),

  100: params => ({
    ...getInlineTagDimensions(params),
    tagStyle: { ...xAxisFontTheme, fontSize: CHART_FONT_LARGE },
    tagTop: 34,
    toolTipOffset: 10,
  }),
};

const AvatarLabel = ({
  isToolTipHidden,
  labelHeight,
  labelTop,
  labelWidth,
  updateToolTip,
  // Victory...
  index: labelIndex,
  text: textRaw,
  /** Unused Victory references...
   * scale, style, fontFamily, fontSize, letterSpacing, padding, fill, stroke, x, y,
   * verticalAnchor, textAnchor, datum */
}) => {
  const {
    // Tag...
    tagLeft,
    tagTop,
    tagText,
    tagStyle,
    tagAnchor,
    tagTextWidth,
    // ToolTip...
    toolTipOffset,
  } = getResponsiveOptions(responsiveOptions, { labelWidth, labelIndex, textRaw });

  return (
    <XAxisLabelWrapper
      isToolTipHidden={isToolTipHidden}
      labelHeight={labelHeight}
      labelLeft={labelWidth * labelIndex}
      labelTop={labelTop}
      labelWidth={labelWidth}
      toolTipMessage={textRaw}
      toolTipOffset={toolTipOffset}
      updateToolTip={updateToolTip}
    >
      {tagText && (
        <TruncatedText
          className={`${NAME_SPACE}-chart--measure`}
          maxWidth={tagTextWidth}
          style={tagStyle}
          textAnchor={tagAnchor}
          x={tagLeft}
          y={tagTop}
        >
          {tagText}
        </TruncatedText>
      )}
    </XAxisLabelWrapper>
  );
};

export default AvatarLabel;

AvatarLabel.propTypes = {
  index: PropTypes.number,
  isToolTipHidden: PropTypes.bool,
  labelHeight: PropTypes.number,
  labelTop: PropTypes.number,
  labelWidth: PropTypes.number,
  text: PropTypes.string,
  updateToolTip: PropTypes.func,
};
