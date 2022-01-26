/* eslint-disable max-classes-per-file */
import React, { useEffect } from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import NOOP from '../../helpers/noop';

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
  XUIEditableTableFootActions,
  XUIEditableTableFootAction,
} from '../../../editabletable';
import XUIEditableTableBody from '../XUIEditableTableBody';
import XUIActions from '../../../actions';
import generateCell from './helpers';
import ColumnHideSelect from './column-hide-select';
import EditableTableCreatorRowExample from './creator-row';
import { EditableTableUserTest } from './user-tests';
import XUIEditableTableCellTextInput from '../XUIEditableTableCellTextInput';

class EditableTablePlayground extends React.Component {
  state = {
    hiddenColumns: [],
  };

  handleColumnVisibility = selectedColumns => {
    this.setState({ hiddenColumns: selectedColumns });
  };

  render() {
    const {
      activeSortKey,
      ariaLabel,
      cellType,
      columnCount,
      columnWidths,
      disableRowControls,
      disableSecondRow,
      hasHeader,
      hideShowColumns,
      invalidSecondColumn,
      isSortAsc,
      hasPinnedFirstColumn,
      hasPinnedLastColumn,
      randomiseContent,
      rows,
      rowOptions,
      maxWidth,
      minWidth,
      cellsValidationMessage,
      showAddRowButton,
      showFooterRow,
      showSortingByColumns,
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
                    isSortActive={activeSortKey === item}
                    isSortAsc={isSortAsc}
                    key={`head_${index}`}
                    onSortChange={showSortingByColumns ? NOOP : undefined}
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
          {(showAddRowButton || showFooterRow) && (
            <XUIEditableTableFoot>
              {showFooterRow && (
                <XUIEditableTableRow
                  disableRowControls
                  index={rows.length}
                  key={`row_${rows.length}`}
                >
                  {Array.from(Array(columnCount).keys()).map((_, index) => (
                    <XUIEditableTableCellTextInput
                      key={`foot_${index}`}
                      placeholder={index === 0 ? 'Add new row' : undefined}
                    >
                      textInput
                    </XUIEditableTableCellTextInput>
                  ))}
                </XUIEditableTableRow>
              )}
              {showAddRowButton && (
                <XUIEditableTableFootActions>
                  <XUIEditableTableFootAction
                    buttonContent="Add new row"
                    onClick={() => console.log('Add new row')}
                  />
                </XUIEditableTableFootActions>
              )}
            </XUIEditableTableFoot>
          )}
        </XUIEditableTable>
      </>
    );
  }
}

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.add('Playground', () => {
  const columnCount = number('Column count', 7);
  const sortKeyOptions = Array.from(Array(columnCount).keys());

  return (
    <EditableTablePlayground
      activeSortKey={select('Sort by column number', sortKeyOptions, sortKeyOptions[0])}
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
          'secondarySearch',
          'assorted',
        ],
        'assorted',
      )}
      cellsValidationMessage={text('Cells validationMessage', 'Example validation message')}
      columnCount={columnCount}
      columnWidths={text('Column widths (space-separated)')}
      disableRowControls={boolean('Disable controls in the last row?', false)}
      disableSecondRow={boolean('Disable cells in the second row?', false)}
      hasHeader={boolean('Has header?', true)}
      hasPinnedFirstColumn={boolean('Has pinned first column?', false)}
      hasPinnedLastColumn={boolean('Has pinned last column?', false)}
      hideShowColumns={boolean('Show column-hiding filter?', false)}
      invalidSecondColumn={boolean('Invalid cells in the second column?', false)}
      isSecondColumnEndAligned={boolean('End align the second column', false)}
      isSortAsc={boolean('isSortAsc', false)}
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
      showFooterRow={boolean('Show pinned row?', false)}
      showSortingByColumns={boolean('Show sorting by columns?', true)}
      tableValidationMessage={text(
        'Table validationMessage',
        '3 of the table cells have invalid data entered',
      )}
    />
  );
});

storiesWithKnobs.add('Interactive creator row example', () => <EditableTableCreatorRowExample />);

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const {
      activeSortKey,
      cellType,
      clickSelector,
      columnCount,
      hasHeader,
      inlineAlignment,
      isSortAsc,
      randomiseContent,
      renderSmallerWrapper,
      rows,
      scrollLeft,
      showAddRowButton,
      showFooterRow,
      showSortingByColumns,
      storyKind,
      storyTitle,
      withDisabled,
      withInvalid,
      validationMessage,
      ...variationMinusStoryDetails
    } = { ...variation };

    return (
      <EditableTableStoryWrapper
        activeSortKey={activeSortKey}
        cellType={cellType}
        columnCount={columnCount}
        hasHeader={hasHeader}
        inlineAlignment={inlineAlignment}
        isSortAsc={isSortAsc}
        randomiseContent={randomiseContent}
        renderSmallerWrapper={renderSmallerWrapper}
        rows={rows}
        scrollLeft={scrollLeft}
        showAddRowButton={showAddRowButton}
        showFooterRow={showFooterRow}
        showSortingByColumns={showSortingByColumns}
        validationMessage={validationMessage}
        variationMinusStoryDetails={variationMinusStoryDetails}
        withDisabled={withDisabled}
        withInvalid={withInvalid}
        {...variationMinusStoryDetails}
      />
    );
  });
});

const EditableTableStoryWrapper = ({
  activeSortKey,
  columnCount,
  hasHeader,
  inlineAlignment,
  isSortAsc,
  randomiseContent,
  rows,
  renderSmallerWrapper,
  showAddRowButton,
  showFooterRow,
  showSortingByColumns,
  scrollLeft,
  cellType,
  withDisabled,
  withInvalid,
  validationMessage,
  variationMinusStoryDetails,
}) => {
  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.xui-editabletablewrapper--scrollcontainer').scrollLeft = scrollLeft;
    });
  }, [scrollLeft]);

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
                isSortActive={activeSortKey === item}
                isSortAsc={isSortAsc}
                key={`head_${index}`}
                onSortChange={showSortingByColumns ? NOOP : undefined}
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
      {(showAddRowButton || showFooterRow) && (
        <XUIEditableTableFoot>
          {showFooterRow && (
            <XUIEditableTableRow disableRowControls index={columnCount} key={`row_${columnCount}`}>
              {Array.from(Array(columnCount).keys()).map((_, index) => (
                <XUIEditableTableCellTextInput
                  key={`foot_${index}`}
                  placeholder={index === 0 ? 'Add new row' : undefined}
                />
              ))}
            </XUIEditableTableRow>
          )}
          {showAddRowButton && (
            <XUIEditableTableFootActions>
              <XUIEditableTableFootAction
                buttonContent="Add new row"
                onClick={() => console.log('Add new row')}
              />
            </XUIEditableTableFootActions>
          )}
        </XUIEditableTableFoot>
      )}
    </XUIEditableTable>
  );

  const displayComponent = renderSmallerWrapper ? (
    <div style={{ width: '400px' }}>{editableTableComponent}</div>
  ) : (
    editableTableComponent
  );

  return displayComponent;
};

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
