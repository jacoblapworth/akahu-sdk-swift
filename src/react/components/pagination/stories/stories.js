// Libs
import React, { useState } from 'react';

// Components we need to test with
import XUIPagination from '../XUIPagination';
import XUIPanel from '../../panel/XUIPanel';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, array } from '@storybook/addon-knobs';
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';
import { defaultPerPageCountOptions } from '../private/helpers';

const accessibilityProps = {
  ariaLabel: 'Pagination',
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
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
        {...accessibilityProps}
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
        currentPage={page}
        onPageChange={setPage}
        onPerPageCountChange={onPerPageCountChange}
        page={page}
        perPageCount={perPageCount}
        {...accessibilityProps}
        {...props}
      />
    </XUIPanel>
  );
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(customCentered);
storiesWithKnobs.addDecorator(withKnobs);

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
storiesWithVariations.addDecorator(customCentered);

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
