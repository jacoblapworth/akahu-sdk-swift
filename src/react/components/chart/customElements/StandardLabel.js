import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {baseFontTheme} from '../helpers/theme';
import getTargetPosition from '../helpers/targetposition';
import getResponsiveOption from '../helpers/xaxis';
import {NAME_SPACE} from '../helpers/constants';
import TruncatedText from './TruncatedText';
import XAxisLabelWrapper from './XAxisLabelWrapper';

const LARGE_LABEL_FONT = {...baseFontTheme, fontSize: 13};

const createInlineTag = ({labelWidth, textRaw}) => {
	const tagLeft = labelWidth / 2;
	const tagTop = 26;
	const tagText = textRaw;
	const tagStyle = baseFontTheme;
	const tagTextWidth = labelWidth - 10;
	const tagAnchor = 'middle';

	return {tagLeft, tagTop, tagText, tagStyle, tagTextWidth, tagAnchor};
};

const responsiveOptions = {

	0(params) {
		const hasTooltip = true;
		const tag = createInlineTag(params);

		return {hasTooltip, ...tag};
	},

	50(params) {
		return createInlineTag(params);
	},

	100(params) {
		const tag = createInlineTag(params);
		const tagStyle = LARGE_LABEL_FONT;
		const tagTop = 34;

		return {...tag, tagStyle, tagTop};
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
						onMouseEnter={event => this.handleToolTipShow(event, textRaw)}
						onMouseLeave={this.handleToolTipHide}
					/>
				)}
			</g>
		);
	}
}

export default AvatarLabel;

AvatarLabel.propTypes = {
	labelWidth: PropTypes.number,
	labelTop: PropTypes.number,
	updateToolTip: PropTypes.func,
	index: PropTypes.number,
	text: PropTypes.string,
	padding: PropTypes.shape({
		bottom: PropTypes.number
	}),
};
