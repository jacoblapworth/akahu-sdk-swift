<div class="xui-margin-vertical">
	<a href="../section-components-navigation-pagination.html" isDocLink>Pagination in the XUI Documentation</a>
</div>

Pagination is a useful and clear way to break up sets of data within a page that could be over an optimum length. An optimum length should be determined by things like digestibility, performance, data usage, screen real estate and sensible URL schema.

## Responsive

By default the pagination will automatically change the layout based on the container width by using [container queries](#container-queries).

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import XUIPagination from '@xero/xui/react/pagination';

const numberFormat = number => new Intl.NumberFormat().format(number);

const createCountContent = (from, to, count) => ({
  enhanced: `Showing items ${numberFormat(from)}–${numberFormat(to)} of ${numberFormat(count)}`,
  simple: `Total items: ${numberFormat(count)}`
});

const createPagingContent = (page, pageCount) => {
  return {
    enhanced: `Page ${numberFormat(page)} of ${numberFormat(pageCount)}`,
    simple: `${numberFormat(page)} of ${numberFormat(pageCount)}`
  };
};

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal'
};

<div className="xui-panel xui-padding-small" style={wrapperStyles}>
  <XUIPagination
    ariaLabel="Pagination"
    count={98}
    createCountContent={createCountContent}
    createPagingContent={createPagingContent}
    nextPageLabel="Next Page"
    pageSelectLabel="Select a page"
    perPageContent="Items per page"
    perPageCountSelectLabel="Select a per page count"
    previousPageLabel="Previous Page"
  />
</div>;
```

## Uncontrolled

`XUIPagination` is an uncontrolled component by default. You can set default values by using the `defaultPage` and `defaultPerPageCount` prop.

```jsx harmony
import XUIPagination from '@xero/xui/react/pagination';

const numberFormat = number => new Intl.NumberFormat().format(number);

const createCountContent = (from, to, count) => ({
  enhanced: `Showing items ${numberFormat(from)}–${numberFormat(to)} of ${numberFormat(count)}`,
  simple: `Total items: ${numberFormat(count)}`
});

const createPagingContent = (page, pageCount) => {
  return {
    enhanced: `Page ${numberFormat(page)} of ${numberFormat(pageCount)}`,
    simple: `${numberFormat(page)} of ${numberFormat(pageCount)}`
  };
};

const paginationProps = {
  ariaLabel: 'Pagination',
  createCountContent: createCountContent,
  createPagingContent: createPagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: 'Items per page',
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page'
};

const UncontrolledPaginationExample = () => {
  const onPageChange = page => {
    console.log(`onPageChange - Page: ${page}`);
  };

  const onPerPageCountChange = perPageCount => {
    console.log(`onPerPageCountChange - Per Page Count: ${perPageCount}`);
  };

  return (
    <XUIPagination
      count={300}
      defaultPage={5}
      defaultPerPageCount={50}
      onPageChange={onPageChange}
      onPerPageCountChange={onPerPageCountChange}
      {...paginationProps}
    />
  );
};
<UncontrolledPaginationExample />;
```

## Controlled

To use `XUIPagination` as a controlled component, you can do so by providing and manipulating the `page` and `perPageCount` prop.

Following is an example changing the default behavior (jump to the fist page) when `perPageCount` changed.

```jsx harmony
import { useState } from 'react';
import XUIPagination from '@xero/xui/react/pagination';

const numberFormat = number => new Intl.NumberFormat().format(number);

const createCountContent = (from, to, count) => ({
  enhanced: `Showing items ${numberFormat(from)}–${numberFormat(to)} of ${numberFormat(count)}`,
  simple: `Total items: ${numberFormat(count)}`
});

const createPagingContent = (page, pageCount) => {
  return {
    enhanced: `Page ${numberFormat(page)} of ${numberFormat(pageCount)}`,
    simple: `${numberFormat(page)} of ${numberFormat(pageCount)}`
  };
};

const paginationProps = {
  ariaLabel: 'Pagination',
  createCountContent: createCountContent,
  createPagingContent: createPagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: 'Items per page',
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page'
};

const ControlledPaginationExample = ({ count }) => {
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
      {...paginationProps}
    />
  );
};

<ControlledPaginationExample count={200} />;
```

## Paging only

To use paging widget only, set prop `showCount` and `showPerPageCountSelect` to `false`.

```jsx harmony
import XUIPagination from '@xero/xui/react/pagination';

const numberFormat = number => new Intl.NumberFormat().format(number);

const createCountContent = (from, to, count) => ({
  enhanced: `Showing items ${numberFormat(from)}–${numberFormat(to)} of ${numberFormat(count)}`,
  simple: `Total items: ${numberFormat(count)}`
});

const createPagingContent = (page, pageCount) => {
  return {
    enhanced: `Page ${numberFormat(page)} of ${numberFormat(pageCount)}`,
    simple: `${numberFormat(page)} of ${numberFormat(pageCount)}`
  };
};

const paginationProps = {
  ariaLabel: 'Pagination',
  createCountContent: createCountContent,
  createPagingContent: createPagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageContent: 'Items per page',
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page'
};

<XUIPagination count={100} showCount={false} showPerPageCountSelect={false} {...paginationProps} />;
```

## Customise Content

There are three props: `createPagingContent`, `createCountContent` and `perPageContent` that can be used to customise content in `XUIPagination`. These props can also be used for localization purposes.

Numbers in `createPagingContent` and `createCountContent` should be formatted for internationalisation. There's an example for `createCountContent` below.

```jsx harmony
import XUIPagination from '@xero/xui/react/pagination';

const numberFormat = number => new Intl.NumberFormat().format(number);

const createPagingContent = (page, pageCount) => {
  return {
    enhanced: `Page ${numberFormat(page)} of ${numberFormat(pageCount)}`,
    simple: `${numberFormat(page)} of ${numberFormat(pageCount)}`
  };
};

const paginationProps = {
  ariaLabel: 'Pagination',
  createPagingContent: createPagingContent,
  nextPageLabel: 'Next Page',
  pageSelectLabel: 'Select a page',
  perPageCountSelectLabel: 'Select a per page count',
  previousPageLabel: 'Previous Page'
};

const PaginationExample = () => (
  <XUIPagination
    count={100}
    createCountContent={(from, to, count) => ({
      simple: `Total contacts: ${numberFormat(count)}`,
      enhanced: `Showing contacts ${numberFormat(from)}–${numberFormat(to)} of ${numberFormat(
        count
      )}`
    })}
    perPageContent="Contacts per page"
    {...paginationProps}
  />
);

<PaginationExample />;
```
