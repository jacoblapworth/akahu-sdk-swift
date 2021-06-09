/* eslint-disable max-classes-per-file */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, number, select, text } from '@storybook/addon-knobs';

import {
  variations,
  storiesWithVariationsKindName,
  regressionVariations,
  regressionVariationStoryKindName,
  storiesWithKnobsKindName,
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
      isSecondColumnEndAligned,
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
          dndInstructions="Press Space bar or Enter to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Ensure your screen reader is in focus mode or to use your pass through key."
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
                  <XUIEditableTableHeadingCell
                    inlineAlignment={isSecondColumnEndAligned && index === 1 ? 'end' : 'start'}
                    key={`head_${index}`}
                  >
                    I’m a cell
                  </XUIEditableTableHeadingCell>
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
                key={`row_${rowIndex}`}
                onRemove={() => console.log('remove me')}
              >
                {Array.from(Array(columnCount).keys()).map((item, columnIndex) => {
                  const isDisabled = disableSecondRow && rowIndex === 1;
                  const isInvalid = invalidSecondColumn && columnIndex === 1;
                  const inlineAlignment =
                    isSecondColumnEndAligned && columnIndex === 1 ? 'end' : 'start';
                  cellsCount += 1;
                  return generateCell({
                    cellsCount,
                    cellType,
                    columnIndex,
                    inlineAlignment,
                    isDisabled,
                    isInvalid,
                    randomiseContent,
                    rowIndex,
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

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
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
    isSecondColumnEndAligned={boolean('End align the second column', false)}
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

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const {
      cellType,
      clickSelector,
      columnCount,
      hasHeader,
      inlineAlignment,
      randomiseContent,
      renderSmallerWrapper,
      rows,
      scrollLeft,
      showAddRowButton,
      storyKind,
      storyTitle,
      withDisabled,
      withInvalid,
      validationMessage,
      ...variationMinusStoryDetails
    } = { ...variation };

    return (
      <EditableTableStoryWrapper
        cellType={cellType}
        columnCount={columnCount}
        hasHeader={hasHeader}
        inlineAlignment={inlineAlignment}
        randomiseContent={randomiseContent}
        renderSmallerWrapper={renderSmallerWrapper}
        rows={rows}
        scrollLeft={scrollLeft}
        showAddRowButton={showAddRowButton}
        validationMessage={validationMessage}
        variationMinusStoryDetails={variationMinusStoryDetails}
        withDisabled={withDisabled}
        withInvalid={withInvalid}
        {...variationMinusStoryDetails}
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
      inlineAlignment,
      randomiseContent,
      rows,
      renderSmallerWrapper,
      showAddRowButton,
      cellType,
      withDisabled,
      withInvalid,
      validationMessage,
      variationMinusStoryDetails,
    } = this.props;
    let cellsCount = 0;
    const editableTableComponent = (
      <XUIEditableTable
        {...variationMinusStoryDetails}
        isInvalid={withInvalid}
        validationMessage={validationMessage}
      >
        {(hasHeader && (
          <XUIEditableTableHead>
            <XUIEditableTableRow>
              {Array.from(Array(columnCount).keys()).map((item, index) => (
                <XUIEditableTableHeadingCell
                  inlineAlignment={inlineAlignment}
                  key={`head_${index}`}
                >
                  I’m a cell
                </XUIEditableTableHeadingCell>
              ))}
            </XUIEditableTableRow>
          </XUIEditableTableHead>
        )) ||
          null}
        <XUIEditableTableBody>
          {Array.from(Array(rows).keys()).map((item, rowIndex) => (
            <XUIEditableTableRow
              index={rowIndex}
              key={`row_${rowIndex}`}
              onRemove={() => console.log('remove me')}
            >
              {Array.from(Array(columnCount).keys()).map((item, index) => {
                cellsCount += 1;

                return !cellType ? (
                  <XUIEditableTableCellReadOnly id={index} key={`${rowIndex}_${index}`}>
                    Cell text
                  </XUIEditableTableCellReadOnly>
                ) : (
                  generateCell({
                    cellsCount: randomiseContent ? cellsCount : 1,
                    cellType,
                    columnIndex: index,
                    randomiseContent,
                    inlineAlignment,
                    isDisabled: withDisabled && index === 2,
                    isInvalid: withInvalid && rowIndex === 2,
                    validationMessage,
                    rowIndex,
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
