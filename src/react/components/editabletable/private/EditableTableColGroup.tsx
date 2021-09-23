import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import { xuiControlSizeStandard } from './constants';

interface Props {
  columnWidths?: string[];
}

const EditableTableColGroup: React.FunctionComponent<Props> = ({ columnWidths }) => {
  const { rowOptions } = React.useContext(XUIEditableTableContext);

  if (!columnWidths?.length) {
    return null;
  }

  return (
    <colgroup>
      {rowOptions.isDraggable && <col style={{ width: xuiControlSizeStandard }} />}
      {columnWidths.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <col key={String(i)} style={{ width: item }} />
      ))}
      {rowOptions.isRemovable && <col style={{ width: xuiControlSizeStandard }} />}
    </colgroup>
  );
};

EditableTableColGroup.propTypes = {
  // @ts-ignore
  columnWidths: PropTypes.arrayOf(PropTypes.string),
};

export default EditableTableColGroup;
