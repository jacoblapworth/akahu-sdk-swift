## With pagination

If you’re dealing with large amounts of data, you can add [`XUIPagination`](#pagination) in a `XUIEditableTableFoot`.

```jsx
import { useEffect, useState } from 'react';
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCell,
  XUIEditableTableCellReadOnly,
  XUIEditableTableFoot,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import XUIPagination from '@xero/xui/react/pagination';
import {
  defaultCreateCountContent,
  defaultCreatePagingContent
} from '../pagination/private/helpers';

const data = [
  { fruit: 'Apple', colour: 'Red', price: 2.99 },
  { fruit: 'Banana', colour: 'Yellow', price: 2.99 },
  { fruit: 'Cherry', colour: 'Red', price: 3.99 },
  { fruit: 'Durian', colour: 'Brown', price: 4.99 },
  { fruit: 'Elderberry', colour: 'Purple', price: 2.99 },
  { fruit: 'Feijoa', colour: 'Green', price: 2.99 },
  { fruit: 'Grape', colour: 'Green', price: 2.99 },
  { fruit: 'Huckleberry', colour: 'Yellow', price: 2.99 },
  { fruit: 'Iyokan', colour: 'Orange', price: 4.99 },
  { fruit: 'Jackfruit', colour: 'Yellow', price: 2.99 },
  { fruit: 'Kiwifruit', colour: 'Green', price: 2.99 },
  { fruit: 'Liliko‘i', colour: 'Purple', price: 3.99 },
  { fruit: 'Mandarin', colour: 'Orange', price: 2.99 },
  { fruit: 'Nectarine', colour: 'Red', price: 2.99 },
  { fruit: 'Orange', colour: 'Orange', price: 3.99 },
  { fruit: 'Pineapple', colour: 'Brown', price: 3.99 },
  { fruit: 'Quince', colour: 'Green', price: 2.99 },
  { fruit: 'Rambutan', colour: 'Brown', price: 4.99 },
  { fruit: 'Strawberry', colour: 'Red', price: 2.99 },
  { fruit: 'Tangerine', colour: 'Orange', price: 2.99 },
  { fruit: 'Ugli', colour: 'Green', price: 3.99 },
  { fruit: 'Valencia', colour: 'Orange', price: 3.99 },
  { fruit: 'Watermelon', colour: 'Green', price: 2.99 },
  { fruit: 'Yuzu', colour: 'Yellow', price: 3.99 },
  { fruit: 'Zwetschge', colour: 'Purple', price: 3.99 }
];
const defaultPerPageCountOptions = [10, 25, 50, 100, 200];

const [page, setPage] = useState(1);
const [perPageCount, setPerPageCount] = useState(defaultPerPageCountOptions[0]);
const [tableData, setTableData] = useState(data);

useEffect(() => {
  onPageChange(page);
}, [page, perPageCount]);

const onPageChange = page => {
  setPage(page);

  const firstIndex = (page - 1) * perPageCount;
  const lastIndex = firstIndex + perPageCount;

  setTableData(data.slice(firstIndex, lastIndex));
};

const onPerPageCountChange = perPageCount => {
  setPerPageCount(perPageCount);

  const pageCount = Math.ceil(data.length / perPageCount);

  setPage(page > pageCount ? pageCount : page);
};

<XUIEditableTable ariaLabel="List of fruits with colour and price per kg">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {tableData.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.colour}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
  <XUIEditableTableFoot>
    <XUIEditableTableRow>
      <XUIEditableTableCell colSpan="3">
        <XUIPagination
          ariaLabel="Pagination"
          count={data.length}
          createCountContent={defaultCreateCountContent}
          createPagingContent={defaultCreatePagingContent}
          nextPageLabel="Next Page"
          onPageChange={onPageChange}
          onPerPageCountChange={onPerPageCountChange}
          page={page}
          pageSelectLabel="Select a page"
          perPageContent="Items per page"
          perPageCount={perPageCount}
          perPageCountSelectLabel="Select a per page count"
          previousPageLabel="Previous Page"
        />
      </XUIEditableTableCell>
    </XUIEditableTableRow>
  </XUIEditableTableFoot>
</XUIEditableTable>;
```
