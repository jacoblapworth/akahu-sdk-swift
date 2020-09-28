import React from 'react';
import { SelectBox, SelectBoxOption } from '../../../select-box';

export default class ColumnHideSelect extends React.Component {
  state = {
    hiddenColumns: [],
  };

  handleItemSelect = value => {
    const onItemSelect = this.props.passedOnItemSelect;
    this.setState(prevState => {
      const newHidden = [...prevState.hiddenColumns];
      const valueIndex = newHidden.indexOf(value);
      valueIndex > -1 ? newHidden.splice(valueIndex, 1) : newHidden.push(value);
      onItemSelect && onItemSelect(newHidden);
      return {
        hiddenColumns: newHidden,
      };
    });
  };

  render() {
    const { rowOptions, columns } = this.props;
    let firstHideableChildIndex;
    if (rowOptions.isDraggable) {
      firstHideableChildIndex = 1;
    } else {
      firstHideableChildIndex = 0;
    }
    return (
      <SelectBox
        buttonContent="Show/hide columns"
        caretTitle="Toggle list"
        closeAfterSelection={false}
        isLabelHidden
        isMultiSelect
        isTextTruncated={false}
        label="Column visibility"
        onSelect={this.handleItemSelect}
      >
        {columns.map((item, index) => {
          const colIndex = index + firstHideableChildIndex;
          return (
            <SelectBoxOption
              id={`opt_${index}`}
              isSelected={!this.state.hiddenColumns.includes(colIndex)}
              key={`opt_${index}`}
              showCheckboxes
              value={colIndex}
            >
              {(isNaN(parseInt(item)) && item) || `Content Column ${colIndex}`}
            </SelectBoxOption>
          );
        })}
      </SelectBox>
    );
  }
}
