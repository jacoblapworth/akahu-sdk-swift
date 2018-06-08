import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import {baseFontTheme} from '../helpers/theme';
import getTargetPosition from '../helpers/targetposition';
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

// Select the responsive option that is most appropriate to the current x-axis
// segment size.
const getResponsiveOption = labelWidth => {
	const responsiveKeys = Object.keys(responsiveOptions);
	const responsiveKey = (
		responsiveKeys
			.reduce(
				(acc, option) => labelWidth > parseInt(option, 10) ? option : acc,
				responsiveKeys[0]
			)
	);

	return responsiveOptions[responsiveKey];
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
		const labelHeight = padding.bottom - 15;
		const responsiveOption = getResponsiveOption(labelWidth);
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
							className="xui-chart--measure"
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
						height={labelHeight}
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
