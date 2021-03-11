// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { select, number, text } from '@storybook/addon-knobs';

// Components we need to test with
import XUIRow from '../XUIRow';
import XUIColumn from '../XUIColumn';
import { rowVariants } from '../private/constants';

import { variations, storiesWithVariationsKindName } from './variations';

const buildColumns = widths =>
  widths.map((width, index) => (
    <XUIColumn
      className="xui-padding-small"
      gridColumns={width}
      gridColumnsLargeUp={width}
      gridColumnsSmallUp={width}
      key={index}
      style={{ backgroundColor: 'RGBA(255,255,255,0.5)' }}
    >
      Content of a column with width {width}, here.
    </XUIColumn>
  ));

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.add('Columns Playground', () => {
  const columnCount = number('number of columns', 3);
  const columnWidths = text('list of column widths', '2 8 2');
  function buildColumnsArray() {
    let widthsArr = columnWidths.split(/[,\s]+/);
    if (!widthsArr || !widthsArr.length || widthsArr[0] === '') {
      widthsArr = [];
    }
    if (widthsArr.length === columnCount) {
      return widthsArr;
    }
    if (widthsArr.length > columnCount) {
      return widthsArr.slice(0, columnCount);
    }
    while (widthsArr.length < columnCount) {
      widthsArr.push('1');
    }
    return widthsArr;
  }
  return (
    <XUIRow
      className="xui-padding-small"
      style={{ backgroundColor: '#028DDE' }}
      variant={select('variant', Object.keys(rowVariants), 'standard')}
    >
      {buildColumns(buildColumnsArray())}
    </XUIRow>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
const storiesWithFullFlexibility = storiesOf(storiesWithVariationsKindName, module);

const handleVariation = (variationSet, renderer) => {
  variationSet.forEach(variation => {
    const { storyTitle, storyKind, customDecorator, ...variationMinusStoryDetails } = variation;
    const targetStories = customDecorator ? storiesWithFullFlexibility : storiesWithVariations;

    targetStories.add(storyTitle, () => renderer(variationMinusStoryDetails));
  });
};

handleVariation(variations, variationMinusStoryDetails => {
  const { columnWidths } = variationMinusStoryDetails;
  delete variationMinusStoryDetails.columnWidths;
  return (
    <XUIRow
      {...variationMinusStoryDetails}
      className="xui-padding-small"
      style={{ backgroundColor: '#028DDE' }}
    >
      {buildColumns(columnWidths)}
    </XUIRow>
  );
});
