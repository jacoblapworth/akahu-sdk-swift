import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {baseFontTheme} from '../helpers/theme';
import getResponsiveOptions from '../helpers/xaxis';
import {NAME_SPACE, CHART_FONT_LARGE} from '../helpers/constants';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const createTagTextThunk = options => option => {
	const compareTags = (acc = '', tag = '') => (acc || tag);
	const minTag = options.slice(0, option + 1).reverse().reduce(compareTags);
	const maxTag = minTag || options.slice(option).reduce(compareTags);

	return minTag || maxTag;
};

const getInlineTagDimensions = ({labelWidth}) => ({
	tagLeft: labelWidth / 2,
	tagTop: 26,
	tagStyle: baseFontTheme,
	tagTextWidth: labelWidth - 10,
	tagAnchor: 'middle',
});

const createInlineTagLargeDimensions = (params) => ({
	...getInlineTagDimensions(params),
	tagStyle: {...baseFontTheme, fontSize: CHART_FONT_LARGE},
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
		tagText: params.getTagText(1),
	}),

	100: params => ({
		...createInlineTagLargeDimensions(params),
		tagText: params.getTagText(3),
		toolTipOffset: 10,
	}),
};

class AbbreviationLabel extends PureComponent {
	render = () => {
		const {
			isToolTipHidden, updateToolTip, labelWidth, labelTop, labelHeight,
			// Victory...
			index: labelIndex, text: textRaw,
		} = this.props;
		const textOptions = textRaw.split('|').map(option => option.trim());
		const getTagText = createTagTextThunk(textOptions);
		const {
			// Tag...
			tagLeft, tagTop, tagText, tagStyle, tagAnchor, tagTextWidth,
			// ToolTip...
			toolTipOffset,
		} = getResponsiveOptions(responsiveOptions, {labelWidth, labelIndex, getTagText});

		return (
			<XAxisLabelWrapper
				toolTipMessage={getTagText(4)}
				toolTipOffset={toolTipOffset}
				isToolTipHidden={isToolTipHidden}
				updateToolTip={updateToolTip}
				labelLeft={labelWidth * labelIndex}
				labelTop={labelTop}
				labelWidth={labelWidth}
				labelHeight={labelHeight}>
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
			</XAxisLabelWrapper>
		);
	}
}

export default AbbreviationLabel;

AbbreviationLabel.propTypes = {
	updateToolTip: PropTypes.func,
	isToolTipHidden: PropTypes.bool,
	labelHeight: PropTypes.number,
	labelWidth: PropTypes.number,
	labelTop: PropTypes.number,
	index: PropTypes.number,
	text: PropTypes.string,
};
