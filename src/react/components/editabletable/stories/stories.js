import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

import {
  XUIEditableTable,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableCellSecondarySearch,
  XUIEditableTableCellSelectBox,
  XUIEditableTableCellTextInput,
  XUIEditableTableRow,
} from '../../../editabletable';
import XUIEditableTableBody from '../XUIEditableTableBody';
import XUIButton from '../../button/XUIButton';
import SelectBoxOption from '../../select-box/SelectBoxOption';

class EditableTablePlayground extends React.Component {
  render() {
    const { columns, hasHeader, rows, rowOptions } = this.props;
    return (
      <XUIEditableTable rowOptions={rowOptions}>
        {hasHeader && (
          <XUIEditableTableHead>
            <XUIEditableTableRow removeButtonAriaLabel="Remove row">
              {Array.from(Array(columns).keys()).map((item, index) => (
                <XUIEditableTableHeadingCell key={index}>I’m a cell</XUIEditableTableHeadingCell>
              ))}
            </XUIEditableTableRow>
          </XUIEditableTableHead>
        )}
        <XUIEditableTableBody>
          {Array.from(Array(rows).keys()).map((item, index) => (
            <XUIEditableTableRow
              key={index}
              onRemove={() => console.log('remove me')}
              removeButtonAriaLabel="Remove row"
            >
              {Array.from(Array(columns).keys()).map((item, index) => (
                <XUIEditableTableCellTextInput
                  cellProps={{
                    width: '50px',
                  }}
                  id="abc"
                  key={index}
                />
              ))}
            </XUIEditableTableRow>
          ))}
        </XUIEditableTableBody>
      </XUIEditableTable>
    );
  }
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
  <EditableTablePlayground
    columns={number('Columns', 4)}
    hasHeader={boolean('Has header', true)}
    rowOptions={{ isRemovable: boolean('Are rows removable', true) }}
    rows={number('Rows', 2)}
  />
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  const variationMinusStoryDetails = { ...variation };

  storiesWithVariations.add(variation.storyTitle, () => {
    return <XUIEditableTable {...variationMinusStoryDetails} />;
  });
});
