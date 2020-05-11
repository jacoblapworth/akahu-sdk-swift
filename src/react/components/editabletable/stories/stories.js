import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

import {
  XUIEditableTable,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
} from '../../../editabletable';
import XUIEditableTableBody from '../XUIEditableTableBody';
import generateCell from './helpers';
import { EditableTableUserTest, sandwichData } from './user-tests';

class EditableTablePlayground extends React.Component {
  render() {
    const {
      caption,
      cellType,
      columns,
      columnWidths,
      disableSecondRow,
      hasHeader,
      randomiseContent,
      rows,
      rowOptions,
      maxWidth,
      minWidth,
    } = this.props;
    let cellsCount = 0;
    const colWidths = columnWidths && columnWidths.split(/[\s,]/g);
    return (
      <XUIEditableTable
        caption={caption}
        columnWidths={colWidths}
        maxWidth={maxWidth}
        minWidth={minWidth}
        rowOptions={rowOptions}
      >
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
          {Array.from(Array(rows).keys()).map((item, rowIndex) => (
            <XUIEditableTableRow
              key={rowIndex}
              onRemove={() => console.log('remove me')}
              removeButtonAriaLabel="Remove row"
            >
              {Array.from(Array(columns).keys()).map((item, columnIndex) => {
                const isDisabled = disableSecondRow && rowIndex === 1;
                cellsCount += 1;
                return generateCell({
                  cellsCount,
                  cellType,
                  columnIndex,
                  randomiseContent,
                  isDisabled,
                });
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
    caption={text('caption', '')}
    cellType={select(
      'Cell type',
      [
        'readOnly',
        'textInput',
        'textInputMultiline',
        'selectBox',
        'autoCompleterSingle',
        'autoCompleterMulti',
        'assorted',
      ],
      'assorted',
    )}
    columns={number('Columns', 4)}
    columnWidths={text('Column widths (space-separated)')}
    disableSecondRow={boolean('Disable cells in the second row?', false)}
    hasHeader={boolean('Has header?', true)}
    maxWidth={text('Max width', '1100px')}
    minWidth={text('Min width', '300px')}
    randomiseContent={boolean('Various assorted strings as content?', false)}
    rowOptions={{ isRemovable: boolean('Show remove button?', true) }}
    rows={number('Rows', 3)}
  />
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const { columns, hasHeader, rows, renderSmallerWrapper } = variationMinusStoryDetails;

    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    delete variationMinusStoryDetails.hasHeader;
    delete variationMinusStoryDetails.renderSmallerWrapper;

    const editableTableComponent = (
      <XUIEditableTable {...variationMinusStoryDetails}>
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
              {Array.from(Array(columns).keys()).map((item, index) => {
                return (
                  <XUIEditableTableCellReadOnly id={index} key={index}>
                    Cell text
                  </XUIEditableTableCellReadOnly>
                );
              })}
            </XUIEditableTableRow>
          ))}
        </XUIEditableTableBody>
      </XUIEditableTable>
    );

    const displayComponent = renderSmallerWrapper ? (
      <div style={{ width: '400px', overflow: 'hidden' }}>{editableTableComponent}</div>
    ) : (
      editableTableComponent
    );

    return displayComponent;
  });
});

storiesWithVariations.add('User test 1', () => {
  return <EditableTableUserTest />;
});
storiesWithVariations.add('User test 2', () => {
  return <EditableTableUserTest disableMainFilling />;
});
storiesWithVariations.add('User test 3', () => {
  return <EditableTableUserTest items={sandwichData} />;
});
storiesWithVariations.add('User test 4', () => {
  return (
    <EditableTableUserTest
      columnWidths={['190px', '190px', '160px', '160px', '160px', '250px']}
      items={sandwichData}
      maxWidth="800px"
    />
  );
});
