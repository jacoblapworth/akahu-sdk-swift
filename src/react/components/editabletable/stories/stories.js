import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

import {
  XUIEditableTable,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow,
} from '../../../editabletable';
import XUIEditableTableBody from '../XUIEditableTableBody';
import { samples, texts, widths } from './helpers';

class EditableTablePlayground extends React.Component {
  render() {
    const { columns, hasHeader, rows, rowOptions } = this.props;
    let cellsCount = 0;
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
              {Array.from(Array(columns).keys()).map(() => {
                const widthIndex = cellsCount % widths.length;
                const sampleIndex = cellsCount % samples.length;
                const textIndex = cellsCount % texts.length;
                cellsCount += 1;
                return samples[sampleIndex](
                  cellsCount.toString(),
                  widths[widthIndex],
                  texts[textIndex],
                );
              })}
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
    rows={number('Rows', 3)}
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
