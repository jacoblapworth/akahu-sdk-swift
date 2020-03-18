import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

import {
  XUIEditableTable,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableCellTextInput,
  XUIEditableTableRow,
} from '../../../editabletable';
import XUIEditableTableBody from '../XUIEditableTableBody';

class EditableTablePlayground extends React.Component {
  render() {
    const { columns, columnWidths, hasHeader, rows, rowOptions } = this.props;
    return (
      <XUIEditableTable columnWidths={columnWidths} rowOptions={rowOptions}>
        {hasHeader && (
          <XUIEditableTableHead>
            <XUIEditableTableRow removeButtonAriaLabel="Remove row">
              {Array.from(Array(columns).keys()).map(() => (
                <XUIEditableTableHeadingCell>I’m a cell</XUIEditableTableHeadingCell>
              ))}
            </XUIEditableTableRow>
          </XUIEditableTableHead>
        )}
        <XUIEditableTableBody>
          {Array.from(Array(rows).keys()).map(() => (
            <XUIEditableTableRow onRemove={() => console.log('remove me')}>
              {Array.from(Array(columns).keys()).map(() => (
                <XUIEditableTableCellTextInput
                  cellProps={{
                    width: '50px',
                  }}
                  id="abc"
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
