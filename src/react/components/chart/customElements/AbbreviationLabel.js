import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {baseFontTheme} from '../helpers/theme';
import getResponsiveOptions from '../helpers/xaxis';
import {NAME_SPACE} from '../helpers/constants';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const LARGE_LABEL_FONT = {...baseFontTheme, fontSize: 13};

const createTagTextThunk = options => option => {
	const compareTags = (acc = '', tag = '') => (acc || tag);
	const minTag = options.slice(0, option + 1).reverse().reduce(compareTags);
	const maxTag = minTag || options.slice(option).reduce(compareTags);

	return minTag || maxTag;
};

const createInlineTag = ({labelWidth}) => ({
	tagLeft: labelWidth / 2,
	tagTop: 26,
	tagStyle: baseFontTheme,
	tagTextWidth: labelWidth - 10,
	tagAnchor: 'middle',
});

const createInlineTagLarge = (params) => ({
	...createInlineTag(params),
	tagStyle: LARGE_LABEL_FONT,
	tagTop: 30,
});

const responsiveOptions = {

	0: params => ({
		...createInlineTag(params),
		tagText: params.getTagText(0),
	}),

	50: params => ({
		...createInlineTag(params),
		tagText: params.getTagText(1),
	}),

	80: params => ({
		...createInlineTagLarge(params),
		tagText: params.getTagText(1),
	}),

	100: params => ({
		...createInlineTagLarge(params),
		tagText: params.getTagText(3),
		toolTipOffset: 10,
	}),
};

class AbbreviationLabel extends PureComponent {
	render = () => {
		const {
			updateToolTip, labelWidth, labelTop, labelHeight,
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
	labelHeight: PropTypes.number,
	labelWidth: PropTypes.number,
	labelTop: PropTypes.number,
	updateToolTip: PropTypes.func,
	index: PropTypes.number,
	text: PropTypes.string,
};
