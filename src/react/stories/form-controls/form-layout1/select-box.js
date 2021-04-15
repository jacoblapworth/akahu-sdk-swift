// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import XUISelectBox, { XUISelectBoxOption } from '../../../selectbox';
import XUIIcon from '../../../icon';

const bank = require('@xero/xui-icon/icons/bank').default;

export default class LayoutSelect extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedItem: null,
    };

    this.onSelect = this.onSelect.bind(this);

    this.selectOne = React.createRef();
  }

  onSelect(value) {
    const { onSelect } = this.props;
    this.setState({ selectedItem: value });
    onSelect && value !== '' && onSelect(value);
  }

  render() {
    const { selectedItem } = this.state;
    const {
      label,
      children,
      title,
      name,
      htmlFor,
      isLabelHidden,
      isFieldLayout,
      isInvalid,
      isDisabled,
      validationMessage,
    } = this.props;

    const displayText = selectedItem != null && selectedItem !== '' ? selectedItem : title;

    return (
      <XUISelectBox
        buttonContent={
          <span className="xui-u-flex">
            <XUIIcon className="xui-margin-right-xsmall" icon={bank} />
            {displayText}
          </span>
        }
        caretTitle="Toggle list"
        htmlFor={htmlFor}
        isDisabled={isDisabled}
        isFieldLayout={isFieldLayout}
        isInvalid={isInvalid}
        isLabelHidden={isLabelHidden}
        isTextTruncated={false}
        label={label}
        name={name}
        ref={c => (this.selectOne = c)}
        validationMessage={validationMessage}
      >
        {children &&
          children.map((opt, idx) => (
            <XUISelectBoxOption
              id={opt}
              isSelected={opt === selectedItem && selectedItem !== ''}
              // eslint-disable-next-line prefer-template
              key={idx + opt + 'userDefined key'}
              onSelect={this.onSelect}
              value={opt}
            >
              {opt}
            </XUISelectBoxOption>
          ))}
      </XUISelectBox>
    );
  }
}

LayoutSelect.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  isFieldLayout: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onSelect: PropTypes.func,
  title: PropTypes.string,
};