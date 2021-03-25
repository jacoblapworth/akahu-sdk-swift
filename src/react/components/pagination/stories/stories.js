// Libs
import React, { useState } from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { text, boolean, number, array } from '@storybook/addon-knobs';

// Components we need to test with
import XUIPagination from '../XUIPagination';
import XUIPanel from '../../panel/XUIPanel';

import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';
import {
  defaultPerPageCountOptions,
  defaultPerPageContent,
  defaultCreateCountContent,
  defaultCreatePagingContent,
} from '../private/helpers';

const defaultProps = {
  ariaLabel: 'Pagination',
  createCountContent: defaultCreateCountContent,
  createPagingContent: defaultCreatePagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: defaultPerPageContent,
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page',
};

const Example = ({ count = 500, ...props }) => {
  const onPageChange = page => {
    console.log(`Page: ${page}`);
  };

  const onPerPageCountChange = perPageCount => {
    console.log(`Per Page Count: ${perPageCount}`);
  };

  return (
    <XUIPanel>
      <XUIPagination
        count={count}
        onPageChange={onPageChange}
        onPerPageCountChange={onPerPageCountChange}
        {...defaultProps}
        {...props}
      />
    </XUIPanel>
  );
};

const ControlledExample = ({ count = 200, ...props }) => {
  const [page, setPage] = useState(3);
  const [perPageCount, setPerPageCount] = useState(25);

  const onPerPageCountChange = perPageCount => {
    setPerPageCount(perPageCount);
    const pageCount = Math.ceil(count / perPageCount);
    setPage(page > pageCount ? pageCount : page);
  };

  return (
    <XUIPanel>
      <XUIPagination
        count={count}
        onPageChange={setPage}
        onPerPageCountChange={onPerPageCountChange}
        page={page}
        perPageCount={perPageCount}
        {...defaultProps}
        {...props}
      />
    </XUIPanel>
  );
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(customCentered);

storiesWithKnobs.add('Playground', () => {
  const props = {
    count: number('count', undefined),
    isResponsive: boolean('isResponsive', true),
    page: number('page', undefined),
    perPageCount: number('perPageCount', undefined),
    perPageCountOptions: array('perPageCountOptions', defaultPerPageCountOptions),
    qaHook: text('qaHook', ''),
    showCount: boolean('showCount', true),
    showPerPageCountSelect: boolean('showPerPageCountSelect', true),
  };
  return <Example {...props} />;
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variations => {
  const {
    storyTitle,
    storyKind,
    isControlled,
    withPanel,
    clickSelector,
    ...variationMinusStoryDetails
  } = variations;

  storiesWithVariations.add(storyTitle, () => {
    if (isControlled) {
      return <ControlledExample />;
    }
    if (clickSelector) {
      return (
        // To make sure the vis-reg tests capture the dropdown
        <div style={{ height: '100vh' }}>
          <Example {...variationMinusStoryDetails} />
        </div>
      );
    }
    return <Example {...variationMinusStoryDetails} />;
  });
});
