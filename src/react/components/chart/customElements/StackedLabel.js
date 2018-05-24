import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import cn from 'classnames';
import { getAvatarColorClass, abbreviateAvatar } from '../../avatar/utils';
import XAxisLabelWrapper from './XAxisLabelWrapper';
import { baseFontTheme } from '../helpers/theme';

const LARGE_LABEL_FONT = { ...baseFontTheme, fontSize: 13 };

const createStackedAvatar = ({ barWidth, rawText }) => {
	const avatarCircleRadius = 12;
	const avatarCircleDiameter = avatarCircleRadius * 2;
	const avatarCircleXOffset = barWidth * 0.5;
	const avatarCircleYOffset = avatarCircleRadius;
	const avatarTextXOffset = avatarCircleXOffset;
	const avatarTextYOffset = avatarCircleYOffset + 4;
	const avatarText = abbreviateAvatar(rawText, 2);
	const avatarColor = getAvatarColorClass(rawText);

	return {
		avatarCircleRadius,
		avatarCircleDiameter,
		avatarCircleXOffset,
		avatarCircleYOffset,
		avatarTextXOffset,
		avatarTextYOffset,
		avatarText,
		avatarColor,
	};
};

const createStackedLabel = (
	{ rawText },
	{ avatarCircleDiameter, avatarCircleXOffset, avatarCircleYOffset }
) => {
	const labelXOffset = avatarCircleXOffset;
	const labelYOffset = avatarCircleYOffset + avatarCircleDiameter + 5;
	const labelText = rawText;
	const labelStyle = baseFontTheme;
	const labelAnchor = 'middle';

	return { labelXOffset, labelYOffset, labelText, labelStyle, labelAnchor };
};

// const truncateText = (text, maxChars) => text;
const truncateText = (text, maxChars) => {
	const totalChars = text.length;
	const shouldTruncate = totalChars > maxChars;

	switch (true) {
		case shouldTruncate: {
			const elipsis = '...';
			const cutOff = maxChars - elipsis.length;
			const truncated = text.slice(0, cutOff).trim();
			return truncated + elipsis;
		}
		default: return text;
	}
};

const responsiveOptions = {

	0(params) {
		// .- - - .
		// |  ()  | <-- Avatar only
		// °- - - °

		return createStackedAvatar(params);
	},

	50(params) {
		// .- - - - - - - .
		// |      ()      | <-- Stacked / Small font
		// |  Label Text  |
		// °- - - - - - - °

		const { rawText, barWidth } = params;
		const avatar = createStackedAvatar(params);
		const label = createStackedLabel(params, avatar);
		// const marChars = barWidth / 6;
		// const labelText = truncateText(rawText, marChars);

		return { ...avatar, ...label };
	},

	80(params) {
		// .- - - - - - - .
		// |      ()      | <-- Stacked / Large font
		// |  Label Text  |
		// °- - - - - - - °

		const { rawText, barWidth } = params;
		const avatar = createStackedAvatar(params);
		const label = createStackedLabel(params, avatar);
		// const marChars = barWidth / 6.5;
		// const labelText = truncateText(rawText, marChars);
		const labelStyle = LARGE_LABEL_FONT;

		return { ...avatar, ...label, labelStyle };
	},

	100(params) {
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
		const shouldCalculateCenter = true;
		const { rawText, barWidth } = params;
		const avatar = createStackedAvatar(params);
		const label = createStackedLabel(params, avatar);
		const { avatarCircleRadius, avatarCircleDiameter, avatarCircleYOffset } = avatar;
		const avatarCircleXOffset = avatarCircleRadius;
		const avatarTextXOffset = avatarCircleXOffset;
		const labelXOffset = avatarCircleXOffset + avatarCircleRadius + 5;
		const labelYOffset = avatarCircleYOffset + 5;
		// const marChars = (barWidth - avatarCircleDiameter - 5) / 6.5;
		// const labelText = truncateText(rawText, marChars);
		const labelStyle = LARGE_LABEL_FONT;
		const labelAnchor = 'left';
		const labelTextWidth = barWidth - avatarCircleDiameter - 5;

		return {
			shouldCalculateCenter,
			...avatar,
			avatarCircleXOffset,
			avatarTextXOffset,
			...label,
			labelXOffset,
			labelYOffset,
			labelStyle,
			labelAnchor,
			// labelText,
			labelTextWidth
		};
	},

};

// Select the responsive option that is most appropriate to the current x-axis
// segment size.
const getResponsiveOption = width => {
	const responsiveKeys = Object.keys(responsiveOptions);
	const responsiveKey = (
		responsiveKeys
			.reduce(
				(acc, option) => width > parseInt(option, 10) ? option : acc,
				responsiveKeys[0]
			)
	);

	return responsiveOptions[responsiveKey];
};

class StackedLabel extends Component {

	truncatedNode;

	state = { /* truncatedNodes */ };

	updateTruncatedText = () => {

		const { state, truncatedNode } = this;
		const truncatedNodes = truncatedNode.querySelectorAll('tspan');
		// const

		this.setState({ ...state, truncatedNodes });

		// const contentWidth = contentNode ? getGroupPosition(contentNode).width : 0;
		// const shouldUpdate = !testIsCloseEnough(contentWidth, state.contentWidth || 0);

		// if (shouldUpdate) {
		// 	this.setState({ ...state, contentWidth });
		// }

	}

	componentDidMount() {
		this.updateTruncatedText();
	}

	// componentDidUpdate() {
	// 	this.updateTruncatedText();
	// }

	render() {
		const {
			barWidth,
			angle,
			datum,
			index: barIndex,
			polar,
			scale,
			style,
			text: rawText,
			textAnchor,
			verticalAnchor,
			x: rawXOffset,
			y: rawYOffset
		} = this.props;
		const responsiveOption = getResponsiveOption(barWidth);
		const responsiveParams = { barWidth, barIndex, rawText, rawYOffset };
		const {
			avatarCircleXOffset,
			avatarCircleYOffset,
			avatarCircleRadius,
			avatarTextXOffset,
			avatarTextYOffset,
			avatarText,
			avatarColor,
			labelXOffset,
			labelYOffset,
			labelText = rawText,
			labelStyle,
			labelAnchor,
			labelTextWidth = barWidth,
			shouldCalculateCenter
		} = responsiveOption(responsiveParams);
		const avatarClassName = cn('\n\n\nxui-chart--measure', avatarColor);
		const avatarStyle = { ...baseFontTheme, fill: 'white', fontSize: '10px', fontWeight: 'bold' };

		// truncatedNodes
		// labelTextWidth

		const { truncatedNode } = this;
		const { truncatedNodes } = this.state;

		const { totalChars } = truncatedNodes
			? [...truncatedNodes].reduce((acc, node) => {

				const { totalWidth, totalChars } = acc;
				// const { width = 0, height = 0, x = 0, y = 0 } = node.getBBox();
				// const { offsetWidth: width } = node;
				// const { width } = node.getBoundingClientRect();
				const width = node.getComputedTextLength();
				const newWidth = totalWidth + width;

				console.log('');
				console.log({ width, totalWidth, totalChars, node });
				console.log('getComputedTextLength', node.getComputedTextLength());
				console.log(`${newWidth} > ${labelTextWidth} = ${newWidth > labelTextWidth}`);

				return newWidth > labelTextWidth
					? acc
					: { totalWidth: newWidth, totalChars: totalChars + 1 };

			}, { totalWidth: 20, totalChars: 0 })
			: { totalChars: labelText.length };

		console.log('TRUNCATION', { totalChars, truncatedNode, truncatedNodes, nodes: truncatedNodes && truncatedNodes.length });

		return (
			<XAxisLabelWrapper
				shouldCalculateCenter={shouldCalculateCenter}
				labelXOffset={barWidth * barIndex}
				labelYOffset={rawYOffset}
				labelWidth={barWidth}
				labelHeight={100}>
				<g>
					<circle
						className={avatarClassName}
						cx={avatarCircleXOffset}
						cy={avatarCircleYOffset}
						r={avatarCircleRadius}
					/>
					<text
						x={avatarTextXOffset}
						y={avatarTextYOffset}
						textAnchor={textAnchor}>
						<tspan style={avatarStyle}>{avatarText}</tspan>
					</text>

					{ labelText && (
						<text
							ref={node => this.truncatedNode = node}
							className="xui-chart--measure"
							x={labelXOffset}
							y={labelYOffset}
							textAnchor={labelAnchor}>

							{ labelText.slice(0, totalChars).split('').map((character, key) => (
								<tspan key={key} style={labelStyle}>{character}</tspan>
							)) }

							{ labelText.length !== totalChars && <tspan style={labelStyle}>...</tspan> }

						</text>
					) }
				</g>
			</XAxisLabelWrapper>
		);
	}
}

export default StackedLabel;
