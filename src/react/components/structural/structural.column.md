<div class="xui-margin-vertical">
	<a href="../section-fundamentals-layout.html#fundamentals-layout-3-2" isDocLink>Columns in the XUI Documentation</a>
</div>

`XUIColumn` components are placed inside rows and accept props to determine their width within a 12-column grid.
The `gridColumns` prop may be a number 1 through 12 or `full`, `half`, `third`, or `quarter` as shorthand. By default, columns will be the full width of the row.

`XUIColumn` also accepts media-query-based widths to set different grid column counts at different viewport widths. `gridColumnsSmallUp` sets a number of columns for viewports greater than 600px wide, while `gridColumnsLargeUp` is for viewports > 1000px.

```jsx harmony
import { XUIRow, XUIColumn } from '@xero/xui/react/structural';

const rowStyle = { backgroundColor: '#028DDE' };
const colStyle = { backgroundColor: 'RGBA(255,255,255,0.5)' };

<div>
  <XUIRow variant={'grid'} style={rowStyle} className="xui-padding-small xui-margin-bottom-large">
    <XUIColumn
      gridColumns={'quarter'}
      gridColumnsSmallUp={'full'}
      className="xui-padding-small"
      style={colStyle}
    >
      This column will change at narrow viewports
    </XUIColumn>
    <XUIColumn
      gridColumns={'quarter'}
      gridColumnsSmallUp={'full'}
      className="xui-padding-small"
      style={colStyle}
    >
      Responsive column width
    </XUIColumn>
    <XUIColumn
      gridColumns={'half'}
      gridColumnsSmallUp={'full'}
      className="xui-padding-small"
      style={colStyle}
    >
      This column will change at narrow viewports
    </XUIColumn>
  </XUIRow>
  <XUIRow variant={'flex'} style={rowStyle} className="xui-padding-small">
    <XUIColumn gridColumns={2} className="xui-padding-small" style={colStyle}>
      2 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns={3} className="xui-padding-small" style={colStyle}>
      3 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns={2} className="xui-padding-small" style={colStyle}>
      2 / 12 columns
    </XUIColumn>
    <XUIColumn gridColumns={5} className="xui-padding-small" style={colStyle}>
      5 / 12 columns
    </XUIColumn>
  </XUIRow>
</div>;
```
