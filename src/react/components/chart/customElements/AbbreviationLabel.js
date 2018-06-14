import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {baseFontTheme} from '../helpers/theme';
import getTargetPosition from '../helpers/targetposition';
import getResponsiveOption from '../helpers/xaxis';
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

const createInlineTag = ({labelWidth}) => {
	const tagLeft = labelWidth / 2;
	const tagTop = 26;
	const tagStyle = baseFontTheme;
	const tagTextWidth = labelWidth - 10;
	const tagAnchor = 'middle';

	return {tagLeft, tagTop, tagStyle, tagTextWidth, tagAnchor};
};

const createInlineTagLarge = (params) => {
	const tag = createInlineTag(params);
	const tagStyle = LARGE_LABEL_FONT;
	const tagTop = 34;

	return {...tag, tagStyle, tagTop};
}

const responsiveOptions = {

	0(params) {
		const hasTooltip = true;
		const tag = createInlineTag(params);
		const {getTagText} = params;
		const tagText = getTagText(0);

		return {hasTooltip, ...tag, tagText};
	},

	50(params) {
		const tag = createInlineTag(params);
		const {getTagText} = params;
		const tagText = getTagText(1);

		return {...tag, tagText};
	},

	80(params) {
		const tag = createInlineTagLarge(params);
		const {getTagText} = params;
		const tagText = getTagText(2);

		return {...tag, tagText};
	},

	100(params) {
		const tag = createInlineTagLarge(params);
		const {getTagText} = params;
		const tagText = getTagText(3);

		return {...tag, tagText};
	},
};

class AbbreviationLabel extends PureComponent {
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

		const textOptions = textRaw.split('|').map(option => option.trim());
		const getTagText = createTagTextThunk(textOptions);
		const labelLeft = labelWidth * labelIndex;
		const labelHeight = padding.bottom;
		const responsiveOption = getResponsiveOption(responsiveOptions, labelWidth);
		const responsiveParams = {labelWidth, labelIndex, textOptions, getTagText};
		const {
			hasTooltip, tagLeft, tagTop, tagText, tagStyle, tagAnchor, tagTextWidth,
		} = responsiveOption(responsiveParams);

		return (
			<g>
				<XAxisLabelWrapper
					labelLeft={labelLeft}
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

				{hasTooltip && (
					<rect
						x={labelLeft}
						y={labelTop}
						width={labelWidth}
						height={labelHeight - 20}
						fill="transparent"
						onMouseEnter={event => this.handleToolTipShow(event, getTagText(4))}
						onMouseLeave={this.handleToolTipHide}
					/>
				)}
			</g>
		);
	}
}

export default AbbreviationLabel;

AbbreviationLabel.propTypes = {
	labelWidth: PropTypes.number,
	labelTop: PropTypes.number,
	updateToolTip: PropTypes.func,
	index: PropTypes.number,
	text: PropTypes.string,
	padding: PropTypes.shape({
		bottom: PropTypes.number
	}),
};
