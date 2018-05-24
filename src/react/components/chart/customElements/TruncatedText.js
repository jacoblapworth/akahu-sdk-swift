import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import cn from 'classnames';

class TruncatedText extends Component {

	rootNode;
	maxWidth;
	text;
	state = { /* charNodes */ };

	updateTruncatedText = () => {
		const { state, rootNode, maxWidth: prevMaxWidth, text: prevText } = this;
		const prevCharNodes = this.state.charNodes;
		const { maxWidth: nextMaxWidth, children: nextText } = this.props;
		const nextCharNodes = rootNode && rootNode.querySelectorAll('tspan');
		const shouldUpdate = !(prevCharNodes && nextMaxWidth === prevMaxWidth && nextText === prevText);

		// console.log('UPDATE', {
		// 	charNodes: prevCharNodes, rootNode, shouldUpdate,
		// 	maxWidth: `${nextMaxWidth} !== ${prevMaxWidth} = ${nextMaxWidth !== prevMaxWidth}`,
		// 	text: `${nextText} !== ${prevText} = ${nextText !== prevText}`
		// });

		if (shouldUpdate) {
			this.setState({
				...state,
				charNodes: nextCharNodes,
			});
		}

	}

	componentDidMount() {
		this.updateTruncatedText();
	}

	componentDidUpdate() {
		this.updateTruncatedText();
	}

	render() {
		// const { rootNode } = this;
		const { charNodes } = this.state;
		const { style, maxWidth, children: text, ...textProps } = this.props;

		this.maxWidth = maxWidth;
		this.text = text;

		const { totalChars } = charNodes
			? [...charNodes].reduce((acc, node) => {

				const { totalWidth, totalChars } = acc;
				const width = node.getComputedTextLength();
				const newWidth = totalWidth + width;

				return newWidth > maxWidth
					? acc
					: { totalWidth: newWidth, totalChars: totalChars + 1 };

			}, { totalWidth: 20, totalChars: 0 })
			: { totalChars: text.length };

		return (
			<text
				{...textProps}
				ref={node => this.rootNode = node}>

				{ text.slice(0, totalChars).split('').map((character, key) => (
					<tspan key={key} style={style}>{character}</tspan>
				)) }

				{ text.length !== totalChars && <tspan style={style}>...</tspan> }

			</text>
		);

	}

}

export default TruncatedText
