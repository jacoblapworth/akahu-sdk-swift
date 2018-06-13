import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

const createTotalCharacterReducer = maxWidth => ({totalWidth = 20, totalChars = 0}, node) => {
	const charWidth = node.getComputedTextLength();
	const newWidth = totalWidth + charWidth;

	return newWidth > maxWidth
		? {totalWidth, totalChars}
		: {totalWidth: newWidth, totalChars: totalChars + 1};
};

class TruncatedText extends Component {
	rootNode;
	maxWidth;
	text;
	state = { /* charNodes */ };

	updateTruncationReference = () => {
		const {state, rootNode, maxWidth: prevMaxWidth, text: prevText} = this;
		const prevCharNodes = this.state.charNodes;
		const {maxWidth: nextMaxWidth, children: nextText} = this.props;
		const nextCharNodes = rootNode && rootNode.querySelectorAll('tspan');
		const shouldUpdate = !(prevCharNodes && nextMaxWidth === prevMaxWidth && nextText === prevText);

		if (shouldUpdate) {
			this.setState({
				...state,
				charNodes: nextCharNodes,
			});
		}
	}

	componentDidMount() {
		this.updateTruncationReference();
	}

	componentDidUpdate() {
		this.updateTruncationReference();
	}

	render() {
		const {charNodes} = this.state;
		const {style, maxWidth, children: text, ...textProps} = this.props;
		const createTextSpan = (character, key) => <tspan key={key} style={style}>{character}</tspan>;
		const reducer = createTotalCharacterReducer(maxWidth);
		const totalCharsRaw = charNodes
			? [...charNodes].reduce(reducer, {}).totalChars
			: text.length;
		// If the area is super restrictive (a really thin bar) the math can workout
		// to no room for any letters to appear. In that regard we force one character
		// to be squeezed in.
		const totalChars = Math.max(totalCharsRaw, 1);

		this.maxWidth = maxWidth;
		this.text = text;

		return (
			<Fragment>
				{
				// Create a "hidden" complete version (no ellipses) of the text. Each
				// character is isolated into its own <tspan> so that we can measure them
				// individually to determine if their accumulated width exceeds the
				// allocated display area.
				// NOTE: No "measuring" className hooks are supplied to this hidden text
				// block (so it has no influence over visual layout).
				}
				<text
					y="9999999"
					ref={node => this.rootNode = node}>
					{text.split('').map(createTextSpan)}
				</text>
				{
				// The (possibly) truncated display text that is created in reference to
				// the individual character measurements from above.
				}
				<text {...textProps}>
					{createTextSpan(text.slice(0, totalChars).trim())}
					{totalChars < text.length && createTextSpan('...')}
				</text>
			</Fragment>
		);
	}
}

export default TruncatedText

TruncatedText.propTypes = {
	className: PropTypes.string,
	children: PropTypes.string,
	textAnchor: PropTypes.string,
	style: PropTypes.object,
	x: PropTypes.number,
	y: PropTypes.number,
	maxWidth: PropTypes.number,
};
