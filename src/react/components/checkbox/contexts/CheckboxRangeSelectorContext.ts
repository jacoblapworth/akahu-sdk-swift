import * as React from 'react';

interface CheckboxRangeSelectorContext {
  addCheckboxToRange?: (checkboxRef: React.RefObject<HTMLInputElement>) => void;
  removeCheckboxFromRange?: (checkboxRef: React.RefObject<HTMLInputElement>) => void;
}

const CheckboxRangeSelectorContext = React.createContext<CheckboxRangeSelectorContext>({});

export default CheckboxRangeSelectorContext;
