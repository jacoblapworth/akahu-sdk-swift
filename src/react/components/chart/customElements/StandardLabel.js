import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {baseFontTheme} from '../helpers/theme';
import getResponsiveOptions from '../helpers/xaxis';
import {NAME_SPACE, LABEL_FONT_LARGE} from '../helpers/constants';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const getInlineTagDimensions = ({labelWidth, textRaw}) => ({
	tagLeft: labelWidth / 2,
	tagTop: 26,
	tagText: textRaw,
	tagStyle: baseFontTheme,
	tagTextWidth: labelWidth - 10,
	tagAnchor: 'middle',
});

const responsiveOptions = {

	0: params => getInlineTagDimensions(params),

	50: params => getInlineTagDimensions(params),

	100: params => ({
		...getInlineTagDimensions(params),
		tagStyle: {...baseFontTheme, fontSize: LABEL_FONT_LARGE},
		tagTop: 34,
		toolTipOffset: 10,
	}),
};

class AvatarLabel extends PureComponent {
	render = () => {
		const {
			isToolTipHidden, updateToolTip, labelWidth, labelTop, labelHeight,
			// Victory...
			index: labelIndex, text: textRaw,
		} = this.props;
		const {
			// Tag...
			tagLeft, tagTop, tagText, tagStyle, tagAnchor, tagTextWidth,
			// ToolTip...
			toolTipOffset,
		} = getResponsiveOptions(responsiveOptions, {labelWidth, labelIndex, textRaw});

		return (
			<XAxisLabelWrapper
				toolTipMessage={textRaw}
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

export default AvatarLabel;

AvatarLabel.propTypes = {
	updateToolTip: PropTypes.func,
	isToolTipHidden: PropTypes.bool,
	labelHeight: PropTypes.number,
	labelWidth: PropTypes.number,
	labelTop: PropTypes.number,
	index: PropTypes.number,
	text: PropTypes.string,
};
