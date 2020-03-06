import React from 'react';
import PropTypes from 'prop-types';

import SelectBox from '../../select-box/SelectBox';
import SelectBoxOption from '../../select-box/SelectBoxOption';

import { numberFormat } from './helpers';

const PaginationSelect = ({ buttonContent, currentOption, label, onSelect, options }) => {
  return (
    <SelectBox
      buttonContent={buttonContent}
      buttonVariant="borderless-primary"
      fullWidth="never"
      isLabelHidden
      isTextTruncated={false}
      label={label}
      size="small"
    >
      {options.map((opt, idx) => {
        return (
          <SelectBoxOption
            id={label ? `${label.replace(/\s/g, '')}${opt}` : `pagination${opt}`}
            isSelected={opt === currentOption}
            key={`${idx + opt}`}
            onSelect={onSelect}
            value={opt}
          >
            {numberFormat(opt)}
          </SelectBoxOption>
        );
      })}
    </SelectBox>
  );
};

export default React.memo(PaginationSelect);

PaginationSelect.propTypes = {
  buttonContent: PropTypes.string,
  currentOption: PropTypes.number,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.array,
};
