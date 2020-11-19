/* eslint-disable max-classes-per-file */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import {
  variations,
  variationStoryKindName,
  regressionVariations,
  regressionVariationStoryKindName,
} from './variations';

import {
  XUIEditableTable,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableFoot,
  XUIEditableTableFootAction,
} from '../../../editabletable';
import XUIEditableTableBody from '../XUIEditableTableBody';
import XUIActions from '../../../actions';
import generateCell from './helpers';
import ColumnHideSelect from './column-hide-select';
import { EditableTableUserTest } from './user-tests';

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
      columnCount,
      columnWidths,
      disableRowControls,
      disableSecondRow,
      hasHeader,
      hideShowColumns,
      invalidSecondColumn,
      hasPinnedFirstColumn,
      hasPinnedLastColumn,
      randomiseContent,
      rows,
      rowOptions,
      maxWidth,
      minWidth,
      cellsValidationMessage,
      showAddRowButton,
      tableValidationMessage,
    } = this.props;
    let cellsCount = 0;
    const colWidths = columnWidths && columnWidths.split(/[\s,]/g);
    return (
      <>
        {hideShowColumns && (
          <XUIActions className="xui-margin-bottom">
            <ColumnHideSelect
              columns={Array.from(Array(columnCount).keys())}
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
          hasPinnedFirstColumn={hasPinnedFirstColumn}
          hasPinnedLastColumn={hasPinnedLastColumn}
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
          {(hasHeader && (
            <XUIEditableTableHead>
              <XUIEditableTableRow>
                {Array.from(Array(columnCount).keys()).map((item, index) => (
                  <XUIEditableTableHeadingCell key={index}>I’m a cell</XUIEditableTableHeadingCell>
                ))}
              </XUIEditableTableRow>
            </XUIEditableTableHead>
          )) ||
            null}
          <XUIEditableTableBody>
            {Array.from(Array(rows).keys()).map((item, rowIndex, arr) => (
              <XUIEditableTableRow
                disableRowControls={rowIndex === arr.length - 1 && disableRowControls}
                index={rowIndex}
                key={rowIndex}
                onRemove={() => console.log('remove me')}
              >
                {Array.from(Array(columnCount).keys()).map((item, columnIndex) => {
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
          {(showAddRowButton && (
            <XUIEditableTableFoot>
              <XUIEditableTableFootAction
                addButtonContent="Add new row"
                onAdd={() => console.log('Add a row')}
              />
            </XUIEditableTableFoot>
          )) ||
            null}
        </XUIEditableTable>
      </>
    );
  }
}

const storiesWithKnobs = storiesOf(variationStoryKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
  <EditableTablePlayground
    ariaLabel={text('Aria label', '')}
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
    cellsValidationMessage={text('Cells validationMessage', 'Example validation message')}
    columnCount={number('Column count', 4)}
    columnWidths={text('Column widths (space-separated)')}
    disableRowControls={boolean('Disable controls in the last row?', false)}
    disableSecondRow={boolean('Disable cells in the second row?', false)}
    hasHeader={boolean('Has header?', true)}
    hasPinnedFirstColumn={boolean('Has pinned first column?', false)}
    hasPinnedLastColumn={boolean('Has pinned last column?', false)}
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
    showAddRowButton={boolean('Show add row button?', false)}
    tableValidationMessage={text(
      'Table validationMessage',
      '3 of the table cells have invalid data entered',
    )}
  />
));

const storiesWithVariations = storiesOf(variationStoryKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const {
      columnCount,
      hasHeader,
      rows,
      renderSmallerWrapper,
      showAddRowButton,
      cellType,
      scrollLeft,
      withDisabled,
      withInvalid,
      validationMessage,
    } = variationMinusStoryDetails;

    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    delete variationMinusStoryDetails.hasHeader;
    delete variationMinusStoryDetails.renderSmallerWrapper;
    delete variationMinusStoryDetails.showAddRowButton;

    return (
      <EditableTableStoryWrapper
        cellType={cellType}
        columnCount={columnCount}
        hasHeader={hasHeader}
        renderSmallerWrapper={renderSmallerWrapper}
        rows={rows}
        scrollLeft={scrollLeft}
        showAddRowButton={showAddRowButton}
        validationMessage={validationMessage}
        variationMinusStoryDetails={variationMinusStoryDetails}
        withDisabled={withDisabled}
        withInvalid={withInvalid}
      />
    );
  });
});

class EditableTableStoryWrapper extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      document.querySelector(
        '.xui-editabletablewrapper--scrollcontainer',
      ).scrollLeft = this.props.scrollLeft;
    });
  }

  render() {
    const {
      columnCount,
      hasHeader,
      rows,
      renderSmallerWrapper,
      showAddRowButton,
      cellType,
      withDisabled,
      withInvalid,
      validationMessage,
      variationMinusStoryDetails,
    } = this.props;
    const editableTableComponent = (
      <XUIEditableTable {...variationMinusStoryDetails} isInvalid={withInvalid}>
        {(hasHeader && (
          <XUIEditableTableHead>
            <XUIEditableTableRow>
              {Array.from(Array(columnCount).keys()).map((item, index) => (
                <XUIEditableTableHeadingCell key={index}>I’m a cell</XUIEditableTableHeadingCell>
              ))}
            </XUIEditableTableRow>
          </XUIEditableTableHead>
        )) ||
          null}
        <XUIEditableTableBody>
          {Array.from(Array(rows).keys()).map((item, rowIndex) => (
            <XUIEditableTableRow
              index={rowIndex}
              key={rowIndex}
              onRemove={() => console.log('remove me')}
            >
              {Array.from(Array(columnCount).keys()).map((item, index) => {
                return !cellType ? (
                  <XUIEditableTableCellReadOnly id={index} key={index}>
                    Cell text
                  </XUIEditableTableCellReadOnly>
                ) : (
                  generateCell({
                    cellsCount: 1,
                    cellType,
                    columnIndex: index,
                    randomiseContent: false,
                    isDisabled: withDisabled && index === 2,
                    isInvalid: withInvalid && rowIndex === 2,
                    validationMessage,
                  })
                );
              })}
            </XUIEditableTableRow>
          ))}
        </XUIEditableTableBody>
        {(showAddRowButton && (
          <XUIEditableTableFoot>
            <XUIEditableTableFootAction
              addButtonContent="Add new row"
              onAdd={() => console.log('Add new row')}
            />
          </XUIEditableTableFoot>
        )) ||
          null}
      </XUIEditableTable>
    );

    const displayComponent = renderSmallerWrapper ? (
      <div style={{ width: '400px' }}>{editableTableComponent}</div>
    ) : (
      editableTableComponent
    );

    return displayComponent;
  }
}

const regressionStoriesWithVariations = storiesOf(regressionVariationStoryKindName, module);
regressionStoriesWithVariations.addDecorator(centered);

regressionVariations.forEach(variation => {
  regressionStoriesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const { withDisabled } = variationMinusStoryDetails;

    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    delete variationMinusStoryDetails.hasHeader;
    delete variationMinusStoryDetails.renderSmallerWrapper;
    delete variationMinusStoryDetails.showAddRowButton;

    return (
      <EditableTableUserTest disableMainFilling={withDisabled} {...variationMinusStoryDetails} />
    );
  });
});
