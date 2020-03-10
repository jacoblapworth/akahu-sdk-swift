import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

import {
  XUIEditableTable,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableCellReadOnly,
  XUIEditableTableRow,
} from '../../../editabletable';
import XUIEditableTableBody from '../XUIEditableTableBody';

class EditableTablePlayground extends React.Component {
  render() {
    const { columns, hasHeader, rows } = this.props;
    return (
      <XUIEditableTable>
        {hasHeader && (
          <XUIEditableTableHead>
            <XUIEditableTableRow>
              {Array.from(Array(columns).keys()).map(() => (
                <XUIEditableTableHeadingCell>I’m a cell</XUIEditableTableHeadingCell>
              ))}
            </XUIEditableTableRow>
          </XUIEditableTableHead>
        )}
        <XUIEditableTableBody>
          {Array.from(Array(rows).keys()).map(() => (
            <XUIEditableTableRow>
              {Array.from(Array(columns).keys()).map(() => (
                <XUIEditableTableCellReadOnly>I’m a cell</XUIEditableTableCellReadOnly>
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
