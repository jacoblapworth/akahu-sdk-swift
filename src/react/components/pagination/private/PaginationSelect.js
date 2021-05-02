import React from 'react';
import PropTypes from 'prop-types';

import XUISelectBox from '../../selectbox/XUISelectBox';
import XUISelectBoxOption from '../../selectbox/XUISelectBoxOption';

import { numberFormat } from './helpers';

const PaginationSelect = ({ buttonContent, currentOption, label, onSelect, options }) => (
  <XUISelectBox
    buttonContent={buttonContent}
    buttonVariant="borderless-primary"
    fullWidth="never"
    isLabelHidden
    isTextTruncated={false}
    label={label}
    size="small"
  >
    {options.map((opt, idx) => (
      <XUISelectBoxOption
        id={label ? `${label.replace(/\s/g, '')}${opt}` : `pagination${opt}`}
        isSelected={opt === currentOption}
        key={`${idx + opt}`}
        onSelect={onSelect}
        value={opt}
      >
        {numberFormat(opt)}
      </XUISelectBoxOption>
    ))}
  </XUISelectBox>
);

export default React.memo(PaginationSelect);

PaginationSelect.propTypes = {
  buttonContent: PropTypes.string,
  currentOption: PropTypes.number,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.array,
};
