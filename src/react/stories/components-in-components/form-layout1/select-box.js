// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import SelectBox, { SelectBoxOption } from '../../../select-box';
import XUIIcon from '../../../icon';

const bank = require('@xero/xui-icon/icons/bank').default;

export default class LayoutSelect extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedItem: null,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    const { onSelect } = this.props;
    this.setState({ selectedItem: value });
    onSelect && value !== '' && onSelect(value);
  }

  render() {
    const { selectedItem } = this.state;
    const { label, children, title, name, className, htmlFor } = this.props;

    const displayText = selectedItem != null && selectedItem !== '' ? selectedItem : title;

    return (
      <div className={className}>
        <SelectBox
          buttonContent={
            <span className="xui-u-flex">
              <XUIIcon className="xui-margin-right-xsmall" icon={bank} />
              {displayText}
            </span>
          }
          caretTitle="Toggle list"
          htmlFor={htmlFor}
          isFieldLayout
          isTextTruncated={false}
          label={label}
          name={name}
          ref={c => (this.selectOne = c)}
        >
          {children &&
            children.map((opt, idx) => (
              <SelectBoxOption
                id={opt}
                isSelected={opt === selectedItem && selectedItem !== ''}
                // eslint-disable-next-line prefer-template
                key={idx + opt + 'userDefined key'}
                onSelect={this.onSelect}
                value={opt}
              >
                {opt}
              </SelectBoxOption>
            ))}
        </SelectBox>
        <input
          hidden
          id={selectedItem}
          name={name}
          value={selectedItem != null ? selectedItem : ''}
        />
      </div>
    );
  }
}

LayoutSelect.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};
