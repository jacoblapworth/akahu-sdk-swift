import React from 'react';
import PropTypes from 'prop-types';
import { xAxisFontTheme } from '../helpers/theme';
import getResponsiveOptions from '../helpers/xaxis';
import { NAME_SPACE, CHART_FONT_LARGE } from '../helpers/constants';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

// Get the tag text that is closest to the supplied index.
//
// + The thunk sets a persistent reference to all of the text options.
//
// + We first try and get the text from the index and if it does not exist we move
//   our way DOWN the list of options to get the first tag with content (smaller
//   text values have a better chance of fitting into the label area).
//
// + If moving down the options list found no results then we instead move UP the
//   list to get the first tag with content.
const createTagTextThunk = options => option => {
  const compareTags = (acc = '', tag = '') => acc || tag;
  const smallTagText = options
    .slice(0, option + 1)
    .reverse()
    .reduce(compareTags);
  const largeTagText = smallTagText || options.slice(option).reduce(compareTags);

  return smallTagText || largeTagText;
};

const getInlineTagDimensions = ({ labelWidth }) => ({
  tagLeft: labelWidth / 2,
  tagTop: 26,
  tagStyle: xAxisFontTheme,
  tagTextWidth: labelWidth - 10,
  tagAnchor: 'middle',
});

const createInlineTagLargeDimensions = params => ({
  ...getInlineTagDimensions(params),
  tagStyle: { ...xAxisFontTheme, fontSize: CHART_FONT_LARGE },
  tagTop: 30,
});

const responsiveOptions = {
  0: params => ({
    ...getInlineTagDimensions(params),
    tagText: params.getTagText(0),
  }),

  50: params => ({
    ...getInlineTagDimensions(params),
    tagText: params.getTagText(1),
  }),

  80: params => ({
    ...createInlineTagLargeDimensions(params),
    tagText: params.getTagText(2),
  }),

  100: params => ({
    ...createInlineTagLargeDimensions(params),
    tagText: params.getTagText(3),
    toolTipOffset: 10,
  }),
};

const AbbreviationLabel = ({
  isToolTipHidden,
  labelHeight,
  labelTop,
  labelWidth,
  updateToolTip,
  // Victory...
  index: labelIndex,
  text: textRaw,
  // Unused Victory references...
  // scale, style, fontFamily, fontSize, letterSpacing, padding, fill, stroke, x,
  // y, verticalAnchor, textAnchor, datum
}) => {
  const textOptions = textRaw.split('|').map(option => option.trim());
  const getTagText = createTagTextThunk(textOptions);
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
  } = getResponsiveOptions(responsiveOptions, { labelWidth, labelIndex, getTagText });

  return (
    <XAxisLabelWrapper
      isToolTipHidden={isToolTipHidden}
      labelHeight={labelHeight}
      labelLeft={labelWidth * labelIndex}
      labelTop={labelTop}
      labelWidth={labelWidth}
      toolTipMessage={getTagText(4)}
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

export default AbbreviationLabel;

AbbreviationLabel.propTypes = {
  index: PropTypes.number,
  isToolTipHidden: PropTypes.bool,
  labelHeight: PropTypes.number,
  labelTop: PropTypes.number,
  labelWidth: PropTypes.number,
  text: PropTypes.string,
  updateToolTip: PropTypes.func,
};
