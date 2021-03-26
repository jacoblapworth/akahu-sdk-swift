import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const createTotalCharacterReducer = maxWidth => ({ totalWidth = 20, totalChars = 0 }, node) => {
  const charWidth = node.getComputedTextLength();
  const newWidth = totalWidth + charWidth;

  return newWidth > maxWidth
    ? { totalWidth, totalChars }
    : { totalWidth: newWidth, totalChars: totalChars + 1 };
};

class TruncatedText extends PureComponent {
  rootNode = React.createRef();

  state = {
    // maxWidth,
    // text,
  };

  updateTruncationReference = () => {
    const { maxWidth, text } = this.state;
    const { maxWidth: nextMaxWidth, children: nextText } = this.props;
    const shouldUpdate = !(nextMaxWidth === maxWidth && nextText === text);

    if (shouldUpdate) {
      this.setState({
        maxWidth: nextMaxWidth,
        text: nextText,
      });
    }
  };

  componentDidMount = () => {
    this.updateTruncationReference();
  };

  componentDidUpdate = () => {
    this.updateTruncationReference();
  };

  render = () => {
    const { rootNode } = this;
    const charNodes = rootNode.current?.querySelectorAll('tspan') || [];
    const { style, maxWidth, children: text, ...textProps } = this.props;
    const createTextSpan = (character, key) => (
      <tspan key={key} style={style}>
        {character}
      </tspan>
    );
    const reducer = createTotalCharacterReducer(maxWidth);
    const totalCharsRaw = charNodes ? [...charNodes].reduce(reducer, {}).totalChars : text.length;
    // If the area is super restrictive (a really thin bar) the math can workout
    // to no room for any letters to appear. In that regard we force one character
    // to be squeezed in.
    const totalChars = Math.max(totalCharsRaw, 1);

    return (
      <>
        {
          // Create a "hidden" complete version (no ellipses) of the text. Each
          // character is isolated into its own <tspan> so that we can measure them
          // individually to determine if their accumulated width exceeds the
          // allocated display area.
          // NOTE: No "measuring" className hooks are supplied to this hidden text
          // block (so it has no influence over visual layout).
        }
        <text ref={this.rootNode} y="9999999">
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
      </>
    );
  };
}

export default TruncatedText;

TruncatedText.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  maxWidth: PropTypes.number,
  style: PropTypes.object,
  textAnchor: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
};
