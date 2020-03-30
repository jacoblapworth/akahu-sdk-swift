<div class="xui-margin-vertical">
	<a href="../section-components-navigation-pagination.html" isDocLink>Pagination in the XUI Documentation</a>
</div>

Pagination is a useful and clear way to break up sets of data within a page that could be over an optimum length. An optimum length should be determined by things like digestibility, performance, data usage, screen real estate and sensible URL schema.

## Responsive

By default the pagination will automatically change the layout based on the container width by using [container queries](#container-queries).

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import XUIPagination from '@xero/xui/react/pagination';
import {
  defaultPerPageCountOptions,
  defaultPerPageContent,
  defaultCreateCountContent,
  defaultCreatePagingContent
} from './components/pagination/private/helpers';

const defaultProps = {
  ariaLabel: 'Pagination',
  createCountContent: defaultCreateCountContent,
  createPagingContent: defaultCreatePagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: defaultPerPageContent,
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page'
};

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};
<div className="xui-panel xui-padding-small" style={wrapperStyles}>
  <XUIPagination count={98} {...defaultProps} />
</div>;
```

## Uncontrolled

`XUIPagination` is an uncontrolled component by default. You can set default values by using the `defaultPage` and `defaultPerPageCount` prop.

```jsx harmony
import XUIPagination from '@xero/xui/react/pagination';
import {
  defaultPerPageCountOptions,
  defaultPerPageContent,
  defaultCreateCountContent,
  defaultCreatePagingContent
} from './components/pagination/private/helpers';

const defaultProps = {
  ariaLabel: 'Pagination',
  createCountContent: defaultCreateCountContent,
  createPagingContent: defaultCreatePagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: defaultPerPageContent,
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page'
};

const UncontrolledExample = () => {
  const onPageChange = page => {
    console.log(`Page: ${page}`);
  };

  const onPerPageCountChange = perPageCount => {
    console.log(`Per Page Count: ${perPageCount}`);
  };

  return (
    <XUIPagination
      count={300}
      defaultPage={5}
      defaultPerPageCount={50}
      onPageChange={onPageChange}
      onPerPageCountChange={onPerPageCountChange}
      {...defaultProps}
    />
  );
};
<UncontrolledExample />;
```

## Controlled

To use `XUIPagination` as a controlled component, you can do so by providing and manipulating the `page` and `perPageCount` prop.

Following is an example changing the default behavior (jump to the fist page) when `perPageCount` changed.

```jsx harmony
import { useState } from 'react';
import XUIPagination from '@xero/xui/react/pagination';
import {
  defaultPerPageCountOptions,
  defaultPerPageContent,
  defaultCreateCountContent,
  defaultCreatePagingContent
} from './components/pagination/private/helpers';

const defaultProps = {
  ariaLabel: 'Pagination',
  createCountContent: defaultCreateCountContent,
  createPagingContent: defaultCreatePagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: defaultPerPageContent,
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page'
};

const ControlledExample = ({ count }) => {
  const [page, setPage] = useState(3);
  const [perPageCount, setPerPageCount] = useState(25);

  const onPerPageCountChange = perPageCount => {
    setPerPageCount(perPageCount);
    const pageCount = Math.ceil(count / perPageCount);
    setPage(page > pageCount ? pageCount : page);
  };

  return (
    <XUIPagination
      count={count}
      onPageChange={setPage}
      onPerPageCountChange={onPerPageCountChange}
      page={page}
      perPageCount={perPageCount}
      {...defaultProps}
    />
  );
};
<ControlledExample count={200} />;
```

## Paging only

To use paging widget only, set prop `showCount` and `showPerPageCountSelect` to `false`.

```jsx harmony
import XUIPagination from '@xero/xui/react/pagination';
import {
  defaultPerPageCountOptions,
  defaultPerPageContent,
  defaultCreateCountContent,
  defaultCreatePagingContent
} from './components/pagination/private/helpers';

const defaultProps = {
  ariaLabel: 'Pagination',
  createCountContent: defaultCreateCountContent,
  createPagingContent: defaultCreatePagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: defaultPerPageContent,
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page'
};

const Example = () => {
  return (
    <XUIPagination count={100} showCount={false} showPerPageCountSelect={false} {...defaultProps} />
  );
};
<Example />;
```

## Custom Content

There are three props: `createPagingContent`, `createPagingContent` and `perPageContent` that can be used to custom content in `XUIPagination`. These props can also be used for localization purposes.

```jsx harmony
import XUIPagination from '@xero/xui/react/pagination';
import {
  defaultPerPageCountOptions,
  defaultCreatePagingContent
} from './components/pagination/private/helpers';

const defaultProps = {
  ariaLabel: 'Pagination',
  createPagingContent: defaultCreatePagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page'
};

const Example = () => (
  <XUIPagination
    count={100}
    createCountContent={(from, to, count) => ({
      simple: `Total contacts: ${count}`,
      enhanced: `Showing contacts ${from}-${to} of ${count}`
    })}
    perPageContent="Contacts per page"
    {...defaultProps}
  />
);
<Example />;
```
