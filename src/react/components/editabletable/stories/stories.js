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
import XUIActions from '../../../actions';
import generateCell from './helpers';
import ColumnHideSelect from './column-hide-select';
import { EditableTableUserTest, sandwichData } from './user-tests';

class EditableTablePlayground extends React.Component {
  state = {
    hiddenColumns: [],
  };

  handleColumnVisibility = selectedColumns => {
    this.setState({ hiddenColumns: selectedColumns });
  };

  render() {
    const {
      ariaLabel,
      cellType,
      columns,
      columnWidths,
      disableRowControls,
      disableSecondRow,
      hasHeader,
      hideShowColumns,
      invalidSecondColumn,
      randomiseContent,
      rows,
      rowOptions,
      maxWidth,
      minWidth,
      cellsValidationMessage,
      tableValidationMessage,
    } = this.props;
    let cellsCount = 0;
    const colWidths = columnWidths && columnWidths.split(/[\s,]/g);
    return (
      <>
        {hideShowColumns && (
          <XUIActions className="xui-margin-bottom">
            <ColumnHideSelect
              columns={columns}
              passedOnItemSelect={this.handleColumnVisibility}
              rowOptions={rowOptions}
            />
          </XUIActions>
        )}
        <XUIEditableTable
          ariaLabel={ariaLabel}
          columnWidths={colWidths}
          dndDragCancelledMessage={startPosition =>
            `Movement cancelled. The item has returned to its starting position of ${startPosition}.`
          }
          dndDragOutsideMessage={() => 'You are currently not dragging over a droppable area.'}
          dndDragStartMessage={startPosition =>
            `You have lifted an item in position ${startPosition}.`
          }
          dndDragUpdateMessage={(startPosition, endPosition) =>
            `You have moved the item from position ${startPosition} to position ${endPosition}.`
          }
          dndDropFailedMessage={startPosition =>
            `The item has been dropped while not over a droppable area. The item has returned to its starting position of ${startPosition}.`
          }
          dndDropMessage={(startPosition, endPosition) =>
            `You have dropped the item. It has moved from position ${startPosition} to ${endPosition}.`
          }
          dndInstructions="Press space bar to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Ensure your screen reader is in focus mode or forms mode."
          hiddenColumns={this.state.hiddenColumns}
          isInvalid={invalidSecondColumn}
          maxWidth={maxWidth}
          minWidth={minWidth}
          onReorderRow={(startIndex, destinationIndex) =>
            console.log(`Row dragged from index ${startIndex} to ${destinationIndex}`)
          }
          rowOptions={rowOptions}
          validationMessage={tableValidationMessage}
        >
          {hasHeader && (
            <XUIEditableTableHead>
              <XUIEditableTableRow>
                {Array.from(Array(columns).keys()).map((item, index) => (
                  <XUIEditableTableHeadingCell key={index}>I’m a cell</XUIEditableTableHeadingCell>
                ))}
              </XUIEditableTableRow>
            </XUIEditableTableHead>
          )}
          <XUIEditableTableBody>
            {Array.from(Array(rows).keys()).map((item, rowIndex, arr) => (
              <XUIEditableTableRow
                disableRowControls={rowIndex === arr.length - 1 && disableRowControls}
                index={rowIndex}
                key={rowIndex}
                onRemove={() => console.log('remove me')}
              >
                {Array.from(Array(columns).keys()).map((item, columnIndex) => {
                  const isDisabled = disableSecondRow && rowIndex === 1;
                  const isInvalid = invalidSecondColumn && columnIndex === 1;
                  cellsCount += 1;
                  return generateCell({
                    cellsCount,
                    cellType,
                    columnIndex,
                    randomiseContent,
                    isDisabled,
                    isInvalid,
                    validationMessage: cellsValidationMessage,
                  });
                })}
              </XUIEditableTableRow>
            ))}
          </XUIEditableTableBody>
        </XUIEditableTable>
      </>
    );
  }
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
  <EditableTablePlayground
    ariaLabel={text('Aria label', '')}
    cellsValidationMessage={text('Cells validationMessage', 'Example validation message')}
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
    disableRowControls={boolean('Disable controls in the last row?', false)}
    disableSecondRow={boolean('Disable cells in the second row?', false)}
    hasHeader={boolean('Has header?', true)}
    hideShowColumns={boolean('Show column-hiding filter?', false)}
    invalidSecondColumn={boolean('Invalid cells in the second column?', false)}
    maxWidth={text('Max width', '1100px')}
    minWidth={text('Min width', '300px')}
    randomiseContent={boolean('Various assorted strings as content?', false)}
    rowOptions={{
      isDraggable: boolean('Show drag handle?', true),
      isRemovable: boolean('Show remove button?', true),
      removeButtonAriaLabel: 'Remove row',
      dragButtonAriaLabel: 'Reorder row',
    }}
    rows={number('Rows', 3)}
    tableValidationMessage={text(
      'Table validationMessage',
      '3 of the table cells have invalid data entered',
    )}
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
            <XUIEditableTableRow>
              {Array.from(Array(columns).keys()).map((item, index) => (
                <XUIEditableTableHeadingCell key={index}>I’m a cell</XUIEditableTableHeadingCell>
              ))}
            </XUIEditableTableRow>
          </XUIEditableTableHead>
        )}
        <XUIEditableTableBody>
          {Array.from(Array(rows).keys()).map((item, index) => (
            <XUIEditableTableRow
              index={index}
              key={index}
              onRemove={() => console.log('remove me')}
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
