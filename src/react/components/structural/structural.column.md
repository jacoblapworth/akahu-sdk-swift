<div class="xui-margin-vertical">
	<a href="../section-fundamentals-layout.html#fundamentals-layout-3-2" isDocLink>Columns in the XUI Documentation</a>
</div>

`XUIColumn` components are placed inside rows and accept props to determine their width within a 12-column grid.
The `gridColumns` prop may be a number 1 through 12 or `full`, `half`, `third`, or `quarter` as shorthand. By default, columns will be the full width of the row.

`XUIColumn` also accepts media-query-based widths to set different grid column counts at different viewport widths. `gridColumnsSmallUp` sets a number of columns for viewports greater than 600px wide, while `gridColumnsLargeUp` is for viewports > 1000px.

```jsx harmony
import { XUIColumn, XUIRow } from '@xero/xui/react/structural';

const colStyle = { backgroundColor: 'RGBA(255,255,255,0.5)', padding: '12px' };
const rowStyle = { backgroundColor: '#028DDE', padding: '12px' };

<div>
  <h3>Grid variant</h3>
  <XUIRow style={rowStyle} variant="grid">
    <XUIColumn gridColumns="quarter" gridColumnsSmallUp="full" style={colStyle}>
      This will change to 3/12 columns at narrow viewports
    </XUIColumn>
    <XUIColumn gridColumns="quarter" gridColumnsSmallUp="full" style={colStyle}>
      This will change to 3/12 columns at narrow viewports
    </XUIColumn>
    <XUIColumn gridColumns="half" gridColumnsSmallUp="full" style={colStyle}>
      This will change to 6/12 columns at narrow viewports
    </XUIColumn>
  </XUIRow>

  <h3>Flex variant</h3>
  <XUIRow style={rowStyle} variant="flex">
    <XUIColumn gridColumns={2} style={colStyle}>
      2 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns={3} style={colStyle}>
      3 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns={2} style={colStyle}>
      2 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns={5} style={colStyle}>
      5 / 12 columns
    </XUIColumn>
  </XUIRow>
</div>;
```
